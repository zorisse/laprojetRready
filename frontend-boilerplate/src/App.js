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
import grille2 from './components/habilitations/GrilleContainer'



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
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user) {
    this.setState({ currentUser: user });
    this.props.isConnected(user);
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
            <NavLink to="/grille2"> Grille 2</NavLink>
          </nav >
        </header>

        <Switch>
          {/* this is example how to normally do the Route: */}
          {/* <Route path="/somePage" component={ someComponentThatWillRenderWhenUSerClickThisLink }   /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/grille" component={Grille} />
          <Route exact path="/grille2" component={Grille} />


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
            this.state.currentUser ? console.log("hey ", this.state.currentUser.fullName) : ""


          }</p>
          <p> lapin : {this.props.user} and {this.props.ll}</p>

        </footer >
      </div >
    );
  }
}

const stateToProps = state => {
  return {
    user: state.UserReducer.currentUser.fullName,
    ll: state.UserReducer.lapin,
  }
}

const actionDisppatchToProps = dispatch => {

  return {
    isConnected: (user) => dispatch({ type: 'STORE_USER', currentUser: user })
  }
}

export default connect(stateToProps, actionDisppatchToProps)(App);
