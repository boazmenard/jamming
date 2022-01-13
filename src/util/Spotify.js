let userAccessToken;
const clientID = 'eb386b14d4ce42e191c16b85f6809080';
const redirectURI = 'http://localhost:3000/';

export const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        // find the access token
        let accessTokenFound = window.location.href.match(/access_token=([^&]*)/);
        let expirationFound = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenFound && expirationFound) {
            userAccessToken = accessTokenFound[1];
            let expirationTime = Number(expirationFound[1]);
            // clears parameters, allows for grabbing a new access token when it expires
            window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(term) {
        const getSearchArray = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.getAccessToken()}`
                    }
                })

                if (response.ok) {
                    let jsonResponse = await response.json();
                    if (!jsonResponse.tracks) {
                        return []
                    }
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }))
                }
            } catch(error) {
                console.log(error);
            }
        }
        return getSearchArray();
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        }
        let userID;
        let playlistID;

        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
            .then(json => {
                userID = json.id
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: playlistName
                    })
                }).then(response => response.json())
                    .then(json => {
                        playlistID = json.id
                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackURIs
                            })
                        })
                    })
            })
    }
}