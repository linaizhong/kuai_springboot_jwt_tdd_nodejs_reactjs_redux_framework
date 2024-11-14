import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton} from "@material-ui/core";
import {AddCircle, CheckCircle, AccountTree} from "@material-ui/icons";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import NswEducationalDocumentService from "../../../_services/edu-docs.service";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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

export default function ViewToolbar(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [term, setTerm] = React.useState(false);
    let [terminology, setTerminology] = React.useState("");

    let [termObj] = React.useState({});
    termObj = {
        id: Date.now(),
        sourceId: props.label,
        terminology: ""
    };

    let [res] = React.useState({});
    res = {
        id: Date.now(),
        label: props.label,
        imageData: null
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleTermClose = () => {
        setTerm(false);
    };

    const saveResource = () => {
        setOpen(false);

        console.log(res);

        NswEducationalDocumentService.saveResource(res)
            .then(
                response => {
                    console.log(response);
                }
            )
    };

    const saveTerminology = () => {
        setTerm(false);

        termObj = {
            ...termObj,
            terminology: terminology
        }
        console.log(termObj);

        NswEducationalDocumentService.saveTerminology(termObj)
            .then(
                response => {
                    console.log(response);
                }
            )
    };

    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();

        res = {
            ...res,
            [e.target.name]: e.target.value
        };
    }

    function handleTermChange(e) {
        e.stopPropagation();
        e.preventDefault();

        termObj = {
            ...termObj,
            [e.target.name]: e.target.value
        };
    }

    function onFileChangeHandler(e) {
        console.log("onFileChangeHandler");

        const formData = new FormData();
        for(let i = 0; i< e.target.files.length; i++) {
            formData.append('file', e.target.files[i])
        }

        console.log(formData);

        NswEducationalDocumentService.uploadFile(formData)
            .then(
                response => {
                    console.log(response);
                    res = {
                        ...res,
                        imageId: response.imageId
                    }
                }
            )
    };

    function handleAddResource(e, key) {
        e.stopPropagation();
        e.preventDefault();

        setOpen(true);
    }

    function handleAddTerminology(e, key) {
        e.stopPropagation();
        e.preventDefault();

        setTerm(true);

        if (window.getSelection) {
            terminology = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            terminology = document.selection.createRange().text;
        }
        console.log("Selected text: " + terminology);

        if(terminology != null && terminology != undefined && terminology.trim().length > 0) {
            terminology = terminology.trim();
        }

        setTerminology(terminology);
    }

    function handleOntology(e, key) {
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Resource
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText className={classes.mydialog} id="alert-dialog-description">
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="label"
                                    name="label"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="label"
                                    label="Label"
                                    disabled={true}
                                    value={props.label}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    autoComplete="title"
                                    autoFocus
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rowsMin={3}
                                    rowsMax={5}
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="recommendedFor"
                                        name="recommendedFor"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="recommendedFor"
                                        label="Recommended For"
                                        onChange={event => handleChange(event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="suggestedDuration"
                                        label="Suggested Duration"
                                        name="suggestedDuration"
                                        autoComplete="suggestedDuration"
                                        onChange={event => handleChange(event)}
                                    />
                                </Grid>
                            </Grid>
                            <div>&nbsp;</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="focusArea"
                                        name="focusArea"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="focusArea"
                                        label="Focus Area"
                                        value={props.label}
                                        onChange={event => handleChange(event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="careerStage"
                                        label="Career Stage"
                                        name="careerStage"
                                        autoComplete="careerStage"
                                        autoFocus
                                        onChange={event => handleChange(event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="type"
                                        label="Type"
                                        name="type"
                                        autoComplete="type"
                                        autoFocus
                                        onChange={event => handleChange(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="tags"
                                    name="tags"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="tags"
                                    label="Tags"
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rowsMin={3}
                                    rowsMax={5}
                                    id="about"
                                    label="About"
                                    name="about"
                                    autoComplete="about"
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rowsMin={3}
                                    rowsMax={5}
                                    id="contextOfUse"
                                    label="Context Of Use"
                                    name="contextOfUse"
                                    autoComplete="contextOfUse"
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="url"
                                    name="url"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="url"
                                    label="URL"
                                    onChange={event => handleChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input type="file" className="form-control" name="file" multiple onChange={event => onFileChangeHandler(event)}/>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveResource} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog onClose={handleTermClose} aria-labelledby="customized-dialog-title" open={term}>
                <DialogTitle id="customized-dialog-title" onClose={handleTermClose}>
                    Add Terminology
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText className={classes.mydialog} id="alert-dialog-description">
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="sourceId"
                                    name="sourceId"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="sourceId"
                                    label="Source Id"
                                    disabled={true}
                                    value={props.label}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="terminology"
                                    name="terminology"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="terminology"
                                    label="Terminology"
                                    disabled={true}
                                    value={terminology}
                                    // onChange={event => handleTermChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rowsMin={3}
                                    rowsMax={5}
                                    id="definition"
                                    label="Definition"
                                    name="definition"
                                    autoComplete="definition"
                                    onChange={event => handleTermChange(event)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="url"
                                    name="url"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="url"
                                    label="URL"
                                    onChange={event => handleTermChange(event)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveTerminology} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Toolbar style={{height: 32, backgroundColor: '#88f'}}>
                <section className={classes.rightToolbar}>
                    <IconButton color="inherit" aria-label="Edit" onClick={event => handleAddResource(event, props.label)}>
                        <AddCircle />
                    </IconButton>
                    <IconButton color="inherit" aria-label="Check" onClick={event => handleAddTerminology(event, props.label)}>
                        <CheckCircle />
                    </IconButton>
                    {/*<IconButton color="inherit" aria-label="Ontology" onClick={event => handleOntology(event, props.label)}>*/}
                    {/*    <AccountTree />*/}
                    {/*</IconButton>*/}
                </section>
            </Toolbar>
        </div>
    );
}
