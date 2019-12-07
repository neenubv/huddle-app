import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//Redux stuff
import { connect } from 'react-redux';
import { createUserTrip } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
  });

class createTrip extends Component {
    constructor(){
        super();
        this.state = {
            tripTitle: '',
            origin: '',
            tripStart: Date.now(),
            tripEnd: Date.now(),
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleCreateTrip = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const tripData = {
            tripTitle: this.state.tripTitle,
            origin: this.state.origin,
            tripStart: this.state.tripStart,
            tripEnd: this.state.tripEnd,
        };
        localStorage.setItem('tripStart', this.state.tripStart);
        this.props.createUserTrip(tripData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStartDateChange = date => {
        this.setState({tripStart: date});
    };

    handleEndDateChange = date => {
        var isInvalidDate = false;
        if (date < this.state.tripStart){
            isInvalidDate = true;
            alert("End date cannot be before start date.");
        }
        if(!isInvalidDate) {
            this.setState({tripEnd: date});
        }
    };

    render() {
        const { classes, UI: { loading } } = this.props; 
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Trip details
                    </Typography>
                    <br/>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="tripTitle" name="tripTitle" type="text" label="TripTitle" className={classes.textField} 
                            value={this.state.tripTitle} onChange={this.handleChange} fullWidth helperText={errors.tripTitle} error={errors.tripTitle ? true : false}/>
                        <br/>
                        <br/>
                        <TextField id="origin" name="origin" type="text" label="Trip Origin" className={classes.textField} 
                            value={this.state.origin} onChange={this.handleChange} fullWidth helperText={errors.origin} error={errors.origin ? true : false}/>
                        <br/>
                        <br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                               <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Trip Start Date"
                                    format="MM/dd/yyyy"
                                    value={this.state.tripStart}
                                    onChange={this.handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Trip End Date"
                                    format="MM/dd/yyyy"
                                    value={this.state.tripEnd}
                                    onChange={this.handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </Grid>
                        </MuiPickersUtilsProvider>

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <br/>
                        <br/>
                        <Button onClick={this.handleCreateTrip} variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Create Trip
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

createTrip.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    createUserTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { createUserTrip })(withStyles(styles)(createTrip));