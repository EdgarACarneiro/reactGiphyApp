import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Favs from './Favs';
import Feed from './Feed';

class Functionalities extends Component {

    render() {
        return (
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Favorites">
                    <Favs />
                </Tab>
                <Tab eventKey={2} title="Feed">
                    <Feed />
                </Tab>
            </Tabs>
        );
    }
}

export default Functionalities;