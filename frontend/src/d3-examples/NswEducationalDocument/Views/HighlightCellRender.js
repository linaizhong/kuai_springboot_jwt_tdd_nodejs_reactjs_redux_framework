import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {IconButton} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Highlighter from "./Highlighter";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

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

export default function HighlightCellRender(props) {
    const classes = useStyles();

    let terms = props.terms;

    let keys = [];
    if(terms != null) {
        keys = Object.keys(terms);
    }
    let kws = props.keywords;
    if(kws != null && kws != undefined && kws.indexOf("keywords=") >= 0) {
        kws = kws.substring(kws.indexOf("keywords=") + 9).trim();
        let kwsa = kws.split("%20");
        console.log(kwsa);
        if(kwsa != null && kwsa.length == 1) {
            keys.push(kws.trim());
        } else if(kwsa != null && kwsa.length > 1) {
            keys.push(kws.trim().replace("%20", " "));
            for(var i=0; i<kwsa.length; i++) {
                keys.push(kwsa[i]);
            }
        }
    }

    let text = props.text;

    const [open, setOpen] = React.useState(false);
    const [terminology, setTerminology] = React.useState(false);
    const [definition, setDefinition] = React.useState(false);
    const [link, setLink] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e, text) => {
        console.log("You clicked: " + text);

        if(terms != undefined) {
            if(terms[text.trim().toLowerCase()] != undefined || terms[text.trim()] != undefined) {
                setOpen(true);

                let value = {}
                if(terms[text.trim().toLowerCase()] != undefined) {
                    value = terms[text.trim().toLowerCase()];
                } else if(terms[text.trim()] != undefined) {
                    value = terms[text.trim()];
                }
                setTerminology(value.terminology);
                setDefinition(value.definition);
                if(value.url != null && value.url.trim().length > 0) {
                    setLink(value.url);
                } else {
                    setLink("#");
                }
            }
        }
    }

    var count = 0

    return(
        <span key={count++}>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {terminology}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText className={classes.mydialog} id="alert-dialog-description">
                        <b>{definition}</b>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <a href={link} target="_blank">See More</a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Highlighter
                highlightClassName={classes.highlighted}
                searchWords={keys}
                autoEscape={true}
                textToHighlight={text}
                handleclick={handleClick}
                index={count++}
            />
        </span>
    )
}
