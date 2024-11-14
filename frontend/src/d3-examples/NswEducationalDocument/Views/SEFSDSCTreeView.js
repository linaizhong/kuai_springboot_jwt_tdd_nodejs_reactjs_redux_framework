import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import sefsdsc from '../data/sefsdsc.json'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import ViewToolbar from "./ViewToolbar";
import HighlightCellRender from "./HighlightCellRender";
import LectureResourcesRender from "./LectureResourcesRender";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";

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
    padding: 0
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

function Links(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const [headline, setHeadline] = React.useState("");
  const [elaboration, setElaboration] = React.useState([]);

  let dictionary = props.dic;

  const handleClose = () => {
    setOpen(false);
  };

  function displayHeadline(headline) {
    return (
      <div>
          {headline}
      </div>
    )
  }

  function displayElaboration(elabs) {
    console.log(elabs);

    if(elabs.length > 0) {
      return (
        <div>
          <ul>
            {
              elabs.map(
                elab =>
                  <li>{elab}</li>  
              )
            }
          </ul>
        </div>
      )
    }
  }

  function handleClick(event, link) {
    event.preventDefault();
    console.log(dictionary[link]);
    setOpen(true);
    setTitle(link);

    setHeadline(dictionary[link].headline);
    setElaboration(dictionary[link].elaboration);
  };

  return(
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText className={classes.mydialog} id="alert-dialog-description">
            <b>{displayHeadline(headline)}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {displayElaboration(elaboration)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {
        props.links.map(
          link => 
            <span>
                <Link href="#" onClick={event => handleClick(event, link)}>&nbsp;{link}&nbsp;</Link>
            </span>
        )
      }
    </div>
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
      <ViewToolbar label={props.cell.label} />

      <br/>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Title</TableCell>
              <TableCell className={classes.cell}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={props.cell.label}>
              <TableCell className={classes.cell}>Links</TableCell>
              <TableCell className={classes.cell}>
                <Links links={props.cell.links} dic={props.dic} />
              </TableCell>
            </TableRow>
            <TableRow key="dlea">
              <TableCell className={classes.cell}>Aspects</TableCell>
              <TableCell className={classes.cell}>
                <Descriptions terms={props.terms} des={props.cell.dleAspects.descriptions} />
              </TableCell>
            </TableRow>
            <TableRow key="dleb">
              <TableCell className={classes.cell}>Benefits</TableCell>
              <TableCell className={classes.cell}>
                <Descriptions des={props.cell.dleBenefits.descriptions} />
                <Links links={props.cell.dleBenefits.links} dic={props.dic} />
              </TableCell>
            </TableRow>
            <TableRow key="deli">
              <TableCell className={classes.cell}>Delivering</TableCell>
              <TableCell className={classes.cell}>
                <Descriptions terms={props.terms} des={props.cell.delivering.descriptions} />
              </TableCell>
            </TableRow>
            <TableRow key="sust">
              <TableCell className={classes.cell}>Sustaining</TableCell>
              <TableCell className={classes.cell}>
                <Descriptions terms={props.terms} des={props.cell.sustaining.descriptions} />
              </TableCell>
            </TableRow>
            <TableRow key="exce">
              <TableCell className={classes.cell}>Excelling</TableCell>
              <TableCell className={classes.cell}>
                <Descriptions terms={props.terms} des={props.cell.excelling.descriptions} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <LectureResourcesRender lrs={lrs} />
    </div>
  ) 
}

const renderLabel = (dictionary, terms, cell) => (
    <span
      onClick={event => {
        console.log(cell);
        event.stopPropagation();
        event.preventDefault();

        let lrs = [];
        ReactDOM.render(<XTable dic={dictionary} lrs={lrs} terms={terms} cell={cell} />, document.getElementById("des-content"));
        
        // NswEducationalDocumentService.getLectureResources(cell.label)
        //     .then(
        //         response => {
        //           console.log(response);
        //           let lrs = response;
        //           ReactDOM.render(<XTable dic={dictionary} lrs={lrs} terms={terms} cell={cell} />, document.getElementById("des-content"));
        //         }
        //     )
      }}
    >
      {cell.label}
    </span>
);

export default function SEFSDSCTreeView(props) {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="0" label={sefsdsc.title}>
        {
          sefsdsc.domains.map(
            domain => 
              <TreeItem nodeId={domain.title} label={domain.title}>
                {
                  domain.topics.map(
                    topic =>
                      <TreeItem nodeId={topic.title} label={topic.title}>
                        {
                          topic.cells.map(
                            cell => 
                              <TreeItem nodeId={cell.label} label={renderLabel(props.dic, props.terms, cell)} />
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
