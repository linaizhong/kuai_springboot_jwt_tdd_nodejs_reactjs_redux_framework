import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import mathematicsk10 from '../data/mathematics.json'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
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

function Links(props) {
  const classes = useStyles();

  let link = props.link;

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

  function handleClick(event, tlink) {
    event.preventDefault();

    if(tlink.startsWith("(") && tlink.endsWith(")")) {
      tlink = tlink.substring(1, tlink.length - 1);
    }
  
    setOpen(true);
    setTitle(tlink);

    if(dictionary[tlink] !== undefined) {
      setHeadline(dictionary[tlink].headline);
      setElaboration(dictionary[tlink].elaboration);
    }
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
        <span>
            <Link href="#" onClick={event => handleClick(event, link)}>{link}</Link>
        </span>
      }
    </div>
  )
}

function ItemsRender(props) {
  let items = props.items;

  return(
    <ul>
      {
        items.map(
          item =>
            <li>
              <HighlightCellRender text={item.text} terms={props.terms}/>
              &nbsp;&nbsp;
              <b>
                <Links dic={props.dic} link={item.ccode} />
              </b>
            </li>
        )
      }
    </ul>
  )
}

function CGroupRender(props) {
  const classes = useStyles();

  let group = props.group;

  let hd_1 = group.headline + "-" + 1;
  let hd_2 = group.headline + "-" + 2;

  return(
    <Table aria-label="simple table">
      <TableBody>
        <TableRow key={hd_1}>
          <TableCell>
            <b>
              <HighlightCellRender text={group.headline} terms={props.terms}/>
            </b>
          </TableCell>
        </TableRow>
        <TableRow key={hd_2}>
          <TableCell>
            <ItemsRender dic={props.dic} terms={props.terms} items={group.items} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function OutcomeRender(props) {
  const classes = useStyles();

  let outcome = props.outcome;
  
  let oc_1 = outcome.code + "-1";
  let oc_2 = outcome.code + "-2";

  return (
    <Table aria-label="simple table">
      <TableBody>
        <TableRow key={oc_1}>
          <TableCell>
              <b>{outcome.code}</b>
          </TableCell>
        </TableRow>
        <TableRow key={oc_2}>
          <TableCell className={classes.cell}>
            <ul>
              <li>
                <HighlightCellRender text={outcome.description} terms={props.terms}/>
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function XTable(props) {
  const classes = useStyles();

  let group = props.group;
  let outcomes = group.objects[0].outcomes;
  let content = group.objects[0].content;

  let cgroups = content.groups;

  return (
    <div>
      <ViewToolbar label={outcomes.outcomes[0].code} />

      <br/>
      <div>
        <b>
          <HighlightCellRender text={outcomes.label} terms={props.terms}/>
        </b>
      </div>
        {
          outcomes.outcomes.map(
            outcome =>
              <OutcomeRender terms={props.terms} outcome={outcome} />
          )
        }
      <br/>
      <div>
        <b>
          <HighlightCellRender text={content.label} terms={props.terms}/>
        </b>
      </div>
      {
        cgroups.map(
          group => 
            <CGroupRender dic={props.dic} terms={props.terms} group={group} />
        )
      }
    </div>
  ) 
}

const renderLabel = (dic, terms, group) => (
    console.log(group),

    <span
      onClick={event => {
        event.stopPropagation();
        event.preventDefault();

        ReactDOM.render(<XTable dic={dic} terms={terms} group={group} />, document.getElementById("des-content"));
      }}
    >
      {group.title}
    </span>
);

function GroupRender(props) {
  let group = props.group;
  let id = props.oindex + "-" + props.index;

  return (
    <TreeItem nodeId={id} label={renderLabel(props.dic, props.terms, group)} />
  )
}

function CategoryRender(props) {
  let category = props.cat;
  let id = props.oindex + "-" + props.index;

  let oc = 0;

  return (
    <TreeItem nodeId={id} label={category.title}>
      {
        category.groups.map(
          group => 
            <GroupRender dic={props.dic} terms={props.terms} group={group} oindex={id} index={oc++} />
          )
      }
    </TreeItem>
  )
}

function StageRender(props) {
  let stage = props.stage;
  let id = props.oindex + "-" + props.index;

  let oc = 0;

  return (
    <TreeItem nodeId={id} label={stage.title}>
      {
        stage.categories.map(
          category => 
            <CategoryRender dic={props.dic} terms={props.terms} cat={category} oindex={id} index={oc++} />
        )
      }
    </TreeItem>
  )
}

function getLastStage(stages) {
  return(stages[stages.length - 1]);
}

function getLastCategory(categories) {
  return(categories[categories.length - 1]);
}

function getLastGroup(groups) {
  return(groups[groups.length - 1]);
}

function convertData() {
  let mathematicsTree = [];
  let lastNode = null;
  mathematicsk10.map(
    eng => {
      if(eng.stage !== "") {
        if(lastNode === null || lastNode.stage != eng.stage) {
          let group = {
            title: eng.groupTitle,
            objects: [{
              outcomes: eng.outcomes,
              content: eng.content
            }]
          }

          let category = {
            title: eng.category,
            groups: []
          }

          category.groups.push(group);

          let stage = {
            title: eng.stage,
            categories: []
          }

          stage.categories.push(category);

          mathematicsTree.push(stage);
        } else {
          if(lastNode.category != eng.category) {
            let group = {
              title: eng.groupTitle,
              objects: [{
                outcomes: eng.outcomes,
                content: eng.content
              }]
            }
  
            let category = {
              title: eng.category,
              groups: []
            }

            category.groups.push(group);

            getLastStage(mathematicsTree).categories.push(category);
          } else {
            if(lastNode.groupTitle != eng.groupTitle) {
              console.log("Group Title !=: (" + lastNode.groupTitle + ", " + eng.groupTitle + ")");

              let group = {
                title: eng.groupTitle,
                objects: [{
                  outcomes: eng.outcomes,
                  content: eng.content
                }]
              }
    
              getLastCategory(getLastStage(mathematicsTree).categories).groups.push(group);
            } else {
              console.log("Group Title ==: (" + lastNode.groupTitle + ", " + eng.groupTitle + ")");

              getLastGroup(getLastCategory(getLastStage(mathematicsTree).categories).groups).objects.push({
                outcomes: eng.outcomes,
                content: eng.content
              })
            }
          }
        }

        lastNode = eng;
      }
    }
  )

  return mathematicsTree;
}

export default function MathematicsK10SyllabusTreeView(props) {
  const classes = useStyles();

  let oc = 0;

  let data = convertData();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="o-0" label="Mathematics K-10 Syllabus">
        {
          data.map(
            stage => 
              <StageRender dic={props.dic} terms={props.terms} stage={stage} oindex="o-0" index={oc++} />
          )
        }
      </TreeItem>
    </TreeView>
  );
}
