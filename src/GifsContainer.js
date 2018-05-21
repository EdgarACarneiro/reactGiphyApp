import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import './GifsContainer.css'

class GifsContainer extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    /*componentDidMount() {
        console.log(this.props.scrollAction);
        window.addEventListener('scroll', this.props.scrollAction);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.scrollAction);
    }*/

    render() {
        const gifs = this.props.gifs.map((gif, i) =>
            <img key={i}
                onClick={((event) => this.props.action(event, gif))}
                src={gif} alt="" />
        );

        return (
            <div>
                {gifs}
            </div>
        );
    }
}

export default GifsContainer;