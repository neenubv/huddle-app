import React, { Component } from 'react';
import Attraction from './Attraction';
import './SearchResults.css'

export default class SelectedAttractions extends Component {

    render() {
        const feeds= this.props.attractions;
        return(
            <div>
                {
                    feeds.map((feed)=>{
                        return (
                            <div id={feed.id} key={feed.id}>
                                 <Attraction
                                        icon={feed.image_url}
                                        placeName={feed.name} 
                                        review={feed.rating}
                                        dollar={feed.price}  />
                            </div>
                        );
                    })
            }
            </div>
        );
    }
}