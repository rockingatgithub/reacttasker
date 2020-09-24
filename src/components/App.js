import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

class App extends Component {
  authhandler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword("raja@babu.com", "1234")
      .catch(function (error) {
        console.log("error");
      });
  };

  signinhandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("raja@babu.com", "1234")
      .then(function () {
        console.log("signed in");
      })
      .catch(function (error) {
        console.log("error");
      });
  };

  signouthandler = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("signed out");
      })
      .catch(function (error) {
        console.log("error");
      });
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid conatiner item>
          <Button onClick={this.authhandler}> signup </Button>
          <Button onClick={this.signinhandler}> signin </Button>
          <Button onClick={this.signouthandler}> signout </Button>
        </Grid>
      </Grid>
    );
  }
}

export default App;
