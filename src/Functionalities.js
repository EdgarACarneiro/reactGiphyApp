import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import GifsContainer from './GifsContainer';

class Functionalities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Feed</Link>
                        </li>
                        <li>
                            <Link to="/Favorites">Favorites</Link>
                        </li>
                    </ul>

                    <hr />
                    <Switch>
                        <Route path="/Favorites" render={(props) => <GifsContainer {...props} hoverMsg={"unfavorite"} gifs={this.props.favorites}
                            action={this.props.favoritesAction} scrollAction={this.props.scrollFavorites} />} />

                        <Route render={(props) => <GifsContainer {...props} hoverMsg={"favorite"} gifs={this.props.feed}
                            action={this.props.feedAction} scrollAction={this.props.scrollFeed} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Functionalities;