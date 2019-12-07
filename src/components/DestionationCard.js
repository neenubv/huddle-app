import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import axios from 'axios';

const useStyles = makeStyles({
    card: {
      width: 75,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class DestionationCard extends Component {
    constructor() {
        super();
        this.state = {
            isClicked: false,
            count: 0
        }
    }
    handleLike = (handle, place) => {
        this.setState({isClicked: !this.state.isClicked})
        var tripId = localStorage.getItem('tripId');
        axios.post(`/like?tripId=${tripId}&buddyHandle=${handle}&airportCode=${place}`)
             .catch(err => {
                console.log(err);
             })
    }

    render() {
        const { classes } = this.props; 
        const dest = this.props.destination;
        
        let thumb_color = 'grey';
        let count = dest.likeCount;
        if(this.state.isClicked) {
          thumb_color = '#00bcd4';
          count = dest.likeCount--;
        } else {
          thumb_color = 'grey';
          count = dest.likeCount++;
        }


        return (
            <Card style={{width:200, height:200}}>
                <CardContent>
                    <Typography variant="h5" component="h2" style={{position:'center'}}>
                    {dest.code}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Total Likes
                    </Typography>
                    <Typography variant="body2" component="p">
                    {count}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} color="textSecondary">
                    {dest.userHandle}'s choice
                    </Typography>
                </CardContent>
                <CardActions>
                    <ThumbUpAltIcon style={{marginLeft: 50, color: thumb_color}} onClick={() => this.handleLike(dest.userHandle, dest.code)}/>
                </CardActions>
            </Card>
        )
    }
}
export default (withStyles(useStyles)(DestionationCard));