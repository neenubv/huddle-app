import React, { Component } from 'react';
import Attraction from './Attraction';
import './SearchResults.css'

export default class SearchResults extends Component {

    onDragStart = (event, feed) => {
        event.dataTransfer.setData('attraction', JSON.stringify(feed));
    }

    render() {
        const feeds= this.props.attractions;
        return(
            <div>
                {
                    feeds.map((feed)=>{
                        return (
                            <div
                                id={feed.id}
                                draggable='true'
                                onDragStart={(e) => this.onDragStart(e, feed)}
                                key={feed.id}
                                >
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