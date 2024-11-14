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

const otherHeight = 160;

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh - ${otherHeight}px)`,
    overflowY: 'auto',
    background: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
    flexGrow: 1,
    color: '#00f',
    backgroundColor: '#f1f4f6',
    fontSize: '10px'
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

    let title = props.item.objects[0].title;

    let lrs = [];
    if(props.lrs !== undefined && props.lrs !== null) {
        lrs = props.lrs;
    }

    return (
        <div style={{backgroundColor: '#fff'}}>
            <ViewToolbar label={props.item.title} />

            <div>
                <b>
                    <HighlightCellRender text={props.item.description} terms={props.terms}/>
                </b>
            </div>
            <br/>
            <div><b>{title}</b></div>
            <Descriptions terms={props.terms} des={props.item.objects[0].stringList} />
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

          NswEducationalDocumentService.getLectureResources(item.title)
              .then(
                  response => {
                      console.log("Curriculum:");
                      console.log(response);
                      let lrs = response;
                      ReactDOM.render(<XTable item={item} lrs={lrs} terms={terms} />, document.getElementById("des-content"));
                  }
              )
      }}
    >
      {item.title}
    </span>
);

function ObjectRender(props) {
  let obj = props.obj;
  let id = props.oindex + "-" + props.index;
  let oc = 0;

  if(obj.type === "CdCode") {
    return(
      <TreeItem nodeId={id} label={renderLabel(obj, props.terms)} />
    )
  } else {
    return(
      <TreeItem nodeId={id} label={obj.title}>
        {
          obj.objects.map(
            obj =>
              <ObjectRender key={oc} terms={props.terms} obj={obj} oindex={id} index={oc++} />
          )
        }
      </TreeItem>
    )
  }
}

export default function CurriculumF10TreeView(props) {
  const classes = useStyles();

  let oc = 0;

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="o-0" label="Australian Curriculum F-10">
        {
          acf10.objects.map(
            obj =>
              <ObjectRender key={oc} terms={props.terms} obj={obj} oindex="o-0" index={oc++} />
          )
        }
      </TreeItem>
    </TreeView>
  );
}
