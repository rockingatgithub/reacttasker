// ===============================the user component=================================================================

import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import { signOutUser } from "../actions";
import { connect } from "react-redux";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: true,
      userProfileChange: false,
      password: this.props.password,
    };
  }

  componentDidMount = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.props.email, this.props.password)
      .then(function () {
        console.log("signed in");
      })
      .catch(function (error) {
        console.log("error");
      });
  };

  openForm = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.props.email, this.props.password)
      .then(function () {
        console.log("signed in");
      })
      .catch(function (error) {
        console.log("error");
      });
    this.setState({
      userProfile: false,
      userProfileChange: true,
    });
  };

  passwordHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  saveForm = async () => {
    const { password } = this.state;

    if (password.length < 6) {
      alert("Password must be 6 characters long");
      return;
    }

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.props.email, this.props.password)
      .then(function () {
        console.log("signed in");
      })
      .catch(function (error) {
        console.log("error");
      });

    let user = await firebase.auth().currentUser;

    await user
      .updatePassword(password)
      .then(function () {
        alert("Password changed successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  logoutHandler = () => {
    let self = this;
    firebase
      .auth()
      .signOut()
      .then(function () {
        self.props.dispatch(signOutUser());
        console.log("signed out");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  render() {
    const { userProfile, userProfileChange } = this.state;
    return (
      <div>
        {userProfile && (
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5" component="h6">
                Username: {this.props.email}
              </Typography>

              <Typography
                variant="h5"
                component="h6"
                style={{ marginTop: "20px" }}
              >
                Password: {this.props.password}
              </Typography>
            </Grid>

            <Grid item style={{ marginTop: "20px" }}>
              <Button variant="contained" onClick={this.openForm}>
                Change Password
              </Button>
              <Button
                variant="contained"
                onClick={this.logoutHandler}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        )}
        {userProfileChange && (
          <Grid container direction="column" justify="center">
            <Grid item>
              <Typography variant="h5" component="h6">
                Username: {this.props.email}
              </Typography>
              <Typography
                variant="h5"
                component="h6"
                style={{ marginTop: "20px" }}
              >
                Password:
                <TextField
                  required
                  id="outlined-required"
                  type="password"
                  label="Enter Your Password"
                  onChange={this.passwordHandler}
                  aria-describedby="my-helper-text"
                  variant="outlined"
                />
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "20px" }}>
              <Button variant="contained" onClick={this.saveForm}>
                Save Password
              </Button>
              <Button
                variant="contained"
                onClick={this.logoutHandler}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

export default connect(mapStateToProps)(User);
