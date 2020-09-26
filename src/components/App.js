// =================================entry point of our app===========================================================

import React, { Component } from "react";
import {
  Button,
  Grid,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { signInUser } from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      showNavBar: false,
    };
  }

  componentDidMount = () => {
    let self = this;
    console.log(self.props);
  };

  emailHandler = (e) => {
    this.setState({
      userEmail: e.target.value,
    });
  };

  passwordHandler = (e) => {
    this.setState({
      userPassword: e.target.value,
    });
  };

  authhandler = () => {
    const { userEmail, userPassword } = this.state;

    if (userPassword.length < 6) {
      alert("Password must be 6 characters long!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(this.signinhandler)
      .catch(function (error) {
        console.log("error", error);
      });
  };

  signinhandler = () => {
    let self = this;
    const { userEmail, userPassword } = this.state;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, userPassword)
          .then(function () {
            self.props.dispatch(signInUser());
          })
          .catch(function (error) {
            alert("Invalid user id password");
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { userEmail, userPassword } = this.state;
    const { isLoggedIn, isLoggedOut } = this.props.tasks;
    return (
      <div>
        {isLoggedOut && (
          <Grid container direction="column" justify="center" spacing={2}>
            <AppBar position="static" alignitems="center" color="primary">
              <Toolbar>
                <Grid container justify="center" wrap="wrap">
                  <Grid item>
                    <Typography variant="h6">REACTTASKER</Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        )}

        {isLoggedOut && (
          <Grid
            item
            spacing={2}
            direction="column"
            justify="center"
            style={{ marginTop: "20px" }}
          >
            <Grid item>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Grid>
            <FormControl>
              <TextField
                required
                id="outlined-required"
                type="email"
                label="Enter Your Email/Username"
                onChange={this.emailHandler}
                aria-describedby="my-helper-text"
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                required
                label="Enter Your Password"
                type="password"
                id="my-input-password"
                onChange={this.passwordHandler}
                aria-describedby="my-helper-text"
                variant="outlined"
              />
            </FormControl>
            <Button variant="contained" onClick={this.signinhandler}>
              Signin
            </Button>
          </Grid>
        )}
        {isLoggedOut && (
          <Grid item spacing={2} direction="column" justify="center">
            <Grid item>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Grid>
            <FormControl>
              <TextField
                required
                label="Enter Your Email/Username"
                type="email"
                onChange={this.emailHandler}
                aria-describedby="my-helper-text"
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                required
                label="Enter Your Password"
                type="password"
                id="my-input-password"
                onChange={this.passwordHandler}
                aria-describedby="my-helper-text"
                variant="outlined"
              />
            </FormControl>
            <Button variant="contained" onClick={this.authhandler}>
              Signup
            </Button>
          </Grid>
        )}

        {isLoggedIn && (
          <Navbar
            dispatch={this.props.dispatch}
            email={userEmail}
            password={userPassword}
          />
        )}
      </div>
    );
  }
}

function callback(state) {
  return {
    tasks: state.tasks,
  };
}

const connectedComponent = connect(callback)(App);

export default connectedComponent;
