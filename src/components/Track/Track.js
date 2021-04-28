import React from 'react';

export default class Track extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>track name</h3>
                    <p>track artist | track album</p>
                </div>
                <button className="Track-action">+ or -</button>
            </div>
        )
    }
}