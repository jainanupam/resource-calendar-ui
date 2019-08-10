import React from "react";
import "./App.css";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./scss/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Card from "./Card.js";
import FormDialog from "./components/FormDialog";
// The following two are required for material-ui DatePicker
// element's proper functioning.
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const localizer = momentLocalizer(moment);
const avlblViews = { month: true, day: true, week: true };
const mySampleEventsList = [
  {
    id: 0,
    title: "All Day Event with long title",
    allDay: true,
    start: new Date(2019, 7, 1),
    end: new Date(2019, 7, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2019, 7, 1, 10, 30),
    end: new Date(2019, 7, 3, 12, 30)
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: mySampleEventsList,
      showEvent: false,
      newEvent: null
    };

    this.bindScopes([
      "timesToEvents",
      "handleSelect",
      "addEventCallback",
      "cancelEventCallback"
    ]);

    // let allViews = Object.keys(Views).map(k => Views[k])
    // console.log("allVIews", allViews);
  }

  bindScopes(keys) {
    for (let key of keys) {
      this[key] = this[key].bind(this);
    }
  }

  // Making call to API for fetching current events
  // TODO Need to add date range parameters to API call
  componentDidMount() {
    fetch("http://localhost:8080/events")
      .then(res => res.json())
      .then(
        result => this.timesToEvents(result),
        error => {
          console.log(error);
        }
      );
  }

  // Convert response from API to Events objects for
  // displaying on UI
  timesToEvents(times) {
    const events = times.map(time => {
      const title = time.title;
      //const team =
      const start_date = moment(time.startDateTime);
      const end_date = moment(time.endDateTime);
      return {
        title: title,
        start: start_date.toDate(),
        end: end_date.toDate()
      };
    });
    console.log(events);
    this.setState({
      events: events
    });
  }

  // Handle slot selection event for booking a resource
  handleSelect = ({ start, end }) => {
    //alert('start ' + start + ' end ' + end);
    //this.addEvent = <AddEvent />
    console.log("start time before calling form dialog " + start);
    console.log("end time before calling form dialog " + end);
    console.log("this before " + this);

    this.setState({
      showEvent: true,
      newEvent: {
        start: start,
        end: end
      }
    });

    //<div>{moment(mySampleEventsList[2].start).toDate().toISOString()}</div>
  };

  render() {
    // const addEvent = (start, end) => {
    // <AddEvent addEvent={this.addEvent} />
    // }
    let addEventDialog;
    if (this.state.showEvent) {
      addEventDialog = (
        <FormDialog
          eventTime={this.state.newEvent}
          open={true}
          addEventCallback={this.addEventCallback}
          addEventCancelCallback={this.cancelEventCallback}
        />
      );
    }
    return (
      <div className="app">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div>{addEventDialog}</div>

          <div className="example">
            <Card className="examples--header">
              {
                <Calendar
                  selectable={true}
                  localizer={localizer}
                  events={this.state.events}
                  views={avlblViews}
                  onSelectEvent={event => alert(event.title)}
                  onSelectSlot={this.handleSelect}
                />
              }
            </Card>
          </div>
        </MuiPickersUtilsProvider>
      </div>
    );
  }

  // Callback method to be called from AddEvent class.
  addEventCallback(event) {
    const allDay = event["allDay"];
    const title = event["title"];
    const team = event["team"];
    const startDate = event["startDate"];
    const endDate = event["endDate"];

    console.log("New event to be scheduled " + title);

    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            title: title,
            allDay: allDay,
            start: startDate,
            end: endDate,
            team: team
          }
        ]
      });

    // Reset the flag showEvent
    this.setState({
      showEvent: false,
      newEvent: null
    });

    console.log("this after " + this.state.events.length);
  }

  cancelEventCallback(event) {
    // Reset the flag showEvent
    this.setState({
      showEvent: false,
      newEvent: null
    });
  }
}

export default App;
