import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from "../../Layout/AppMain/PageTitle";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import SBCMTreeView from "./Views/SBCMTreeView"
import {Grid} from "@material-ui/core";

class SBCMPage extends Component {
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
        // const {standards} = this.state;
        // var sbcm = {};
        // var objectives = [];
        // if(standards !== undefined) {
        //     console.log(standards.sbcm);
        //     sbcm = standards.sbcm;
        //
        //     objectives = sbcm.objectives;
        // }

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
                        heading="NSW Schools Business Capability Model"
                        subheading=""
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"/>
                    <Grid container spacing={2}>
                        <Grid id='doc-tree' item xs={3}>
                            <SBCMTreeView terms={this.props.terms}/>
                        </Grid>
                        <Grid id='des-content' item xs={9}>
                        </Grid>
                    </Grid>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const sbcmPage = connect(mapStateToProps)(SBCMPage);
export {sbcmPage as SBCMPage};