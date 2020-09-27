// ======================================the navbar component===============================================

import {
  AppBar,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Toolbar,
  Button,
  FormControl,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";
import User from "./User";
import FirstOption from "./FirstOption";
import SecondOption from "./SecondOption";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: true,
      showInformation: true,
      isHomeSelected: true,
      isTaskSelected: false,
      isUserSelected: false,
      isHome: true,
      isTask: false,
      isUser: false,
      option1Selected: true,
      option2Selected: false,
    };
  }

  optionHandler1 = () => {
    this.setState({
      option1Selected: true,
      option2Selected: false,
    });
  };

  optionHandler2 = () => {
    this.setState({
      option1Selected: false,
      option2Selected: true,
    });
  };

  homeHandler = () => {
    this.setState({
      isHomeSelected: true,
      isTaskSelected: false,
      isUserSelected: false,
      isHome: true,
      isTask: false,
      isUser: false,
    });
  };

  taskHandler = () => {
    this.setState({
      isHomeSelected: false,
      isTaskSelected: true,
      isUserSelected: false,
      isHome: false,
      isTask: true,
      isUser: false,
    });
  };

  userHandler = () => {
    this.setState({
      isHomeSelected: false,
      isTaskSelected: false,
      isUserSelected: true,
      isHome: false,
      isTask: false,
      isUser: true,
    });
  };

  render() {
    const {
      isHomeSelected,
      isTaskSelected,
      isUserSelected,
      isHome,
      option1Selected,
      option2Selected,
      isTask,
      isUser,
    } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item style={{ width: "100%" }}>
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography
                      onClick={this.homeHandler}
                      variant="h5"
                      className="uppertabs"
                    >
                      Home
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      onClick={this.taskHandler}
                      variant="h5"
                      className="uppertabs"
                    >
                      Tasks
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      onClick={this.userHandler}
                      variant="h5"
                      className="uppertabs"
                    >
                      User
                    </Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            {isHome && (
              <div id="navbox" style={{ marginTop: "20px" }}>
                <Grid container>
                  <Grid item>
                    <FormControl variant="outlined" id="my-form">
                      <InputLabel id="demo-simple-select-outlined-label">
                        DropDown
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                      >
                        <MenuItem onClick={this.optionHandler1} value="10">
                          Option1
                        </MenuItem>
                        <MenuItem onClick={this.optionHandler2} value="20">
                          Option2
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {option1Selected && <FirstOption />}
                {option2Selected && <SecondOption />}
              </div>
            )}

            {isTask && (
              <div id="navbox" style={{ marginTop: "20px" }}>
                <Grid container>
                  <Grid item>
                    <TaskList dispatch={this.props.dispatch} />
                  </Grid>
                </Grid>
              </div>
            )}

            {isUser && (
              <div id="navbox" style={{ marginTop: "20px" }}>
                <Grid container>
                  <Grid item>
                    <User
                      email={this.props.email}
                      password={this.props.password}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

export default connect(mapStateToProps)(Navbar);
