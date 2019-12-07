import React, { Component } from 'react';
import Chart from '../components/Chart';
import Trip from '../components/Trip';
import Profile from '../components/Profile';
import PendingJoin from '../components/PendingJoin';
import PropTypes from 'prop-types';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'; 
import NotificationsIcon from '@material-ui/icons/Notifications';
//Redux stuff
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';

class home extends Component {

    handleCreateTrip = () => {
        this.props.history.push("/createTrip");
    }

    render() {
        const { classes, user: {trips}, user: {details} } = this.props; 
        let myTrips = trips ? (
                    trips.map(trip => {
                        return <Trip key={trip.tripId} trip={trip}/>
                    })
        ): <p>Loading...</p>
        
        let pendingTrips = details? (
            details["pendingJoin"] ? (details["pendingJoin"].map(pendingTrip => {
                return (<PendingJoin tripId={pendingTrip}/>)
            })) : (<p>You don't have any pending invites to join.</p>)
        ) : <p>Loading...</p>

        console.log("**** " + pendingTrips.length)

        return (
            <div>
                {/* {notificationsIcon} */}
                <Typography component="div" >
                    <Box fontStyle="oblique" fontSize={18} textAlign="center" lineHeight={5} m={1}>
                        WE TRAVEL NOT TO ESCAPE LIFE, BUT FOR LIFE NOT TO ESCAPE US.
                    </Box>
                </Typography>
                <br/>
                <br/>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Button variant="contained" color='primary' onClick={this.handleCreateTrip}> Let's plan your trip</Button>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Chart/>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Profile/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        My Trips
                        <br/><br/><br/>
                        {myTrips}
                    </Grid>
                    <Grid item xs={3} sm={4}> 
                        Waiting to join 
                        <br/><br/><br/>
                        {pendingTrips}
                    </Grid>
                    <Grid item xs={6} sm={3}/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(home);