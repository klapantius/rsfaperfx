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
                <p>{this.state.query_time}</p>
                <p>found {this.state.size_of_rsfa} entries<br />here are the first 10 of them:
                <ul>
                    {this.state.first10.map(i => <li>{JSON.stringify(i)}</li>)}
                </ul>
                </p>
            </div>
        )
    }
}