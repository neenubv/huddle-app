import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux stuff
import { connect } from 'react-redux';
import { inviteBuddies } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
  });

class inviteFriends extends Component {
    constructor(){
        super();
        this.state = {
            emailIds:[]
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const buddyData = {
            travelMates: this.state.emailIds
        };
        this.props.inviteBuddies(buddyData, this.props.history);
    }

    addEmail = () =>{
        this.setState({emailIds:[...this.state.emailIds, ""]})
        this.state.emailIds.push("");
    }

    handleChange = (event, index) => {
        this.state.emailIds[index] = event.target.value;
        this.setState({emailIds: this.state.emailIds});
    }

    removeEmailId = (index) => {
        this.state.emailIds.splice(index, 1);
        this.setState({emailIds: this.state.emailIds});
    }

    skip = () => {
        this.props.history.push("/lookupAttractions");
    }

    render() {
        const { classes, UI: { loading } } = this.props; 
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Invite Your Friends
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        {
                            this.state.emailIds.map((emailId, index) => {
                                return(
                                    <div key={index} style={{ display: 'inline-flex' }}>
                                        <div style={{ width: 300 }}>
                                            <TextField id="email" name="email" type="email" label="Email Address" className={classes.textField} 
                                                    value={emailId} onChange={(e)=>this.handleChange(e,index)} fullWidth/>
                                        </div>
                                        <div style={{ alignSelf: 'right', marginLeft: 15}}>
                                            <Button onClick={() => this.removeEmailId(index)} variant="contained" color="primary" className={classes.button} disabled={loading}>X</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <br/>
                        <Button onClick={this.addEmail} variant="contained" color="primary" className={classes.button} disabled={loading}>+</Button>
                        <br/>
                        <br/>
                        <br/>
                        
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading} style={{margin: 10}}>
                            Invite
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <Button onClick={this.skip} variant="contained" color="primary" className={classes.button} disabled={loading} style={{margin: 10, width: 80}}>
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

inviteFriends.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    inviteBuddies: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { inviteBuddies })(withStyles(styles)(inviteFriends));