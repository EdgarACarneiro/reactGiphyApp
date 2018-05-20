import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
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
            gifs: [],
            favorites: []
        };

        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);

        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    componentWillMount() {
        // Loading Giphs' feed
        this.loadFeed();

        // Loading Favorited Giphs
        this.loadFavorites();
    }

    loadFeed() {
        this.state.giphy.trending("gifs", {})
        .then((response) => {
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

    loadFavorites() {
        if (typeof (Storage) !== "undefined") {
            let storageFavorites = localStorage.getItem("favorites");
            if (storageFavorites != null) {
                this.setState({
                    favorites: storageFavorites
                });
            }
        } else {
            // Sorry! No Web Storage support..
        }
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

    addFavorite(event) {
        let favorites = localStorage.getItem("favorites");
        favorites.push(event);
        localStorage.setItem("favorites", favorites);

        let newArray = this.state.favorites.slice();
        newArray.push(event);
        this.setState({
            favorites: newArray
        });
    }

    removeFavorite(event) {
        let favorites = localStorage.getItem("favorites");

        let index = favorites.indexOf(event);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", favorites);

            let newArray = this.state.favorites.slice();
            newArray.splice(index, 1);
            this.setState({
                favorites: newArray
            });
        }
    }

    render() {
        return (
            <section>
                <PageHeader>
                    FavGiphy
                </PageHeader>
                <Search query={this.state.searchQuery} search={this.search} handleChange={this.updateQuery} />
                <Functionalities feed={this.state.gifs} feedAction = {this.state.addFavorite} 
                favorites={this.state.favorites} favoritesAction={this.state.removeFavorite} />
            </section>
        );
    }
}

export default App;
