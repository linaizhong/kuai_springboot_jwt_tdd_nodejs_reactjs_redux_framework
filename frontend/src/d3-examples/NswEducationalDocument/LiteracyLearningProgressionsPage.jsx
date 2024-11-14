import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import SyllabusGraphViewerTest from "./Views/SyllabusGraphViewerTest"
import LiteracyLearningProgressionsGraphViewer from "./Views/LiteracyLearningProgressionsGraphViewer";
import {Grid} from "@material-ui/core";
import {Tabs, Tab} from 'react-bootstrap';

class LiteracyLearningProgressionsPage extends Component {
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
            //         <LiteracyLearningProgressionsGraphViewer width={700} height={700} />
            //       </div>
            //   </Tab>
            //   <Tab eventKey="treeview" title="Tree View" style={{width: '100%'}}>
            //       {/* <SyllabusGraphViewerTest width={700} height={700}/> */}
            //   </Tab>
            // </Tabs>
            <LiteracyLearningProgressionsGraphViewer width={700} height={700} />
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const ek10sPage = connect(mapStateToProps)(LiteracyLearningProgressionsPage);
export {ek10sPage as LiteracyLearningProgressionsPage};