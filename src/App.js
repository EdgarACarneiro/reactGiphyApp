import React, { Component } from 'react';
import { PageHeader, Tabs, Tab } from 'react-bootstrap';

import Search from './Search';
import Functionalities from './Functionalities';

import './App.css';

class App extends Component {

    render() {
        return (
            <section>
                <PageHeader>
                    FavGiphy
                </PageHeader>
                <Search />
                <Functionalities />
            </section>
        );
    }
}

export default App;
