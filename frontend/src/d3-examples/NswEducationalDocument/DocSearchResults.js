import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from "../../Layout/AppMain/PageTitle";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import {Grid, Link} from '@material-ui/core';
import DocSearchResultsView from "./Views/DocSearchResultsView";

class DocSearchResults extends Component {
    constructor(props) {
        super(props);

        console.log("DocSearchResults::props1");
        console.log(this.props);

        this.state = {
            keywords: props.history.location.search,
            results: null,
            dictionary: props.dictionary,
        }

        // this.props.history.location.pathname = null;
        //
        // console.log("DocSearchResults::props2");
        // console.log(this.props);

        // this.handleClick = this.handleClick.bind(this)
    }

    // componentWillMount() {
    //     this.setState({
    //         results: null
    //     });
    // }

    componentWillMount() {
        let {keywords} = this.state;

        console.log("Keywords: " + keywords);
        let index = keywords.indexOf("keywords=");
        if(index > 0) {
            let kws = keywords.substring(index + 9).trim();
            if(kws.length > 0) {
                console.log("Search results testing..." + kws);

                NswEducationalDocumentService.search(kws)
                    .then(
                        response => {
                            console.log(response);

                            if(response != null && response.hits !== undefined && response.hits.hits !== undefined) {
                                this.setState({
                                    results: response.hits.hits
                                });
                            }
                        }
                    )
            }
        }
    }

    render() {
        let {results, keywords, dictionary} = this.state;

        if(results == null) {
            return (
                <Fragment>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <PageTitle
                            heading=""
                            subheading=""
                            icon="pe-7s-graph icon-gradient bg-ripe-malin"/>

                    </ReactCSSTransitionGroup>
                </Fragment>
            )
        } else {
            console.log("Results:");
            console.log(results);

            return (
                <Fragment>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <PageTitle
                            heading="Search Results"
                            subheading=""
                            icon="pe-7s-graph icon-gradient bg-ripe-malin"/>

                        <div id="main-content">
                            <Grid container spacing={2}>
                                <Grid id='doc-tree' item xs={4}>
                                    <DocSearchResultsView results={results} dictionary={dictionary} keywords={keywords} />
                                </Grid>
                                <Grid id='des-content' item xs={8}>
                                </Grid>
                            </Grid>
                        </div>
                    </ReactCSSTransitionGroup>
                </Fragment>
            )
        }
    }
}

function mapStateToProps(state) {
    return {}
}

const docSearchResults = connect(mapStateToProps)(DocSearchResults);
export {docSearchResults as DocSearchResults};