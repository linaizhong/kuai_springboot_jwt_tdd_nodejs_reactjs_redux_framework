import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

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
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";
import HighlightCellRender from "./HighlightCellRender";
import ViewToolbar from "./ViewToolbar";
import LectureResourcesRender from "./LectureResourcesRender";
import Toolbar from "@material-ui/core/Toolbar";
import {AcUnit} from "@material-ui/icons";
import LinkedGraphView from "./LinkedGraphView";

const otherHeight = 280;

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
  mydialog: {
    minWidth: 400
  },
  ltdialog: {
    minWidth: 1200
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

function SEFSDSCXTable(props) {
  const classes = useStyles();

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
                  <Descriptions terms={props.terms} des={props.cell.dleAspects.descriptions} keywords={props.keywords} />
                </TableCell>
              </TableRow>
              <TableRow key="dleb">
                <TableCell className={classes.cell}>Benefits</TableCell>
                <TableCell className={classes.cell}>
                  <Descriptions des={props.cell.dleBenefits.descriptions} keywords={props.keywords} />
                  <Links links={props.cell.dleBenefits.links} dic={props.dic} />
                </TableCell>
              </TableRow>
              <TableRow key="deli">
                <TableCell className={classes.cell}>Delivering</TableCell>
                <TableCell className={classes.cell}>
                  <Descriptions terms={props.terms} des={props.cell.delivering.descriptions} keywords={props.keywords} />
                </TableCell>
              </TableRow>
              <TableRow key="sust">
                <TableCell className={classes.cell}>Sustaining</TableCell>
                <TableCell className={classes.cell}>
                  <Descriptions terms={props.terms} des={props.cell.sustaining.descriptions} keywords={props.keywords} />
                </TableCell>
              </TableRow>
              <TableRow key="exce">
                <TableCell className={classes.cell}>Excelling</TableCell>
                <TableCell className={classes.cell}>
                  <Descriptions terms={props.terms} des={props.cell.excelling.descriptions} keywords={props.keywords} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

function SBCMXTable(props) {
  const classes = useStyles();

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
                <TableCell className={classes.cell}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.item.cells.map(cell => (
                  <TableRow key={cell.label}>
                    <TableCell className={classes.cell} component="th" scope="row">
                      {cell.label}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <HighlightCellRender text={cell.description} terms={props.terms} keywords={props.keywords} />
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

function Descriptions(props) {
  return(
      <ul>
        {
          props.des.map(
              de =>
                  <li>
                    <HighlightCellRender text={de} terms={props.terms} keywords={props.keywords} />
                  </li>
          )
        }
      </ul>
  )
}

function IMFXTable(props) {
  const classes = useStyles();

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
                      <Descriptions des={cell.descriptions} terms={props.terms} keywords={props.keywords} />
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

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
    // console.log(elabs);

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

function LinksRender(props) {
  let links = props.links;
  let ls = [];
  if(links !== null && links !== undefined) {
    if(links.startsWith("(") && links.endsWith(")")) {
      links = links.substring(1, links.length - 1);
    }

    console.log("AC links: " + links);

    if(links.indexOf(",") < 0) {
      ls.push(links);
    } else {
      while(links.indexOf(",") > 0) {
        let index = links.indexOf(",");
        let link = links.substring(0, index).trim();
        ls.push(link);
        links = links.substring(index + 1).trim();
      }
      ls.push(links);
    }
  }

  return(
      <b>
        {
          ls.map(
              l =>
                  <Links dic={props.dic} link={l} />
          )
        }
      </b>
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
              <HighlightCellRender text={item.text} terms={props.terms} keywords={props.keywords} />
              &nbsp;&nbsp;
              <LinksRender dic={props.dic} links={item.ccode} />
            </li>
        )
      }
    </ul>
  )
}

function CurrGroupRender(props) {
  const classes = useStyles();

  let currgroup = props.currgroup;

  let hd_1 = currgroup.headline + "-" + 1;
  let hd_2 = currgroup.headline + "-" + 2;

  return(
    <Table aria-label="simple table">
      <TableBody>
        <TableRow key={hd_1}>
          <TableCell>
            <HighlightCellRender text={currgroup.headline} terms={props.terms} keywords={props.keywords} />
          </TableCell>
        </TableRow>
        <TableRow key={hd_2}>
          <TableCell>
            <ItemsRender dic={props.dic} items={currgroup.items} keywords={props.keywords} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
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
            <HighlightCellRender text={group.headline} terms={props.terms} keywords={props.keywords} />
          </TableCell>
        </TableRow>
        <TableRow key={hd_2}>
          <TableCell>
            <ItemsRender dic={props.dic} items={group.items} keywords={props.keywords} />
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
                <HighlightCellRender text={outcome.description} terms={props.terms} keywords={props.keywords} />
              </li>
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function XTable(props) {
  let group = props.group;
  let outcomes = group.outcomes;
  let content = group.content;

  let cgroups = content.groups;

  return (
    <div>
      <div><b>{outcomes.label}</b></div>
        {
          outcomes.outcomes.map(
            outcome =>
              <OutcomeRender outcome={outcome} keywords={props.keywords} />
          )
        }
      <br/>
      <div><b>{content.label}</b></div>
      {
        cgroups.map(
          group =>
            <CGroupRender dic={props.dic} group={group} keywords={props.keywords} />
        )
      }
    </div>
  ) 
}

function APSTCellRender(props) {
  const classes = useStyles();

  let cell = props.cell;

  return(
      <TableRow key={cell.label}>
        <TableCell className={classes.cell} component="th" scope="row">
          {cell.label}
        </TableCell>
        <TableCell className={classes.cell}>{cell.title}</TableCell>
        <TableCell className={classes.cell}>
          <HighlightCellRender text={cell.description} terms={props.terms} keywords={props.keywords} />
        </TableCell>
      </TableRow>
  )
}

function APSTXTable(props) {
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
                      <APSTCellRender cell={cell} terms={props.terms} keywords={props.keywords} />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <LectureResourcesRender lrs={lrs} />
      </div>
  )
}

function ACF10Descriptions(props) {
  return(
      <ul>
        {
          props.des.map(
              de =>
                  <li>
                    <HighlightCellRender text={de} terms={props.terms} keywords={props.keywords} />
                  </li>
          )
        }
      </ul>
  )
}

function ACF10XTable(props) {
  const classes = useStyles();

  let title = props.item.objects[0].title;

  return (
      <div>
        <ViewToolbar label={props.item.title} />

        <div>
          <b>
            <HighlightCellRender text={props.item.description} terms={props.terms} keywords={props.keywords} />
          </b>
        </div>
        <br/>
        <div><b>{title}</b></div>
        <ACF10Descriptions terms={props.terms} des={props.item.objects[0].stringList} keywords={props.keywords} />
      </div>
  )
}

function handleClick(event, id, type, dic, terms, keywords) {
  event.stopPropagation();
  event.preventDefault();

  console.log("Get info: (" + id + ", " + type + ")");

  NswEducationalDocumentService.getSearchDetails(id, type)
      .then(
          response => {
            if(response != null) {
              console.log(response);
              let item = response;

              // this.setState({standards: response});

              if(type.endsWith("acf10")) {
                return(ReactDOM.render(<ACF10XTable item={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              } else if(type.endsWith("apst")) {
                  NswEducationalDocumentService.getLectureResources(id)
                    .then(
                        response => {
                          console.log(response);
                          let lrs = response;
                          return(ReactDOM.render(<APSTXTable item={item} lrs={lrs} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
                        }
                    )
              } else if(type.endsWith("imf")) {
                return(ReactDOM.render(<IMFXTable item={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              } else if(type.endsWith("sbcm")) {
                return(ReactDOM.render(<SBCMXTable item={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              } else if(type.endsWith("sefsdsc")) {
                return(ReactDOM.render(<SEFSDSCXTable cell={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              } else if(type.endsWith("englishk10")) {
                return(ReactDOM.render(<XTable group={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              } else if(type.endsWith("mathematicsk10")) {
                return(ReactDOM.render(<XTable group={response} dic={dic} terms={terms} keywords={keywords} />, document.getElementById("des-content")));
              }
            }
          }
      )
};

export default function DocSearchResultsView(props) {
  const classes = useStyles();

  let {results, keywords, dictionary, terms} = props;

  console.log("Search Results");
  console.log(results);

  const [open, setOpen] = React.useState(false);
  const [lg, setLg] = React.useState({});
  const [graph, setGraph] = React.useState({});
  const [keyword, setKeyword] = React.useState('');

  const close = () => {
    setOpen(false);
  };

  function linkGraph(event, results, keyword) {
    event.stopPropagation();
    event.preventDefault();

    NswEducationalDocumentService.getLinkGraph(results)
        .then(
            response => {
              if(response !== null && response !== undefined) {
                console.log("Linked Graph:");
                keyword = keyword.substring(10);
                keyword = keyword.replace("%20", " ");
                let nodes = [];
                let edges = [];
                let graph = {nodes, edges};

                setLg(response);
                setGraph(graph);
                setKeyword(keyword);
                setOpen(true);
              }
            }
        )
  }

  return (
      <div>
        <Dialog onClose={close}aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={close}>
            Linked Terminologies
          </DialogTitle>
          <DialogContent dividers>
            {/*<DialogContentText id="alert-dialog-description">*/}
            {/*  <LinkedGraphView linkedGraph={lg} keywords={keyword} graph={graph} />*/}
            {/*</DialogContentText>*/}
            <LinkedGraphView linkedGraph={lg} keywords={keyword} graph={graph} dictionary={dictionary} />
          </DialogContent>
        </Dialog>

        <Toolbar style={{height: 48, backgroundColor: '#88f'}}>
          <section className={classes.rightToolbar}>
            <IconButton color="inherit" aria-label="Edit" onClick={event => linkGraph(event, results, keywords)}>
              <AcUnit />
            </IconButton>
          </section>
        </Toolbar>

        <TableContainer component={Paper} className={classes.root}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/*<TableCell>Name</TableCell>*/}
                <TableCell><b>Id</b></TableCell>
                <TableCell><b>Description</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map(
                  row => (
                      <TableRow key={row._id}>
                        {/*<TableCell>{row._source.file__name}</TableCell>*/}
                        <TableCell>
                          {/*<Link href="#" onClick={event => handleClick(event, row._source.emp_id, dictionary)}>{row._source.emp_id}</Link>*/}
                          <Link href="#" onClick={event => handleClick(event, row._source.emp_id, row._source.emp_type, dictionary, terms, keywords)}>{row._source.emp_id}</Link>
                        </TableCell>
                        <TableCell>
                          {/*{row._source.syllabus__description}*/}
                          {row._source.emp_description}
                        </TableCell>
                      </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
