import React, { Component } from 'react';
import './App.css';

import { Switch, NavLink, Route } from "react-router-dom";
import { connect } from 'react-redux';

import axios from "axios";

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Grille from './components/habilitations/Grille'
import Habilitation from './components/habilitations/Habilitation';




class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromBackend => {
        // console.log("Check User in APP.JS: ",responseFromBackend.data)
        const { userDoc } = responseFromBackend.data;
        this.syncCurrentUser(userDoc);
        if (userDoc) {
          this.props.isConnected(userDoc);
          this.props.isConnectedFULL(userDoc);
          console.log('from apps', this.props.userFull.user)
        } else {
          this.props.isConnected('No User');
          this.props.isConnectedFULL('No User');
        }

      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user) {
    this.setState({ currentUser: user });
  }


  render() {
    return (
      <div className="App">
        <header>
          <Navbar></Navbar>

          <h1> IronPhones ☎ </h1>
          <nav style={{ marginBottom: '3rem' }}>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login-page"> Login </NavLink>
            <NavLink to="/grille"> Grille </NavLink>
            <NavLink to="/habilitation"> habilitation </NavLink>

          </nav >
        </header>

        <Switch>
          {/* this is example how to normally do the Route: */}
          {/* <Route path="/somePage" component={ someComponentThatWillRenderWhenUSerClickThisLink }   /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/grille" component={Grille} />
          <Route exact path="/habilitation" component={Habilitation} />


          {/*  */}
          <Route path="/signup-page" render={() =>
            <Signup currentUser={this.state.currentUser}
              onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />


          <Route path="/login-page" render={() =>
            <Login currentUser={this.state.currentUser}
              onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />

        </Switch>


        <footer>
          Made with at Ironhack - PTWD 2019

          <p>{
            this.state.currentUser ? this.state.currentUser.fullName : ""
          }</p>


        </footer >
      </div >
    );
  }
}

const stateToProps = state => {
  return {
    user: state.UserReducer.currentUser,
    ll: state.UserReducer.lapin,
    userFull: state.UserReducer.currentUserFull,
  }
}

const actionDisppatchToProps = dispatch => {
  return {
    isConnected: (user) => dispatch({ type: 'STORE_USER', currentUser: user }),
    isConnectedFULL: (user) => dispatch({ type: 'STORE_USER_FULL', currentUserFull: { user } })
  }
}

export default connect(stateToProps, actionDisppatchToProps)(App);
