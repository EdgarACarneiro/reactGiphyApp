import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';
import { PageHeader } from 'react-bootstrap';
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
            favoritesOffset: 0
        };

        this.infiniteScroll = throttle(1000, this.infiniteScroll);
        this.infiniteScroll = this.infiniteScroll.bind(this);

        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);

        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);

        this.teste1 = this.teste1.bind(this);
        this.teste2 = this.teste2.bind(this);
    }

    componentWillMount() {
        // Loading Giphs' feed
        this.loadFeed();
        // Loading Favorited Giphs
        this.loadFavorites();
    }

    /*componentDidMount() {
        window.addEventListener('scroll', this.infiniteScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.infiniteScroll);
    }*/

    teste1() {
        console.log("A");
    }

    teste2() {
        console.log("B");
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

    infiniteScroll() {
        // Check if close to the end of the page
        if ((window.innerHeight + window.scrollY) < (document.body.offsetHeight - 200))
            return;
        console.log('I requested');
        this.setState({
            gifsOffset: this.state.gifsOffset + 25
        });
        this.loadFeed();
    }

    loadFavorites() {
        if (typeof (Storage) !== "undefined") {
            let storageFavorites = localStorage.getItem("favorites");
            if (storageFavorites == null)
                return;

            this.setState({
                favorites: storageFavorites.split(",")
            });
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

    addFavorite(event, gif) {
        let index = this.state.favorites.indexOf(gif);

        // Meaning gif does not yet exist
        if (index == -1) {
            let newArray = this.state.favorites.slice();
            newArray.push(gif);

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
