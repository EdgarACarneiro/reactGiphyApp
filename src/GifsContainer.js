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
            <figure key={i} className="effect-sarah">
                <span>
                    <img onClick={((event) => this.props.action(event, gif))}
                        src={gif} alt="" />
                </span>
                <figcaption>
                    <h2>{this.props.hoverMsg}</h2>
                </figcaption>
            </figure>
        );

        return (
            <div className="grid">
                {gifs}
            </div>
        );
    }
}

export default GifsContainer;