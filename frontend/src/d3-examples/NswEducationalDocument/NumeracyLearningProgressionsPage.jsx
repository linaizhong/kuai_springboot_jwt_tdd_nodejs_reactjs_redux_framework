import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import EnglishK10SyllabusTreeView from "./Views/EnglishK10SyllabusTreeView"
import NumeracyLearningProgressionsGraphViewer from "./Views/NumeracyLearningProgressionsGraphViewer";
import {Grid} from "@material-ui/core";
import {Tabs, Tab} from 'react-bootstrap';

class NumeracyLearningProgressionsPage extends Component {
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
            // <Tabs defaultActiveKey="graphview" id="uncontrolled-tab" style={{width: '100%'}}>
            //   <Tab eventKey="graphview" title="Graph View" style={{width: '100%'}}>
            //       <div style={{width: '100%'}}>
            //         <NumeracyLearningProgressionsGraphViewer width={700} height={700}></NumeracyLearningProgressionsGraphViewer>
            //       </div>
            //   </Tab>
            //   <Tab eventKey="treeview" title="Tree View" style={{width: '100%'}}>
            //     <Grid container spacing={2} style={{width: '100%'}}>
            //         <Grid id='doc-tree' item xs={4} style={{width: '100%'}}>
            //             {/* <EnglishK10SyllabusTreeView dic={this.state.dictionary} terms={this.props.terms}/> */}
            //         </Grid>
            //         <Grid id='des-content' item xs={8}>
            //         </Grid>
            //     </Grid>
            //   </Tab>
            // </Tabs>
            <NumeracyLearningProgressionsGraphViewer width={700} height={700}></NumeracyLearningProgressionsGraphViewer>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const ek10sPage = connect(mapStateToProps)(NumeracyLearningProgressionsPage);
export {ek10sPage as NumeracyLearningProgressionsPage};