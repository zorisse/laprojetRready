import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {
    state = {

    }


    render() {
        const userlist = axios.get('http://localhost:3001/api/userList')
            .then(user => {
                console.log(user.data);
                return user;
            })
        return (
            <section>
                <h1> Home Page </h1>
                <p> Welcome to IronPhones! This is your favorite store forever! </p>

            </section>
        )
    }

}

export default Home;