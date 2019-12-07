import React, { Component } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import axios from 'axios';

class itinerary extends Component {
    constructor() {
        super();
        this.state = {
            schedule: []
        }
    }

    componentDidMount() {
        var tripId = localStorage.getItem('tripId');
        axios.get(`/trip?tripId=${tripId}`)
        .then((res) => {
            if(typeof res.data["tripData"]["scheduledAttractions"] != 'undefined') {
               console.log("Schedule -> " + JSON.stringify(res.data["tripData"]["scheduledAttractions"]))
               this.setState({schedule: res.data["tripData"]["scheduledAttractions"]})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <VerticalTimeline>
                {
                    this.state.schedule.map(schedule => {
                        var startArray = schedule.StartTime.split('T');
                        var startDate = startArray[0];
                        var startTime = startArray[1].split('.000Z')[0];
                        var endTime = schedule.EndTime.split('T')[1].split('.000Z')[0];

                        return (
                            <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#00bcd4', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  #00bcd4' }}
                            iconStyle={{ background: '#00bcd4', color: '#fff' }}
                            icon={<LocationCityIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">{schedule.Subject}</h3>
                                <br/>
                                <h6 className="vertical-timeline-element-subtitle">{"On: " + startDate}</h6>
                                <h6 className="vertical-timeline-element-subtitle">{ "From: " + startTime + " To: " + endTime}</h6>
                            
                            </VerticalTimelineElement>
                        )
                    })
                }
            </VerticalTimeline>
        )
    }
}

export default itinerary
