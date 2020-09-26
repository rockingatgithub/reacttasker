// ========================================tasklist component================================================

import React, { Component } from "react";
import { connect } from "react-redux";
import { allTaskList } from "../actions";
import List from "@material-ui/core/List";
import { Button } from "@material-ui/core";
import Task from "./Task";
import AddTask from "./AddTask";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(allTaskList());
  }

  openForm = () => {
    this.setState({
      showForm: true,
    });
  };

  render() {
    const { tasks } = this.props;
    const { list } = tasks;
    return (
      <div>
        <Button onClick={this.openForm} variant="contained">
          {" "}
          ADD TASK{" "}
        </Button>
        {this.state.showForm && (
          <AddTask tasks={tasks} dispatch={this.props.dispatch} />
        )}

        <Grid item xs={12} md={6}>
          <Typography variant="h6">All Tasks</Typography>
          <div>
            <List>
              
                
              
            </List>
          </div>
        </Grid>

        <List component="nav" aria-label="secondary mailbox folders">
          {list.map((task) => (
            <Task key={task.id} task={task} dispatch={this.props.dispatch} />
          ))}
        </List>
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

export default connect(mapStateToProps)(TaskList);
