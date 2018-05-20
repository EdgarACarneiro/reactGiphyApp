import React, { Component } from 'react';
import { PageHeader, Tabs, Tab } from 'react-bootstrap';
import './App.css';

import Search from './Search';
import Functionalities from './Functionalities';

var GphApiClient = require('giphy-js-sdk-core')

class App extends Component {

    constructor() {
        super();
        this.state = {
            giphy: GphApiClient("8XADJBZWvzB75qIDyCpfWLbnE5otD7wG"),
            searchQuery: "",
            gifs: []
        };

        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        //this.getFavs = this.getFavs.bind(this);
    }

    search(event) {
        event.preventDefault();

        this.state.giphy.search('gifs', { "q": this.state.searchQuery })
            .then((response) => {
                this.setState({
                    gifs: []
                });

                response.data.forEach((gif) => {
                    let newArray = this.state.gifs.slice();
                    newArray.push(gif.images.fixed_height_downsampled.gif_url);

                    this.setState({
                        gifs: newArray
                    });
                })
            })
            .catch((err) => {
                // Maybe Alert Danger
            });
    }

    updateQuery(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    render() {
        return (
            <section>
                <PageHeader>
                    FavGiphy
                </PageHeader>
                <Search query={this.state.searchQuery} search={this.search} handleChange={this.updateQuery} />
                <Functionalities feed={this.state.gifs} />
            </section>
        );
    }
}

export default App;
