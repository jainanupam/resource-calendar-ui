import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import DatePicker from 'react-datepicker';
import { DateTimePicker } from "@material-ui/pickers";
import moment from "moment";

const DATE_TIME_FORMAT = "DD/MMM/YYYY hh:mm A";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      team: "",
      startDate: props.eventTime["start"],
      endDate: props.eventTime["end"]
    };

    if (props.open) {
      this.state = {
        open: props.open,
        startDate: props.eventTime["start"],
        endDate: props.eventTime["end"]
      };
      //this.setState({open:props.open});
    }

    this.bindScopes([
      "handleClickOpen",
      "handleClose",
      "handleChange",
      "handleDateChange",
      "handleSubmit",
      "getChangedDate"
    ]);

    // console.log('new event start time ' + this.state.startDate);
    // console.log('new event end time ' + this.state.endDate);
  }

  bindScopes(keys) {
    for (let key of keys) {
      this[key] = this[key].bind(this);
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    // Callback method in case of canceling addEvent dialog
    this.props.addEventCancelCallback();
  }

  handleSubmit() {
    // console.log('new event title: ' + this.state.title);
    // console.log('new start time ' + this.state.startDate);
    this.setState({ open: false });
    this.props.addEventCallback({
      title: this.state.title,
      team: this.state.team,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleDateChange(event) {
    console.log("event " + event);
    this.setState({ startDate: event });
  }

  getChangedDate(date) {
    // console.log("object type " + Object.prototype.toString.call(date));
    // console.log("date to be parsed tostring " + new Date(date.toString()));
    return new Date(date.toString());
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Schedule new event for resource.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Event Title"
              type="text"
              fullWidth
              tabIndex={0}
              onChange={this.handleChange}
              required
            />
            <TextField
              margin="dense"
              id="team"
              label="Team name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              required
            />

            <DateTimePicker
              variant="outlined"
              id="startDate"
              label="Starts "
              value={this.state.startDate || Date.now()}
              format={DATE_TIME_FORMAT}
              onChange={dateTime => {
                //alert(dateTime);
                // Set the start date-time as expected
                this.setState({ startDate: this.getChangedDate(dateTime) });

                // check if new start date-time is after current end date-time
                // then update the end date-time also to same as start time.
                if (dateTime > this.state.endDate) {
                  this.setState({ endDate: this.getChangedDate(dateTime) });
                }
              }}
            />
            <br />

            <DateTimePicker
              variant="outlined"
              id="endDate"
              label="Ends "
              value={this.state.endDate}
              format={DATE_TIME_FORMAT}
              onChange={dateTime => {
                this.setState({ endDate: this.getChangedDate(dateTime) });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
