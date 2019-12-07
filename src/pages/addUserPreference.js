import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/huddle.ico'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
//Redux stuff
import { connect } from 'react-redux';
import { addPreference } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
  });

const marks = [
    {
        value: 500,
        label: '$500',
    },
    {
        value: 1000,
        label: '$1000',
    },
    {
        value: 1500,
        label: '$1500',
    },
    {
        value: 2000,
        label: '$2000',
    },
];

var sliderValue = '';
class addUserPreference extends Component {
    constructor(){
        super();
        this.state = {
            budget:'',
            destinationChoices:[]
        }
    }

    valuetext = (value) => {
        sliderValue = value;
        return `${value}`;
    }

    componentDidUpdate(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        
        const userPreference = {
            budget: sliderValue,
            destinationChoice: this.state.destinationChoices
        };
        
        this.props.addPreference(userPreference, this.props.history);
    }

    addDestination = () =>{
        this.setState({destinationChoices:[...this.state.destinationChoices, ""]})
        this.state.destinationChoices.push("");
    }

    handleChange = (event, index) => {
        this.state.destinationChoices[index] = event.target.value;
        this.setState({destinationChoices: this.state.destinationChoices});
    }

    removeDestination = (index) => {
        this.state.destinationChoices.splice(index, 1);
        this.setState({destinationChoices: this.state.destinationChoices});
    }

    skip = () => {
        this.props.history.push("/inviteFriends");
    }

    render() {
        const { classes, UI: { loading } } = this.props; 
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Recommend
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <br/>
                        <br/>
                        <Typography variant="subtitle1" align="left" color="inherit" gutterBottom>
                            Set Budget
                        </Typography>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Slider
                            min={500}
                            max={2000}
                            defaultValue={600}
                            getAriaValueText={this.valuetext}
                            aria-labelledby="budget-slider"
                            step={100}
                            marks={marks}
                            valueLabelDisplay="on"
                        />
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Typography variant="subtitle1" align="left" color="inherit" gutterBottom>
                            Destination Choice
                        </Typography>
                        {
                            this.state.destinationChoices.map((destination, index) => {
                                return(
                                    <div key={index} style={{ display: 'inline-flex' }}>
                                        <div style={{ width: 300 }}>
                                            <TextField id="destination" name="destination" type="text" label="City, State" className={classes.textField} 
                                                    value={destination} onChange={(e)=>this.handleChange(e,index)} fullWidth/>
                                        </div>
                                        <div style={{ alignSelf: 'right', marginLeft: 15}}>
                                            <Button onClick={() => this.removeDestination(index)} variant="contained" color="primary" className={classes.button} disabled={loading}>X</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br/>
                        <Button onClick={this.addDestination} variant="contained" color="primary" className={classes.button} disabled={loading}>+</Button>
                        <br/>
                        <br/>
                        <br/>

                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading} style={{margin: 10}}>
                            Recommend
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <Button onClick={this.skip} variant="contained" color="primary" className={classes.button} disabled={loading} style={{margin: 10, width: 130}}>
                            Skip
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

addUserPreference.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    addPreference: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { addPreference })(withStyles(styles)(addUserPreference));