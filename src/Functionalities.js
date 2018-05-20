import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Favorites from './Favorites';
import Feed from './Feed';

class Functionalities extends Component {
    constructor(props)  {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Feed">
                    <Feed gifs={this.props.feed} />
                </Tab>
                <Tab eventKey={2} title="Favorites">
                    <Favorites />
                </Tab>
            </Tabs>
        );
    }
}

export default Functionalities;