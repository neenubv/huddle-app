import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        maxWidth: 420
    },
    image: {
        minWidth: 150
    },
    content: {
        padding:25,
        objectFit: 'cover'
    }
}

class Trip extends Component {
    
    render() {
        dayjs.extend(relativeTime);
        const { classes, trip: { tripTitle, tripStart, tripId, origin, destination, createdAt } } = this.props; 
        
        return (
            <div>
               <Card className={classes.card} 
                    component={Link} 
                    to={`/tripDetails?tripId=${tripId}`}>
                <CardMedia
                    image='https://cdn.pixabay.com/photo/2017/04/10/16/40/vacation-2218989_960_720.jpg'
                    title="Trip Image"
                    className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" color="primary">{tripTitle}</Typography>
                        <Typography variant="body2" color="textSecondary">From : {origin}</Typography>
                        <Typography variant="body2" color="textSecondary">To: {destination}</Typography>
                        <Typography variant="body1">{dayjs(tripStart).fromNow()}</Typography>
                    </CardContent>
              </Card>  
            </div>
        )
    }
}

export default withStyles(styles)(Trip);
