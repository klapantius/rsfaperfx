import React, { Component } from "react";
import Head from "next/head";
import fetch from "node-fetch";

import SummaryContext from '../components/summaryContext';
import Summary from '../components/summary';
import StatusLine from "../components/statusLine";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'initializing',
            summary: []
        };
    }

    componentDidMount() {
        this.setState({ status: 'loading', ...this.state });
        fetch("/api/db")
            .then(response => response.json())
            .then(data => this.setState({
                status: 'summary loaded',
                summary: data,
            }))
            .catch(error => this.setState({
                status: `loading of summary failed: ${error}`,
                summary: [],
            }));
    }

    render() {
        return (
            <SummaryContext.Provider value={this.state.summary}>
                <Head>
                    <title>RSFA performance</title>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <Summary />
                <StatusLine text={this.state.status} />
            </SummaryContext.Provider>
        );
    }
}
