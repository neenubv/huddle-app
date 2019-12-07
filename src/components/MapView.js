import React, { Component } from 'react'
import axios from 'axios';
import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { Button } from '@material-ui/core';

class MapView extends Component {
    constructor() {
        super();
        this.state = {
            attractionCoordinates: [],
            center: {},
            attractionMap: {},
            cords: []
        }
    }

    handleSeeItinerary = () => {
        this.props.history.push('/itinerary')
    }

    componentDidMount = () => {
        var tripId = localStorage.getItem('tripId');
        console.log("TRIP ID : " + tripId)
        //Load Schedule
        axios.get(`/trip?tripId=${tripId}`)
                .then((res) => {
                    console.log("RES :: " + JSON.stringify(res.data['tripData']['scheduledAttractions']));
                    this.setState({scheduledAttractions: res.data['tripData']['scheduledAttractions']});
                    res.data['tripData']['scheduledAttractions'].map(attraction => {
                        var coordinate = {};
                        coordinate.lat = attraction['Coordinates'].latitude;
                        coordinate.lng = attraction['Coordinates'].longitude;
                        coordinate.label = attraction['Subject'];
                        coordinate.id = attraction['Id'];

                        var scheduledDate = attraction.StartTime.split('T')[0];
                        if(this.state.attractionMap[scheduledDate]) {
                            var coordinates = this.state.attractionMap[scheduledDate];
                            coordinates.push(coordinate);
                        } else {
                            var coordinates = [];
                            coordinates.push(coordinate);
                            this.state.attractionMap[scheduledDate] = coordinates;
                        }
                        
                        this.setState({
                            attractionCoordinates: this.state.attractionCoordinates.concat(coordinate)
                        });
                    })
                    
                    var mapCenter = {};
                    mapCenter.lat = this.state.attractionCoordinates[0].lat;
                    mapCenter.lng = this.state.attractionCoordinates[0].lng;
                    this.setState({center: mapCenter})
                })
                .catch(err => {
                    console.error(err);
                });
    }
    
    render() {
        return (
            <Map google={this.props.google}
                style={{width: '70%', height: '80%', position: 'relative'}}
               
                center={this.state.center}
                zoom={10}>
                {this.state.attractionCoordinates.map(attraction => {
                    return (
                        <Marker
                            id={attraction.id}
                            key={attraction.id}
                            title={attraction.label}
                            name={attraction.label}
                            label={attraction.label}
                            position={{lng: attraction.lng, lat: attraction.lat}} />
                        
                    )
                })}

                {/* {
                    Object.keys(this.state.attractionMap).map(v => {
                        console.log("attractionCoordinates: " + JSON.stringify(this.state.attractionCoordinates))
                        console.log("MAP: " + JSON.stringify(this.state.attractionMap['2019-11-20']))
                        //this.setState({cords: this.state.attractionMap[v]})
                        var coords = [];
                        coords = this.state.attractionMap[v];
                        return(
                            
                            <Polyline
                                path={coords}
                                geodesic={true}
                                options={{
                                    strokeColor: "blue",
                                    strokeOpacity: 0.75,
                                    strokeWeight: 2,
                                    icons: [
                                        {
                                            offset: "0",
                                            repeat: "20px"
                                        }
                                    ]
                                }}
                            />)
                    })
                } */}

                <Polyline
                path={this.state.attractionCoordinates}
                geodesic={true}
                options={{
                    strokeColor: "blue",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [
                        {
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            />
            <Button variant='contained' style={{marginLeft:500, marginTop: 10}} onClick={this.handleSeeItinerary}>See Itinerary</Button>
            </Map>
            
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCMH9U9LWlTn8aX0td5IfXOliWtB7x6olo')
})(MapView)