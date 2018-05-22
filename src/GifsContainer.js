import React, { Component } from 'react';
import './css/GifsContainer.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class GifsContainer extends Component {
    
    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }

    render() {
        const gifs = this.props.gifs.map((gif, i) =>
            <figure key={i}
                onClick={((event) => this.props.action(event, gif))}
                className="effect-sarah">
                <span>
                    <img src={gif} alt="" />
                </span>
                <figcaption>
                    <h2><FontAwesomeIcon icon={this.props.icon} /></h2>
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