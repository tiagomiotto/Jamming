const client_id = "036d6e0852654496aed923b3fab23ba3";
const redirect_uri = "http://localhost:3000/";

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
      this.getAccessToken();
    }
    console.log(userAccessToken);
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
      console.log(searchResultsJson);

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

  return {
    getAccessToken: getAccessToken,
    search: search,
    givemetoken: function () {
      return userAccessToken;
    },
  };
})();

export { Spotify };
