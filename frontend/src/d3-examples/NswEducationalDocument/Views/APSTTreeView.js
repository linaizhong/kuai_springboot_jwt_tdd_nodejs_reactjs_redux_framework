import React from 'react';
import ReactDOM from 'react-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import apst from '../data/apst.json'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import NswEducationalDocumentService from "../../../_services/edu-docs.service";

import ViewToolbar from "./ViewToolbar";
import HighlightCellRender from "./HighlightCellRender";
import LectureResourcesRender from "./LectureResourcesRender";

const otherHeight = 240;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  mydialog: {
    minWidth: 400
  },
  highlighted: {
    color: '#0000ff'
  }
}));

function CellRender(props) {
  const classes = useStyles();

  let cell = props.cell;

  return(
      <TableRow key={cell.label}>
        <TableCell className={classes.cell} component="th" scope="row">
          {cell.label}
        </TableCell>
        <TableCell className={classes.cell}>{cell.title}</TableCell>
        <TableCell className={classes.cell}>

        <HighlightCellRender text={cell.description} terms={props.terms}/>
        </TableCell>
      </TableRow>
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

          <br/>
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
                {props.item.cells.map(
                    cell => (
                        <CellRender cell={cell} terms={props.terms}/>
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

        // NswEducationalDocumentService.getLectureResources(item.label)
        //     .then(
        //         response => {
        //           console.log(response);
        //           let lrs = response;
        //           ReactDOM.render(<XTable item={item} lrs={lrs} terms={terms} />, document.getElementById("des-content"));
        //         }
        //     )

        ReactDOM.render(<XTable item={item} lrs={lrs} terms={terms} />, document.getElementById("des-content"));
      }}
    >
      {item.label}
    </span>
);

export default function APSTTreeView(props) {
  const classes = useStyles();

  let terms = props.terms;
  
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="0" label={apst.title}>
        {
          apst.professionalXs.map(
            px => 
              <TreeItem nodeId={px.title} label={px.title}>
                {
                  px.standards.map(
                    standard =>
                      <TreeItem nodeId={standard.title} label={standard.title}>
                        {
                          standard.items.map(
                            item => 
                              <TreeItem nodeId={item.label} label={renderLabel(item, terms)} />
                          )
                        }
                      </TreeItem>
                  )
                }
              </TreeItem>
          )
        }
      </TreeItem>
    </TreeView>
  );
}
