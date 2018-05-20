import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Discover: </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <form onSubmit={this.props.search} >
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Discover Amazing Giphs!"
                                    value={this.props.query} onChange={this.props.handleChange} />
                            </FormGroup>{' '}
                            <Button type="submit">Search</Button>
                        </Navbar.Form>
                    </form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Search;
