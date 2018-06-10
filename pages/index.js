import React, { Component } from 'react';
import fetch from 'node-fetch';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        fetch("/api/db")
            .then((response) => response.json())
            .then((data) => this.setState(data))
            .catch((error) => this.setState(error));
    }

    render() {
        return (
            <div>Hello World! Let's dance!<br />
                {JSON.stringify(this.state, null, 2)}
            </div>
        )
    }
}