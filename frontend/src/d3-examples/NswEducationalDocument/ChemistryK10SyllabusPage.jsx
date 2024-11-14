import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from "../../Layout/AppMain/PageTitle";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import ChemistryK10SyllabusTreeView from "./Views/ChemistryK10SyllabusTreeView"
import {Grid} from "@material-ui/core";

class ChemistryK10SyllabusPage extends Component {
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
                        heading="Chemistry K10 Syllabus"
                        subheading=""
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"/>
                    <Grid container spacing={2}>
                        <Grid id='doc-tree' item xs={4}>
                            <ChemistryK10SyllabusTreeView dic={this.state.dictionary} terms={this.props.terms}/>
                        </Grid>
                        <Grid id='des-content' item xs={8}>
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

const ck10sPage = connect(mapStateToProps)(ChemistryK10SyllabusPage);
export {ck10sPage as ChemistryK10SyllabusPage};