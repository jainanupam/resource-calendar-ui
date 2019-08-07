import React from 'react';
import SkyLight from 'react-skylight';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventResource:'',
            eventTitle:'',
            eventTeam:'',
            startDate:'',
            startTime:'',
            endDate:'',
            endTime:''
        }
    }

    // Handle change in field values of the add event form
    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Cancel and close model form for event addition
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    // handle submit form event for scheduling the event
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("skylight state" + this.state);
        alert("event resource " + this.state.eventResource
        + " event.title " + this.state.eventTitle
        + " event start date " + this.state.startDate);
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>Resource Reservation</h3>
                    <form>
                        <input type="text" placeholder="Event Title"
                        name="eventTitle" onChange={this.handleChange} /><br/>
                        <input type="text" placeholder="Organizing Team"
                        name="eventTeam" onChange={this.handleChange} /><br/>
                        <DatePicker selected={this.state.startDate}
                        onChange={this.handleChange} 
                        name="startDate"/>
                    </form>
                </SkyLight>
            </div>
        );
    }
}

export default AddEvent;