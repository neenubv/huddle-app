import React, { Component } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import DestionationCard from '../components/DestionationCard';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 80
    //paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

class tripDetails extends Component {

    constructor() {
        super();
        this.state = {
            tripTitile: '',
            tripStart: '',
            tripEnd: '',
            tripDays:'',
            travelBuddies:[],
            destionationChoices: [],
            isFinalized: false,
            finalizedDestination: {},
            isLoading: true
        }
    }

    componentDidMount = () => {
        var tripId = this.props.location.search;
        localStorage.setItem('tripId', tripId.split('=')[1]);
        axios.get(`/trip${this.props.location.search}`)
                .then((res) => {
                    var tripData = res.data['tripData'];
                    // If destination exist that means trip is finalized.
                    tripData["destination"] && this.setState({isFinalized: true})

                    if(this.state.isFinalized) {
                      this.setState({finalizedDestination: tripData["destination"]}) 
                    }
                    console.log("FINALIZED DEST :: " + JSON.stringify(this.state.finalizedDestination))
                    this.setState({tripTitile: tripData["tripTitle"]})
                    var startDate = new Date(tripData["tripStart"]).toDateString();
                    localStorage.setItem('tripStart', startDate);
                    this.setState({tripStart: startDate})
                    this.setState({tripEnd: new Date(tripData["tripEnd"]).toDateString()})
                    var diffTime = new Date(tripData["tripEnd"]) - new Date(tripData["tripStart"]).getTime(); 
                    var days = Math.ceil(diffTime / (1000 * 3600 * 24));
                    this.setState({tripDays: days});
                    this.setState({travelBuddies: tripData['travelMates']})
                }).then(() => {
                  this.setState({isLoading: false})
                })
                .catch(err => {
                    console.error(err);
                });
        
        axios.get(`/preference${this.props.location.search}`)
                .then((res) => {
                    res.data.map(pref => {
                      this.setState({destionationChoices: pref['destinationChoice']});
                    })
                })
                .catch(err => {
                    console.error(err);
                });
    }

    planTrip = () => {
      if(this.state.isFinalized) {
        this.props.history.push("/lookupAttractions")
      } else {
        this.props.history.push("/addUserPreference")
      }
    }
    

    render() {
        const { classes } = this.props; 
        return (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="trip" className={classes.avatar}>
                    T
                  </Avatar>
                }
                
                title={this.state.tripTitile}
                subheader={`${this.state.tripDays} Day Trip`}
              />
              <CardMedia
                style={{height: 400, width: 1200, objectFit: 'contain'}}
                image='https://www.komando.com/wp-content/uploads/2019/05/beach-vacation.jpg'
                title={this.state.tripTitile}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Starting on :</b> {this.state.tripStart} <br/>
                  <b>Coming back on :</b> {this.state.tripEnd}
                </Typography>
              </CardContent>
             
              <CardContent>
                <Typography>Travel Mates:</Typography>
                {this.state.travelBuddies.map(buddy => {
                  return(<Card key={buddy.handle} style={{width:90, height:50, display:'inline-block', margin:10, padding:5}}>
                      <Typography variant="h5" component="h2" style={{position:'center'}}>
                          {buddy.handle}
                          </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                          {buddy.status}
                          </Typography>
                  </Card>)
                })}
                <br/><br/>
                {
                   this.state.isLoading ? <div>Loading...</div> :
                        <div>
                          {this.state.isFinalized? 
                                                <div>
                                                  <Typography paragraph>Finalized Destination:</Typography>
                                                  <Card style={{width:250, height:50, textAlign:'center'}}>
                                                      <CardContent>
                                                          <Typography variant="h5" component="h2" style={{position:'center'}}>
                                                          {this.state.finalizedDestination}
                                                          </Typography>
                                                      </CardContent>
                                                  </Card>
                                                </div> :
                                                <div>
                                                <Typography paragraph>Group destination recommendations:</Typography>
                                                {this.state.destionationChoices.map(destination => {
                                                  return (
                                                    <div key={destination.code} style={{padding: 20, display:'inline-block'}}>
                                                      <DestionationCard destination={destination}/>
                                                    </div>
                                                  )
                                                })}
                                                </div>

                                          }
                        </div>
              }
              </CardContent>
              <Button variant='contained' onClick={this.planTrip} style={{padding:5, marginLeft:500, marginBottom:20}}>Let's Go Plan</Button> 
            </Card>
          );
    }
}

export default (withStyles(useStyles)(tripDetails));