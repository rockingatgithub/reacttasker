import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { addTask } from "../actions";
import {
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { connect } from "react-redux";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      completed: false,
    };
  }

  titleHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  taskCompleted = () => {
    this.setState({
      completed: true,
    });
  };

  taskNotCompleted = () => {
    this.setState({
      completed: false,
    });
  };

  handleAddTask = () => {
    const { title, completed } = this.state;
    let self = this;
    const task = {
      userId: 1,
      id: "NewTask",
      title: title,
      completed: completed,
    };
    this.props.dispatch(addTask(task));
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <FormControl>
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Enter the task title"
            onChange={this.titleHandler}
            aria-describedby="my-helper-text"
            variant="outlined"
          />
        </FormControl>
        <FormControl component="fieldset" style={{ marginLeft: "20px" }}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup aria-label="status" name="status1" row>
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Completed"
              onChange={this.taskCompleted}
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Not Completed"
              onChange={this.taskNotCompleted}
            />
          </RadioGroup>
        </FormControl>
        <Button variant="default" onClick={this.handleAddTask}>
          Submit
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

export default connect(mapStateToProps)(AddTask);
