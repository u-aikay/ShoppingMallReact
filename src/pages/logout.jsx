import React, { Component } from 'react';
import Session from 'react-session-api';

class Logout extends Component {

    componentDidMount() {
        if (window.sessionStorage.getItem('id')) {
            window.sessionStorage.removeItem('id');
            Session.remove('data');
        }

        window.location.href = "/"
        
    }

    render() {
        return (
            <p></p>
        );
    }
}

export default Logout;