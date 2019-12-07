import React, { Component } from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class finalizeDestination extends Component {
    constructor() {
        super();
        this.state = {
            mostLikedUserPref: {},
            buddiesVoted: false,
            isLoading: true
        }
    }

    componentDidMount = () => {
        var tripId = localStorage.getItem('tripId');
        var maxLikeCount = 0;
        
        axios.get(`/preference?tripId=${tripId}`)
                .then((res) => {
                    res.data.map(pref => {
                      pref['destinationChoice'].map(userPref => {
                            if(userPref.likeCount > maxLikeCount) {
                                maxLikeCount = userPref.likeCount;
                                this.setState({mostLikedUserPref: userPref});
                                this.setState({buddiesVoted: true});
                            }
                      })
                    }
                    )
                    this.setState({isLoading: false});
                })
                .catch(err => {
                    console.error(err);
                });
    }

    handleConfirmation = () => {
        localStorage.setItem('destination', this.state.mostLikedUserPref.code);
        var tripId = localStorage.getItem('tripId');
        axios.put(`/finalize?tripId=${tripId}&destination=${this.state.mostLikedUserPref.code}&budget=${0}`)
             .then(() => {
                 this.props.history.push('/lookupAttractions');
             })
             .catch(err => {
                 console.log(err);
             })
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <br/>
                 <br/>
                 <Typography variant="h5" component="h2" style={{position:'center'}}>MOST VOTED DESTINATION</Typography>
                 <br/>
                 <br/>
                 {this.state.isLoading ? <p>Loading...</p> : <div>
                                        {this.state.buddiesVoted ? 
                                                <Card style={{width:200, height:200, marginLeft:500}}>
                                                <CardContent>
                                                    <Typography variant="h5" component="h2" style={{position:'center'}}>
                                                    {this.state.mostLikedUserPref.code}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                    Total Likes
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                    {this.state.mostLikedUserPref.likeCount}
                                                    </Typography>
                                                    <br/>
                                                    <Typography color="textSecondary">
                                                    {this.state.mostLikedUserPref.userHandle}'s choice
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <CheckCircleIcon style={{marginLeft: 80, color:'green'}} onClick={this.handleConfirmation}/>
                                                </CardActions>
                                            </Card>

                                    : <p>Wait for buddies to vote!</p>}</div>
               }
            </div>
        )
    }
}

export default finalizeDestination
