import React, { Component } from 'react';
import Session from 'react-session-api';

class Redirect extends Component {

    componentDidMount() {
        Session.set("check", 1);
        this.props.history.push('/profile');
    }

    render() {
        return (
            <p></p>
        );
    }
}

export default Redirect;