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
                    {/*<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <LinkContainer to="/feed">
                            <Tab eventKey={1} title="Feed">
                                <GifsContainer gifs={this.props.feed}
                                action={this.props.feedAction} scrollAction={this.props.scrollFeed} />
                            </Tab>
                        </LinkContainer>
                        <Tab eventKey={2} title="Favorites">
                            <GifsContainer gifs={this.props.favorites}
                                action={this.props.favoritesAction} scrollAction={this.props.scrollFavorites} />
                        </Tab>
                    </Tabs>*/}
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
                        <Route path="/Favorites" render={(props) => <GifsContainer {...props} gifs={this.props.favorites}
                            action={this.props.favoritesAction} scrollAction={this.props.scrollFavorites} />} />

                        <Route render={(props) => <GifsContainer {...props} gifs={this.props.feed}
                            action={this.props.feedAction} scrollAction={this.props.scrollFeed} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Functionalities;