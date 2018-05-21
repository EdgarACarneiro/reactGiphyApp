import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import GifsContainer from './GifsContainer';

class Functionalities extends Component {
    constructor(props)  {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Feed">
                    <GifsContainer gifs={this.props.feed} 
                    action={this.props.feedAction} scrollAction={this.props.scrollFeed} />
                </Tab>
                <Tab eventKey={2} title="Favorites">
                    <GifsContainer gifs={this.props.favorites} 
                    action={this.props.favoritesAction} scrollAction={this.props.scrollFavorites} />
                </Tab>
            </Tabs>
        );
    }
}

export default Functionalities;