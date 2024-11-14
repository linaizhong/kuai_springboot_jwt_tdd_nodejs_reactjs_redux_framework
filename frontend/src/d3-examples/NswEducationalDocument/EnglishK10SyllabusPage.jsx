import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import EnglishK10SyllabusTreeView from "./Views/EnglishK10SyllabusTreeView"
import EnglishK10SyllabusGraphViewer from "./Views/EnglishK10SyllabusGraphViewer";
import SyllabusIntroductionViewer from "./Views/SyllabusIntroductionViewer";
import {Grid} from "@material-ui/core";
import {Tabs, Tab} from 'react-bootstrap';

class EnglishK10SyllabusPage extends Component {
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
        console.log("EnglishK10SyllabusPage:")
        console.log(this.props.terms)

        return (
            <Tabs defaultActiveKey="introduction" id="uncontrolled-tab" style={{width: '100%'}}>
              <Tab eventKey="introduction" title="Information" style={{width: '98%'}}>
                  <div style={{width: '100%'}}>
                    <SyllabusIntroductionViewer terms={this.props.terms} />
                  </div>
              </Tab>
              <Tab eventKey="graphview" title="Stages Graph View" style={{width: '100%'}}>
                  <div style={{width: '100%'}}>
                    <EnglishK10SyllabusGraphViewer terms={this.props.terms} width={700} height={700} />
                  </div>
              </Tab>
              <Tab eventKey="treeview" title="Stages Tree View" style={{width: '100%'}}>
                  <Grid container spacing={2}>
                    <Grid id='doc-tree' item xs={4}>
                        <EnglishK10SyllabusTreeView terms={this.props.terms} />
                    </Grid>
                    <Grid id='des-content' item xs={8}>
                    </Grid>
                  </Grid>
              </Tab>
            </Tabs>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const ek10sPage = connect(mapStateToProps)(EnglishK10SyllabusPage);
export {ek10sPage as EnglishK10SyllabusPage};