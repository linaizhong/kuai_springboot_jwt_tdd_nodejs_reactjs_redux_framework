import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import VisualGraphViewer from "./Views/VisualGraphViewer";
import {Tabs, Tab} from 'react-bootstrap';
// import data from "./datasets/music_syllabus.json";
import data from './datasets/english-k-10-syllabus-2012-radio.json'

class VisualViewTestPage extends Component {
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
        // NswEducationalDocumentService.getStandards()
        //     .then(
        //         response => {
        //             console.log(response);
        //             this.setState({standards: response});
        //         }
        //     )
    }

    render() {
        console.log("VisualGraphViewer:")
        console.log(this.props.terms)

        return (
            <Tabs defaultActiveKey="graphview" id="uncontrolled-tab" style={{width: '100%'}}>
              <Tab eventKey="graphview" title="Stages Graph View" style={{width: '100%'}}>
                  <div style={{width: '100%'}}>
                    <VisualGraphViewer terms={this.props.terms} data={data} />
                  </div>
              </Tab>
              {/* <Tab eventKey="treeview" title="Stages Tree View" style={{width: '100%'}}>
                  <Grid container spacing={2}>
                    <Grid id='doc-tree' item xs={4}>
                        <EnglishK10SyllabusTreeView terms={this.props.terms} />
                    </Grid>
                    <Grid id='des-content' item xs={8}>
                    </Grid>
                  </Grid>
              </Tab> */}
            </Tabs>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const visualViewTestPage = connect(mapStateToProps)(VisualViewTestPage);
export {visualViewTestPage as VisualViewTestPage};