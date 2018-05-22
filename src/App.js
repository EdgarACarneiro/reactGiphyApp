import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';
import './css/App.css';

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
            gifsOffset: 0,
            favorites: [],
            favoritesLimit: 25
        };

        this.infiniteScroll = throttle(1000, this.infiniteScroll);
        this.infiniteScroll = this.infiniteScroll.bind(this);

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

    componentDidMount() {
        window.addEventListener('scroll', this.infiniteScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.infiniteScroll);
    }

    loadFeed() {
        this.state.giphy.trending("gifs", { "offset": this.state.gifsOffset })
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
            if (storageFavorites == null)
                return;

            this.setState({
                favoritesLimit: this.state.favoritesLimit + 25,
                favorites: storageFavorites.split(",").slice(0, this.state.favoritesLimit),
            });
        } else {
            // Sorry! No Web Storage support..
        }
    }

    infiniteScroll() {
        // Check if close to the end of the page
        if ((window.innerHeight + window.scrollY) < (document.body.scrollHeight - 400))
            return;

        if (window.location.pathname === "/Favorites") {
            this.scrollFavorites();
        }
        else
            this.scrollFeed();
    }

    scrollFeed() {
        this.setState({
            gifsOffset: this.state.gifsOffset + 25
        });
        this.loadFeed();
    }

    scrollFavorites() {
        // Only load if it has as many favorites as the previous limit
        if (this.state.favoritesLimit == this.state.favorites.length)
            this.loadFavorites();
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

    addFavorite(event, gif) {
        let index = this.state.favorites.indexOf(gif);

        // Meaning gif does not yet exist
        if (index == -1) {
            let newArray = this.state.favorites.slice();
            newArray.unshift(gif);

            this.setState({
                favorites: newArray
            });
            localStorage.setItem("favorites", newArray);
        }
    }

    removeFavorite(event, gif) {
        let index = this.state.favorites.indexOf(gif);

        if (index > -1) {
            let newArray = this.state.favorites.slice();
            newArray.splice(index, 1);

            this.setState({
                favorites: newArray
            });
            localStorage.setItem("favorites", newArray);
        }
    }

    render() {
        return (
            <section>
                <Search query={this.state.searchQuery} search={this.search} handleChange={this.updateQuery} />
                <Functionalities feed={this.state.gifs} feedAction={this.addFavorite} scrollFeed={this.teste1}
                    favorites={this.state.favorites} favoritesAction={this.removeFavorite} scrollFavorites={this.teste2} />
            </section>
        );
    }
}

export default App;
