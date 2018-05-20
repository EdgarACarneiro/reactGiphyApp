import React, { Component } from 'react';

class GifsContainer extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

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