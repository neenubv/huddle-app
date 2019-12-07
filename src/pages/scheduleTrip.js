import React, { Component } from 'react';
import './scheduleTrip.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, 
         ViewsDirective, ViewDirective, TimelineViews, TimelineMonth,
        DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import axios from 'axios';
import { scheduleAttractions } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//MUI stuff
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

class scheduleTrip extends Component {
    constructor(){
        super();
        this.state = {
            userAttractions: [],
            tripStartDate:'',
            scheduledAttractions: [],
            coordinatesMap: {},
            scheduleObj: {},
            localData: {
                dataSource: []
            }
        }
    }
    generateTreeviewData = (attractions) => {
        attractions.map(attraction => {
            var treeviewData = {};
            treeviewData.id = attraction.id;
            treeviewData.Name = attraction.name;
            this.setState({
                userAttractions: this.state.userAttractions.concat(treeviewData)
            });
            this.state.coordinatesMap[attraction.id] = attraction.coordinates;
        });
    }

    componentDidMount = () => {
        this.setState({localData: JSON.parse(localStorage.getItem('schedule'))})
        
        var tripId = localStorage.getItem('tripId');
        //Load Preference
        axios.get(`/preference?tripId=${tripId}`)
            .then((res) => {
                this.generateTreeviewData(res.data[0]['attractions'])
            })
            .catch(err => {
                console.error(err);
            });
        
        axios.get(`/trip?tripId=${tripId}`)
             .then((res) => {
                 if(typeof res.data["tripData"]["scheduledAttractions"] != 'undefined') {
                    this.setState({scheduledAttractions: res.data["tripData"]["scheduledAttractions"]})
                 }
             })
             .catch(err => {
                 console.log(err);
             })
    }
    
    onTreeDragStop = (args) => {
        var cellData = this.state.scheduleObj.getCellDetails(args.target);
        var eventData = {
            Id: args.draggedNodeData.id,
            Subject: args.draggedNodeData.text,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            Coordinates: this.state.coordinatesMap[args.draggedNodeData.id],
            IsAllDay: cellData.IsAllDay
        }
          
        this.state.scheduleObj.addEvent(eventData);
        console.log("DRAGGED DATA :: " + JSON.stringify(eventData))
      
        this.setState({
            scheduledAttractions: this.state.scheduledAttractions.concat(eventData)
        });
    }

    saveSchedule = () => {
        var schedule = {};
        schedule.scheduledAttractions = this.state.scheduledAttractions;
        console.log("SSSSSCHEDULE ==> " + JSON.stringify(schedule))
        this.props.scheduleAttractions(schedule, this.props.history);
    }

    render() {
        const field = { dataSource: this.state.userAttractions, id: 'id', text:'Name'};
        return (
            <div>
                <Typography variant="h3" className='scheduler-title-container'>
                        Huddle Planning Board
                </Typography>
                <br/>
                <br/>
                <div className='scheduler-component'>
                    <ScheduleComponent height = '750px' ref={schedule => this.state.scheduleObj = schedule} selectedDate={localStorage.getItem('tripStart')} eventSettings={ this.state.localData }>
                        <ViewsDirective>
                            <ViewDirective option='Day' isSelected='true'></ViewDirective>
                            <ViewDirective option='Week'></ViewDirective>
                            <ViewDirective option='Month'></ViewDirective>
                            <ViewDirective option='Agenda'></ViewDirective>
                            <ViewDirective option='TimelineDay'></ViewDirective>
                            <ViewDirective option='TimelineMonth'></ViewDirective>
                        </ViewsDirective>
                    
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineViews, TimelineMonth, DragAndDrop, Resize]} />
                    </ScheduleComponent>
                </div>
                <Typography variant="subtitle1" className='treeview-title-container'>
                        Attractions you selected
                </Typography>
                <br/>
                <div className='treeview-component'>
                    <TreeViewComponent fields={field} allowDragAndDrop = {true} nodeDragStop={this.onTreeDragStop} />
                    <Button variant='contained' onClick={this.saveSchedule} style={{position: 'absolute', bottom:0, marginLeft:50}}>Done</Button>
                </div>
            </div>
        )
    }
  }

  scheduleTrip.propTypes = {
    scheduleAttractions: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { scheduleAttractions })(scheduleTrip);