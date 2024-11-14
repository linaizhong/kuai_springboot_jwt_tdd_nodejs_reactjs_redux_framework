import React, {Component, Fragment, createRef} from 'react';
import Graph from "react-graph-vis";
import {connect} from "react-redux";
import ReactDOM from "react-dom";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import TestGraph from "./TestGraph";
// import Demo from "./Demo";

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

const options = {
    layout: {
        hierarchical: false
    },

    edges: {
        color: "#000000"
    },

    width: "1160px",
    height: "720px"
};

class LinkedGraphView extends Component {
    constructor(props) {
        super(props);

        this.appRef = createRef();

        this.state = {
            linkedGraph: this.props.linkedGraph,
            keywords: this.props.keywords,
            graph: this.props.graph,
            dictionary: this.props.dictionary
        }

        this.initGraph = this.initGraph.bind(this)
        this.buildGraph = this.buildGraph.bind(this)
        this.removeNode = this.removeNode.bind(this)
    }

    componentDidMount() {
        this.refreshFiles();
    }

    refreshFiles() {
        if(this.state.graph.nodes.length < 1) {
            this.initGraph();
        }
    }

    initGraph() {
        const {keywords} = this.state;

        let nodes = [];
        let edges = [];
        nodes.push({
            id: '0',
            label: keywords,
            title: "test",
            group: 'root',
            children: []
        });

        nodes.push({
            id: '1',
            label: "Standards",
            title: "test",
            group: 'standards',
            children: []
        });

        nodes.push({
            id: '2',
            label: "Curriculum",
            title: "test",
            group: 'curriculum',
            children: []
        });

        nodes.push({
            id: '3',
            label: "Syllabus",
            title: "test",
            group: 'syllabus',
            children: []
        });

        edges.push({
            from: '0',
            to: '1',
            label: 'in'
        })

        edges.push({
            from: '0',
            to: '2',
            label: 'in'
        })

        edges.push({
            from: '0',
            to: '3',
            label: 'in'
        })

        this.setState({
            graph: {nodes, edges},
        });
    }

    buildGraph(nid, eid) {
        let {linkedGraph} = this.state;
        // console.log(linkedGraph);
        let {dictionary} = this.state;

        let {nodes, edges} = this.state.graph;

        const node = nodes.filter(n => n.id === nid)[0];
        const edge = edges.filter(e => e.id === eid)[0];

        let newNodes = [];
        let newEdges = [];

        if(node !== null && node !== undefined) {
            if(node.group === "root" || node.group === "synonym") {
                let keywords = this.state.keywords;
                let from = '0';
                console.log(keywords);
                if(node.group === "synonym") {
                    keywords = node.label;
                    from = node.id;
                }
                console.log(keywords);
                NswEducationalDocumentService.synonyms(keywords)
                    .then(
                        response => {
                            if(response != null) {
                                console.log("Synonyms:");
                                console.log(response);

                                const datetime = (new Date()).getTime();

                                try {
                                    response.map((value, index) => {
                                        const tn = nodes.filter(n => n.label === value.toLowerCase());
                                        const tn1 = newNodes.filter(n => n.label === value.toLowerCase());
                                        if((tn === undefined || tn === null || tn.length < 1) && (tn1 === undefined || tn1 === null || tn1.length < 1)) {
                                            if(!value.trim().startsWith('[')) {
                                                newNodes.push({
                                                    id: datetime + '_' + index,
                                                    label: value.trim().toLowerCase(),
                                                    title: '',
                                                    group: 'synonym',
                                                    children: null
                                                })

                                                newEdges.push({
                                                    from: from,
                                                    to: datetime +  '_' + index,
                                                    label: 'synonym'
                                                })
                                            }
                                        }
                                    })

                                    this.setState({
                                        graph: {
                                            nodes: [...nodes, ...newNodes],
                                            edges: [...edges, ...newEdges]
                                        }
                                    });
                                } catch(e) {}
                            }
                        }
                    )
            } else if(node.group === "standards") {
                const datetime = (new Date()).getTime();

                linkedGraph.filter(item => (item.type.endsWith("apst") || item.type.endsWith("imf") || item.type.endsWith("sbcm") || item.type.endsWith("sefsdsc"))).map((value, index) => {
                    const tn = nodes.filter(n => n.label === value.id);
                    const tn1 = newNodes.filter(n => n.label === value.id);
                    if((tn === undefined || tn === null || tn.length < 1) && (tn1 === undefined || tn1 === null || tn1.length < 1)) {
                        newNodes.push({
                            id: datetime + '_' + index,
                            label: value.id,
                            title: '',
                            group: 'standards_1',
                            children: null
                        })

                        newEdges.push({
                            from: node.id,
                            to: datetime +  '_' + index,
                            // label: value
                        })
                    }
                })
            } else if(node.group === "curriculum_1") {
                console.log(dictionary[node.label]);
            } else if(node.group === "syllabus_1") {
                console.log(dictionary[node.label]);
            } else if(node.group === "curriculum") {
                const datetime = (new Date()).getTime();

                linkedGraph.filter(item => item.type.endsWith("acf10")).map((value, index) => {
                    const tn = nodes.filter(n => n.label === value.id);
                    const tn1 = newNodes.filter(n => n.label === value.id);
                    if((tn === undefined || tn === null || tn.length < 1) && (tn1 === undefined || tn1 === null || tn1.length < 1)) {
                        newNodes.push({
                            id: datetime +  '_' + index,
                            label: value.id,
                            title: '',
                            group: 'curriculum_1',
                            children: null
                        });
                        newEdges.push({
                            from: node.id,
                            to: datetime +  '_' + index,
                            // label: value
                        });
                    }
                })
            } else if(node.group === "syllabus") {
                const datetime = (new Date()).getTime();
                linkedGraph.filter(item => item.type.endsWith("mathematicsk10") || item.type.endsWith("englishk10")).map((value, index) => {
                    value.object.outcomes.outcomes.map((item, index1) => {
                        const tn = nodes.filter(n => n.label === item.code);
                        const tn1 = newNodes.filter(n => n.label === item.code);
                        if((tn === undefined || tn === null || tn.length < 1) && (tn1 === undefined || tn1 === null || tn1.length < 1)){
                            newNodes.push({
                                id: datetime +  '_' + index + '_' + index1,
                                label: item.code,
                                title: '',
                                group: 'syllabus_1',
                                children: null
                            })

                            newEdges.push({
                                from: node.id,
                                to: datetime +  '_' + index + '_' + index1,
                            })
                        }
                    });
                });
            }

            this.setState({
                graph: {
                    nodes: [...nodes, ...newNodes],
                    edges: [...edges, ...newEdges]
                }
            });
        }
    }

    removeNode(node) {
        let {nodes, edges} = this.state.graph;

        const tn = nodes.filter(n => n.id === node.id)[0];
        if(tn !== undefined && tn.group === 'synonym') {
            let newNodes = [];
            let newEdges = [];

            nodes.map(value => {
                if(value.id !== node.id) {
                    newNodes.push(value);
                }
            })

            edges.map(value => {
                if(value.from !== node.id && value.to !== node.id) {
                    newEdges.push(value);
                }
            })

            this.setState({
                graph: {
                    nodes: newNodes,
                    edges: newEdges
                }
            });
        }
    }

    render() {
        const {graph} = this.state;

        let selectedId = '';

        const self = this;
        const events = {
            select: function(event) {
                const {nodes, edges} = event;
                let nid = nodes[0];
                let eid = edges[0];
                selectedId = nid;
            },
            oncontext: function(event) {
                event.event.preventDefault();

                const {nodes, edges} = event;
                let nid = nodes[0];
                let eid = edges[0];

                self.removeNode(nodes);

                if(selectedId !== '') {
                    let tnodes = graph.nodes;

                    const tn = tnodes.filter(n => n.id === nid)[0];
                    if(tn !== undefined && tn.group === 'synonym') {
                        self.appRef.Network.deleteSelected();
                    }
                }

                selectedId = '';
            },
            doubleClick: function(event) {
                event.event.preventDefault();

                const {nodes, edges} = event;
                let nid = nodes[0];
                let eid = edges[0];
                self.buildGraph(nid, eid);

                selectedId = '';
            }
        };

        return (
            <div>
                {
                    <Graph
                        graph={graph}
                        options={options}
                        events={events}
                        ref={ref => (this.appRef = ref)}
                    />
                }
                {/*<TestGraph />*/}
                {/*<Demo />*/}
            </div>
        )
    }
}

export default LinkedGraphView;
