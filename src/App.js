import React from 'react';
import './App.css';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
//import 'react-big-calendar/lib/sass/prism.scss';
import './scss/styles.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Card from './Card.js';

const localizer = momentLocalizer(moment)
const mySampleEventsList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2019, 7, 1),
    end: new Date(2019, 7, 2),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2019, 7, 1),
    end: new Date(2019, 7, 3),
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
      events: null
    };

    this.bindScopes([
      'timesToEvents'
    ]);
  }

  bindScopes(keys) {
    for (let key of keys) {
      this[key] = this[key].bind(this);
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/events")
      .then(res => res.json())
      .then((result) => this.timesToEvents(result),
        (error) => {
          console.log(error);
        })
  }


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


  render() {
    return (
      <div className="app">
        <div>{moment(mySampleEventsList[2].start).toDate().toISOString()}</div>
        <div className="example">
          <Card className="examples--header">
            {
              this.state.events === null ?
                (<Calendar
                  selectable="true"
                  localizer={localizer}
                  events={mySampleEventsList}

                />)
                :
                (<Calendar
                  selectable="true"
                  localizer={localizer}
                  events={this.state.events}

                />)
            }

          </Card>
        </div>
      </div>

    );
  }

}

export default App;
