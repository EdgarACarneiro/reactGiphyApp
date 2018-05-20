import React, { Component } from 'react';

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const gifs = this.props.gifs.map((gif, i) =>
            <img key={i} src={gif} alt="A gif" />
        );

        return (
            <div>
                {gifs}
            </div>
        );
    }
}

export default Feed;