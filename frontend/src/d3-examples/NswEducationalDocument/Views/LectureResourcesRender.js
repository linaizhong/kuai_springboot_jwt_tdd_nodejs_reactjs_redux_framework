import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";

const cardStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 240,
        minWidth: 200,
        maxHeight: 360,
    },
    media: {
        height: 140,
    },
    content: {
        backgroundColor: '#fff',
        maxHeight: 160,
        overflowY: "auto",
    },
    flex: {
        // flexGrow: 1,
        flex: 1,
    },
}));

export default function LectureResourcesRender(props) {
    let lrs = props.lrs;

    console.log("LectureResourcesRender")
    console.log(lrs)

    const cardClasses = cardStyles();

    var count = 0

    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow style={{backgroundColor: '#eef'}}>
                        {
                            lrs.map(
                                lr =>
                                    <TableCell key={count++} style={{overflowX: "auto"}}>
                                        <Card className={cardClasses.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={cardClasses.media}
                                                    image={`data:image/jpeg;base64,${lr.imageData}`}
                                                    title={lr.title}
                                                />
                                                <CardContent className={cardClasses.content}>
                                                    <Typography gutterBottom variant="h5" component="h4">
                                                        {lr.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {lr.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions style={{maxHeight: 32, backgroundColor: '#88c'}}>
                                                {/* <Button size="small" color="primary">Share</Button> */}
                                                <Button href={lr.url} target="_blank">Open</Button>
                                            </CardActions>
                                        </Card>
                                    </TableCell>
                            )
                        }
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
