import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import imf from '../data/imf.json'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewToolbar from "./ViewToolbar";
import HighlightCellRender from "./HighlightCellRender";
import LectureResourcesRender from "./LectureResourcesRender";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";

const otherHeight = 240;

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh - ${otherHeight}px)`,
    overflowY: 'auto',
    background: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
    flexGrow: 1,
    backgroundColor: '#ffd'
  },
  cell: {
    padding: 4
  }
}));

function Descriptions(props) {
  return(
    <ul>
      {
        props.des.map(
          de =>
            <li>
              <HighlightCellRender text={de} terms={props.terms}/>
            </li>
        )
      }
    </ul>
  )
}

function XTable(props) {
    const classes = useStyles();

    let lrs = [];
    if(props.lrs !== undefined && props.lrs !== null) {
        lrs = props.lrs;
    }

    return (
        <div>
            <ViewToolbar label={props.item.label} />

            <div><b>{props.item.description}</b></div>
            <br/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>Label</TableCell>
                            <TableCell className={classes.cell}>Title</TableCell>
                            <TableCell className={classes.cell}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.item.cells.map(cell => (
                            <TableRow key={cell.label}>
                                <TableCell className={classes.cell} component="th" scope="row">
                                    {cell.label}
                                </TableCell>
                                <TableCell className={classes.cell}>{cell.title}</TableCell>
                                <TableCell className={classes.cell}>
                                    <Descriptions des={cell.descriptions} terms={props.terms}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <LectureResourcesRender lrs={lrs} />
        </div>
    )
}

const renderLabel = (item, terms) => (
    <span
      onClick={event => {
        console.log(item);
        event.stopPropagation();
        event.preventDefault();
        
        let lrs = [];
        ReactDOM.render(<XTable item={item} lrs={lrs} terms={terms} />, document.getElementById("des-content"));

        // NswEducationalDocumentService.getLectureResources(item.label)
        //       .then(
        //           response => {
        //               console.log(response);
        //               let lrs = response;
        //               ReactDOM.render(<XTable item={item} lrs={lrs} terms={terms} />, document.getElementById("des-content"));
        //           }
        //       )
      }}
    >
      {item.label}
    </span>
);

export default function IMFTreeView(props) {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="0" label={imf.title}>
        {
          imf.types.map(
            type => 
              <TreeItem nodeId={type.label} label={type.label}>
                {
                  type.items.map(
                    item => 
                      <TreeItem nodeId={item.label} label={renderLabel(item, props.terms)} />
                  )
                }
              </TreeItem>
          )
        }
      </TreeItem>
    </TreeView>
  );
}
