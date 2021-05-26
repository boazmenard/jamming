//import logo from './logo.svg';
import React from 'react';
import './App.css';
import SearchBar  from '../SearchBar/SearchBar';
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            searchResults: [
                {name: 'song 1', artist: 'artist', album: 'album', id: '1'},
                {name: 'song 2', artist: 'artist', album: 'album', id: '2'}
                ],
            playlistName: '',
            playlistTracks: [{name: 'song 1', artist: 'artist', album: 'album', id: '1'}]
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

    addTrack(track) {
        if (!this.state.playlistTracks.find(existingTrack => existingTrack.id === track.id)) {
            this.state.playlistTracks.push(track);
        }
        this.setState({playlistTracks: this.state.playlistTracks});
    }

    removeTrack(track) {
        this.state.playlistTracks = this.state.playlistTracks.filter(existingTrack => existingTrack.id != track.id);
        this.setState({playlistTracks: this.state.playlistTracks});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                                  onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
                    </div>
                </div>
            </div>
        );
    }
}

