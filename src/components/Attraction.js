import React, { Component } from 'react';

export default class Attraction extends Component {

  render() {
    return (
        <div >
            <span className='attractions_list' >
                <img  className='icon_style' src={this.props.icon}/>
                        <div className='placeName_style'>
                            {this.props.placeName}
                            <span className='review_style'>Rating: {this.props.review} </span>
                            <span className='dollar_style'> Price: {this.props.dollar}</span>
                        </div>
            </span>
        </div>
    );
  }
};