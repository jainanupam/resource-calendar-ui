import React from 'react';
import './App.css';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
//import 'react-big-calendar/lib/sass/prism.scss';
import './scss/styles.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Card from './Card.js';
import AddEvent from './components/AddEvent.js';

const localizer = momentLocalizer(moment)
const avlblViews = {"month": true, "day": true, "week": true}
const mySampleEventsList = [
  {
    id: 0,
    title: 'All Day Event with long title',
    allDay: true,
    start: new Date(2019, 7, 1),
    end: new Date(2019, 7, 2),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2019, 7, 1, 10, 30),
    end: new Date(2019, 7, 3, 12, 30),
  },
  {
    id: 2,
    title: 'Another Long Event',
    start: '2019-07-02',
    end: '2019-07-03',
  }
]


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: mySampleEventsList,
      showEvent:false
    };

    this.bindScopes([
      'timesToEvents',
      'handleSelect'
    ]);

    let allViews = Object.keys(Views).map(k => Views[k])
    console.log("allVIews", allViews);

    this.addEvent = null;
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
      .then((result) => this.timesToEvents(result),
        (error) => {
          console.log(error);
        })
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
    })
    console.log(events);
    this.setState({
      events: events
    })
  }

  // Handle slot selection event for booking a resource
  handleSelect = ({start, end}) => {
   //alert('start ' + start + ' end ' + end);
   //this.addEvent = <AddEvent />
   this.setState({showEvent: true});

    /* const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      }) */
    //<div>{moment(mySampleEventsList[2].start).toDate().toISOString()}</div>
  }

  render() {
    // const addEvent = (start, end) => {
    // <AddEvent addEvent={this.addEvent} />
    // } 
    let addEvent;
    if(this.state.showEvent) {
      addEvent = <AddEvent />;
    }
    return (
      <div className="app">
        <div>{addEvent}</div>
        <div className="example">
          <Card className="examples--header">
            {
              this.state.events === null ?
                (<Calendar
                  selectable={true}
                  localizer={localizer}
                  events={mySampleEventsList}
                  views={avlblViews}
                  onSelectEvent={event => alert(event.title)}
                  onSelectSlot={this.handleSelect}
                />)
                :
                (<Calendar
                  selectable={true}
                  localizer={localizer}
                  events={this.state.events}
                  views={avlblViews}
                  onSelectEvent={event => alert(event.title)}
                  onSelectSlot={this.handleSelect}
                />)
            }

          </Card>
        </div>
      </div>

    );
  }

  // Callback method to be called from AddEvent class.
  addEvent = (event) => {
    console.log("New event to be scheduled " + event);
  }

}

export default App;
