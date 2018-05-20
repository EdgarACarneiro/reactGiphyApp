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
                    <GifsContainer gifs={this.props.feed} />
                </Tab>
                <Tab eventKey={2} title="Favorites">
                    <GifsContainer gifs={this.props.favorites} />
                </Tab>
            </Tabs>
        );
    }
}

export default Functionalities;