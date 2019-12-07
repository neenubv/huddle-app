import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        maxWidth: 420,
        maxHeight:150
    },
    image: {
        minWidth: 150
    },
    content: {
        padding:10,
        objectFit: 'cover'
    }
}

class PendingJoin extends Component {
    constructor() {
        super();
        this.state = {
            tripTitle: '',
            tripStart: '',
            origin: '',
            destination: '',
            organizer: ''
        }
    }

    getTripDetails = (tripId) => {
        axios.get(`/trip?tripId=${tripId}`)
        .then((res) => {
            var tripData = res.data['tripData'];
            console.log("TRIP DATA ::: " + JSON.stringify(tripData))
            this.setState({tripTitle: tripData.tripTitle});
            this.setState({tripStart: tripData.tripStart});
            this.setState({origin: tripData.origin});
            this.setState({destination: tripData.destination});
            this.setState({organizer: tripData.organizer});
        })
        .catch(err => {
            console.log(err);
        })
    } 

    handleJoinTrip(tripId) {
        axios.put(`/joinTrip?tripId=${tripId}`)
             .catch(err => {
                console.log(err);
             })
    }

    componentDidMount = () => {
        const tripId = this.props.tripId;
        console.log("TRIP => " + tripId)
        this.getTripDetails(tripId);
    }

    render() {
        dayjs.extend(relativeTime);
        const { classes } = this.props; 
        return (
            <div>
               <Card className={classes.card}>
                    <CardMedia
                        image='https://cdn.pixabay.com/photo/2017/04/10/16/40/vacation-2218989_960_720.jpg'
                        title="Trip Image"
                        className={classes.image}/>
                    <CardContent className={classes.content} component={Link} to={`/tripDetails?tripId=${this.props.tripId}`}>
                        <Typography variant="h6" color="primary">{this.state.tripTitle}</Typography>
                        <Typography variant="body2" color="textSecondary">From : {this.state.origin}</Typography>
                        <Typography variant="body2" color="textSecondary">To: {this.state.destination}</Typography>
                        <Typography variant="body2" color="textSecondary">Invited By: {this.state.organizer}</Typography>
                        <Button variant='contained' style={{height:30}} onClick={() => this.handleJoinTrip(this.props.tripId)}>Join</Button> 
                        <Button variant='contained' style={{height:30, margin: 10}} >Reject</Button> 
                    </CardContent>
              </Card>  
            </div>
        )
    }
}

export default withStyles(styles)(PendingJoin);
