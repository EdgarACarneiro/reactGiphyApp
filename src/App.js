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
            searchQuery: ""
        };

        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        //this.getFavs = this.getFavs.bind(this);
        //this.getFeed = this.getFeed.bind(this);
    }

    search(event) {
        event.preventDefault();

        this.state.giphy.search('gifs', { "q": this.state.input })
            .then((response) => {
                response.data.forEach((gifObject) => {
                    console.log(gifObject);
                    //Talvez ter uma variável feed ou some shit
                })
            })
            .catch((err) => {
                // Talvez retornar um alert
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
                <Functionalities />
            </section>
        );
    }
}

export default App;
