import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Habilitation extends Component {
    state = {

    }

    // 





    render() {
        return (
            <div>

            </div>
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
        // isConnected: (user) => dispatch({ type: 'STORE_USER', currentUser: user })
    }
}

export default connect(stateToProps, actionDisppatchToProps)(Habilitation);
