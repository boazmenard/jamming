import React from 'react';
import TrackList from "../Tracklist/TrackList";

export default class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults}/>
            </div>
        )
    }

}