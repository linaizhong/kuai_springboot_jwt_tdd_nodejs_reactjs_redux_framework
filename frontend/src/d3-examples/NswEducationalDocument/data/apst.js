import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import {data} from "./data";

export default function FileSystemNavigator() {
  const classes = useStyles();

  const TreeRender = data => {
    const isChildren = data.children !== null;
    if (isChildren) {
      return (
        <TreeItem key={data.name} nodeId={data.name} label={data.name}>
          {data.children.map((node, idx) => TreeRender(node))}
        </TreeItem>
      );
    }
    return <TreeItem key={data.name} nodeId={data.name} label={data.name} />;
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {TreeRender(data)}
    </TreeView>
  );
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});
