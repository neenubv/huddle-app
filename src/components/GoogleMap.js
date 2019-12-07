import React, { Component } from 'react'
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';

class GoogleMap extends Component {
    render() {
        // const triangleCoords = [
        //     {lng: -122.405640,lat: 37.778519},
        //     {lng: -122.428093, lat: 37.759703},
        //     {lng: -122.4346, lat: 37.7683}
        //   ];

        const triangleCoords = [{"lat":38.877131,"lng":-120.08041},{"lat":38.9624800987932,"lng":-119.940475823557}];
         
          return(
            <Map google={this.props.google}
                style={{width: '100%', height: '100%', position: 'relative'}}
                className={'map'}
                zoom={14}>
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        label={'SOMA'}
                        position={{lng: -120.08041, lat: 38.877131}} />
                    {/* <Marker
                        name={'Dolores park'}
                        label={'Dolores park'}
                        position={{lng: -122.428093, lat: 37.759703 }} />
                    <Marker
                        name={'CPMC Davies Campus'}
                        label={'CPMC Davies Campus'}
                        position={{lng: -122.4346, lat: 37.7683 }} /> */}
                 <Polyline
                path={triangleCoords}
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
            </Map>
          )
      }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCMH9U9LWlTn8aX0td5IfXOliWtB7x6olo')
})(GoogleMap)