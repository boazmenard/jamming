import React from 'react';

export default class Track extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.artist}</p>
                </div>
                <button className="Track-action">+ or -</button>
            </div>
        )
    }
}