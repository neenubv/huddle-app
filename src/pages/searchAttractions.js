import React, { Component } from 'react'
import { recommendAttractions } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import SearchResults from '../components/SearchResults'
import SelectedAttractions from '../components/SelectedAttractions'
//Redux stuff
import { connect } from 'react-redux';

const styles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    }
  }));

class attractions extends Component {
    constructor(){
        super();
        this.state = {
            term: '',
            yelpResults: [],
            selectedAttractions: [],
            localData: {
              dataSource: []
            }
        }
    }

    componentDidMount() {
        var tripId = localStorage.getItem('tripId');
        console.log("TRIP ID :: " + tripId)
        
        console.log("DEST:: " + localStorage.getItem('destination'))

        //Load Schedule
        axios.get(`/trip?tripId=${tripId}`)
                .then((res) => {
                  if (typeof res.data['tripData']['destination'] != "undefined") {
                    localStorage.setItem('destination', res.data['tripData']['destination'])
                  }

                  if (typeof res.data['tripData']['scheduledAttractions'] === "undefined") {
                    console.log("TRIP NOT SCHEDULED #####")
                    localStorage.setItem('schedule', `{"dataSource":[]}`);
                  } else {
                    let newState = Object.assign({}, this.state);
                    newState.localData.dataSource = res.data['tripData']['scheduledAttractions'];
                    this.setState(newState);
                    
                    //localStorage.setItem('schedule', `{"dataSource":${res.data['tripData']['scheduledAttractions']}}`);
                    localStorage.setItem('schedule', `{"dataSource":${JSON.stringify(res.data['tripData']['scheduledAttractions'])}}`);
                    console.log("ATT SCHEDULE :: " + `{"dataSource":${JSON.stringify(res.data['tripData']['scheduledAttractions'])}}`);
                  }
                })
                .catch(err => {
                    console.error(err);
                });
    }

    getYelpSuggestions = (searchData) => {
        const {term, location } = searchData;
        console.log("TERM : " + term + " Location: " + location);
        const token = 'tccb3Q2HyjSDclK-RV2b1xSf2vRKGYwyV9QwyOXW-igSayT0rS3kQf-RmOMvfRlEr4f1VhxtDg8M14n0hUZDP-43ymnfpjhJaFpyYTP5TZuwyZqttoU20YTYx-unXXYx';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(`/attractions?term=${term}&location=${location}`, config)
            .then((res) => {
              this.setState({ yelpResults: res.data })
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleRecommendation = () => {
      localStorage.setItem('schedule', `{"dataSource":${JSON.stringify(this.state.selectedAttractions)}}`);
      console.log("ATT SCHEDULE :: " + `{"dataSource":${JSON.stringify(this.state.selectedAttractions)}}`);

      var recommendation = {};
      recommendation.attractions = this.state.selectedAttractions;
      this.props.recommendAttractions(recommendation, this.props.history);
    }

    skip = () => {
      this.props.history.push("/scheduleTrip");
    }

    handleOnChange = (event) => {
        this.setState({term: event.target.value})
    }

    attractionSearch = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const searchData = {
            term:this.state.term,
            location:localStorage.getItem('destination')
        };
        this.getYelpSuggestions(searchData);       
    }

    onDragOver = (e) => {
      e.preventDefault();
    }

    onDrop = (e) => {
      e.preventDefault();
      const attraction = JSON.parse(e.dataTransfer.getData('attraction'));
      this.setState(previousState => ({
        selectedAttractions: [...previousState.selectedAttractions, attraction]
      }));
    }

    render() {
        const { classes } = this.props; 
        return (
            <div style={{marginLeft:250}}>
                {localStorage.getItem('destination') == null ? 
                <div>
                  <br/><br/>
                  <Typography variant="h3" style={{marginLeft:120,}}>
                        Wait for the destination to be finalized.
                  </Typography>
                </div> : <div>
                <Typography variant="h3" style={{marginLeft:120}}>
                        Choose Attractions
                </Typography>
                <br/>
                <Grid container spacing={2} style={{ display: 'inline-flex' }}>
                        <Grid item xs={12} sm={4} style={{backgroundColor: '#00bcd4', color: 'white', marginTop:8}}>
                            <Box border={1}>
                            <div style={{ display: 'inline-flex' }}>
                                <div className={classes.searchIcon} onClick={this.attractionSearch}>
                                    <SearchIcon />
                                </div>
                                <div style={{ alignSelf: 'center' }}>
                                    <InputBase
                                                placeholder="Search…"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                                onChange={this.handleOnChange}
                                                />
                                </div>
                            </div>
                            </Box>
                            <br/>
                            <div style={{backgroundColor: '#00bcd4', color: 'white', height:'700px', overflow:'auto'}}>
                              <SearchResults attractions={this.state.yelpResults}/>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={5} style={{ alignSelf: 'center' , height:'788px'}}>
                            <div droppable='true' onDrop={(e) => this.onDrop(e)} onDragOver = {(e) => this.onDragOver(e)} style={{backgroundColor: '#00bcd4', color: 'white', height:'780px', position: 'relative'}}>
                              <Typography variant="h5" style={{marginLeft:120, paddingTop:10}}>
                                      Bucket List
                              </Typography>
                              <br/>
                              <div style={{ height:'650px', overflow:'auto'}}>
                                <SelectedAttractions attractions={this.state.selectedAttractions}/>
                              </div>
                              
                                <Button variant="contained" 
                                        onClick={this.handleRecommendation} 
                                        style={{bottom:0, left:40, margin:10}}>
                                    Recommend
                                </Button>
                                <Button variant="contained" 
                                        onClick={this.skip} 
                                        style={{bottom:0, left:60, margin:10, width:130}}>
                                    Skip
                                </Button>
                             
                            </div>
                            
                        </Grid>
                </Grid>
                </div>}
            </div>
        )
    }
  }

attractions.propTypes = {
  classes: PropTypes.object.isRequired,
  recommendAttractions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { recommendAttractions })(withStyles(styles)(attractions));