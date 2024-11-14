import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import acf10 from '../data/acf10v10.json'
import ViewToolbar from "./ViewToolbar";
import HighlightCellRender from "./HighlightCellRender";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";
import LectureResourcesRender from "./LectureResourcesRender";
//import * as d3 from "d3";
import { Graph } from "react-d3-graph";

//const data = [12, 5, 6, 6, 9, 10];

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh)`,
    overflowY: 'auto',
    background: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
    flexGrow: 1,
    backgroundColor: '#ffd'
  }
}));

const data = {
  nodes: [{ id: "Harry", x: 100, y: 100 }, { id: "Sally", x: 100, y: 200 }, { id: "Alice", x: 200, y: 200 }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
};

// the graph configuration, just override the ones you need
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 300,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

export default function CurriculumF10GraphView(props) {
    const classes = useStyles();

//    const w = 800
//    const h = 640
//
//    const svg = d3.select("body")
//    .append("svg")
//    .attr("width", w)
//    .attr("height", h)
//    .style("margin-left", 100);
//
//    svg.selectAll("rect")
//      .data(data)
//      .enter()
//      .append("rect")
//      .attr("x", (d, i) => i * 70)
//      .attr("y", (d, i) => h - 10 * d)
//      .attr("width", 65)
//      .attr("height", (d, i) => d * 10)
//      .attr("fill", "green")

    return (
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
        />
    )
}
