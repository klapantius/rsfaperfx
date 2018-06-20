import React, { Component } from "react";
import fetch from "node-fetch";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch("/api/db")
            .then(response => response.json())
            .then(data => this.setState(data))
            .catch(error => this.setState(error));
    }

    render() {
        return (
            <div>
                Hello World! Let's dance!<br />
                {this.state["query_time"] &&
                    this.state["size_of_rsfa"] &&
                    this.state["first10"] && (
                        <div>
                            <p>{this.state["query_time"]}</p>
                            <p>
                                Found {this.state["size_of_rsfa"]} entries, here
                                are the first 10 of them:
                                <ul>
                                    {this.state["first10"].map(i =>
                                        <li>{JSON.stringify(i)}</li>
                                    )}
                                </ul>
                            </p>
                        </div>
                    )}
            </div>
        );
    }
}
