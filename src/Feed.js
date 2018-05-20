import React, { Component } from 'react';

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    render() {
        const gifs = this.props.gifs.map((gif, i) =>
            <img key={i} src={gif} alt="" />
        );

        return (
            <div>
                {gifs}
            </div>
        );
    }
}

export default Feed;