const client_id = "036d6e0852654496aed923b3fab23ba3";
const redirect_uri = "http://tmrjamming.surge.sh/";

const state = Math.floor(Math.random() * 0xfffff * 1000000000).toString(16);
// console.log(state);

localStorage.setItem("stateKey", state);
const scope = "playlist-modify-public";

let url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

const Spotify = (function () {
  var userAccessToken = "";
  var expirationTime = "";

  const getAccessToken = function () {
    if (userAccessToken !== "") {
      return userAccessToken;
    }
    if (
      window.location.href.match("access_token=([^&]*)") &&
      window.location.href.match("expires_in=([^&]*)")
    ) {
      userAccessToken = window.location.href.match("access_token=([^&]*)")[1];
      expirationTime = window.location.href.match("expires_in=([^&]*)")[1];

      window.setTimeout(() => (userAccessToken = ""), expirationTime * 1000);
      window.history.replaceState("Access Token", null, "/");

      return userAccessToken;
    } else {
      window.location.replace(url);
    }
  };

  const search = async function (term) {
    if (userAccessToken === "") {
      getAccessToken();
    }

    const searchUrl = "https://api.spotify.com/v1/search?type=track&q=" + term;

    try {
      const response = await fetch(searchUrl, {
        method: "get",
        // mode: "no-cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
      });

      const searchResultsJson = await response.json();

      const searchResults = searchResultsJson.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));

      return searchResults;
    } catch (error) {
      console.log(error);
    }
  };

  const savePlaylist = async function (name, tracks) {
    if (name === undefined || tracks === undefined) {
      return;
    }

    const accessToken = userAccessToken;
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    let userId = await getUserId();

    let endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    console.log(endpoint);
    let playlistId = 0;
    try {
      const response = await fetch(endpoint, {
        method: "post",
        headers: headers,
        body: JSON.stringify({
          name: name,
          description: "Playlist created via Jamming",
          public: true,
        }),
      });

      const playlistJSON = await response.json();

      playlistId = playlistJSON.id;
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    await addTracksToPlaylist(playlistId, tracks);
  };

  const addTracksToPlaylist = async function (playlistId, tracks) {
    const accessToken = userAccessToken;
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    let userId = await getUserId();
    let endpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

    try {
      const response = await fetch(endpoint, {
        method: "post",
        headers: headers,
        body: JSON.stringify({
          uris: tracks,
        }),
      });

      const playlistJSON = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserId = async function () {
    const accessToken = userAccessToken;
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    let userId = "";
    let endpoint = "https://api.spotify.com/v1/me";

    try {
      const response = await fetch(endpoint, {
        method: "get",
        // mode: "no-cors",
        headers: headers,
      });

      const userJson = await response.json();

      userId = userJson.id;
    } catch (error) {
      console.log(error);
    }

    return userId;
  };
  return {
    getAccessToken: getAccessToken,
    search: search,
    savePlaylist: savePlaylist,
    getUserId: getUserId,
  };
})();

export { Spotify };
