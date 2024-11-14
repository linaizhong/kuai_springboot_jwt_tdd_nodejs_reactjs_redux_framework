import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from "../../Layout/AppMain/PageTitle";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import { Grid } from '@material-ui/core';
import APSTTreeView from "./Views/APSTTreeView"

class APSTPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sbcm: {},
            dictionary: props.dictionary,
            showSuccessMessage: false
        }

        this.refreshFiles = this.refreshFiles.bind(this)
    }

    componentDidMount() {
        // this.refreshFiles();
    }

    refreshFiles() {
        NswEducationalDocumentService.getStandards()
            .then(
                response => {
                    console.log(response);
                    this.setState({standards: response});
                }
            )
    }

    render() {
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
                        heading="Australian Professional Standards for Teaching"
                        subheading=""
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"/>

                    <div id="main-content">
                        <Grid container spacing={2}>
                            <Grid id='doc-tree' item xs={3}>
                                <APSTTreeView terms={this.props.terms} />
                            </Grid>
                            <Grid id='des-content' item xs={9}>
                            </Grid>
                        </Grid>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const apstPage = connect(mapStateToProps)(APSTPage);
export {apstPage as APSTPage};