import React, {Component, Fragment} from 'react';
// import { useRef, useCallback } from 'react'
import {connect} from "react-redux";
import NswEducationalDocumentService from "../../_services/edu-docs.service";
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import LearningResourceGraphViewer from "./Views/LearningResourceGraphViewer";

class LearningResourcesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sbcm: {},
            dictionary: props.dictionary,
            showSuccessMessage: false
        }

        this.fgRef = React.createRef()
        this.refreshFiles = this.refreshFiles.bind(this)
        this.nodeHoverTooltip = this.nodeHoverTooltip.bind(this)
    }

    componentDidMount() {
        // this.refreshFiles();
    }

    refreshFiles() {
        NswEducationalDocumentService.getCurriculum()
            .then(
                response => {
                    console.log("Curriculum Page")
                    console.log(response)

                    let treeData = [];
                    let count = 1;

                    let las = response.learningAreas;

                    if(las === undefined) return
                    
                    las.map(
                        la => {
                            let ss = la.subjects;
                            let nodes1 = [];
                            let count1 = 1;
                            ss.map(
                                s => {
                                    let lls = s.levels;
                                    let nodes2 = [];
                                    let count2 = 1;
                                    lls.map(
                                        ll => {
                                            let cdcs = ll.cdCodes;
                                            let nodes3 = [];
                                            let count3 = 1;
                                            cdcs.map(
                                                cdc => {
                                                    let key3 = "fourth-level-node-" + count3++;
                                                    let labeld = cdc.contentDescs[0].title;

                                                    let elas = cdc.contentDescs[0].elaborations;
                                                    let elasstr = [];
                                                    let count6 = 0;
                                                    elas.map(
                                                        ela => {
                                                           elasstr.push({
                                                               key: "sixth-level-node-" + (count6 + 1),
                                                               label: ela,
                                                               nodes: []
                                                           });

                                                           count6++;
                                                        }
                                                    );

                                                    let labele = cdc.contentDescs[0].elaborations[0] + "\n" + cdc.contentDescs[0].elaborations[1];
                                                    nodes3.push({
                                                        key: key3,
                                                        label: cdc.title,
                                                        nodes: [{
                                                            key: "fifth-level-node-1",
                                                            label: labeld,
                                                            nodes: elasstr
                                                        }]
                                                    })
                                                }
                                            );

                                            let key2 = "third-level-node-" + count2++;
                                            nodes2.push({
                                                key: key2,
                                                label: ll.title,
                                                nodes: nodes3
                                            })
                                        }
                                    );

                                    let key1 = "second-level-node-" + count1++;
                                    nodes1.push({
                                        key: key1,
                                        label: s.title,
                                        nodes: nodes2
                                    })
                                });

                               let key = "first-level-node-" + count++;
                                treeData.push({
                                    key: key,
                                    label: la.title,
                                    nodes: nodes1
                                })
                        }
                    );

                    this.setState({treeData: treeData});
                }
            )
    }

    nodeHoverTooltip(node) {
        return `<div>
          <b>${node.name}</b>
        </div>`;
    }

    render() {
        const {treeData} = this.state;

        return (
            <div>
                <LearningResourceGraphViewer width={700} height={700}></LearningResourceGraphViewer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const learningResourcesPage = connect(mapStateToProps)(LearningResourcesPage);
export {learningResourcesPage as LearningResourcesPage};