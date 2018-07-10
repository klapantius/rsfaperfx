import React, { Component } from "react";
import Head from "next/head";
import fetch from "node-fetch";

import SummaryContext from "../components/summaryContext";
import Summary from "../components/summaryTable";
import StatusLine from "../components/statusLine";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "initializing",
            summary: [],
            selected: []
        };
    }

    componentDidMount() {
        this.setState({ status: "loading", ...this.state });
        fetch("/api/status")
            .then(response => response.json())
            .then(r =>
                this.setState({
                    status: r.error
                        ? `error while fetching summary data: ${r.error}`
                        : "summary loaded",
                    summary: r.error ? [] : r
                })
            )
            .catch(error =>
                this.setState({
                    status: `processing of summary failed: ${error}`,
                    summary: []
                })
            );
    }

    selectionChanged(event, id) {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
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
                <Summary handleClick={(e, id) => this.selectionChanged(e, id)} />
                <StatusLine text={this.state.status} />
            </SummaryContext.Provider>
        );
    }
}
