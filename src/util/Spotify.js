const crypto = require("crypto");

let userAccessToken = "";
let expirationTime = "";

const client_id = "036d6e0852654496aed923b3fab23ba3";
const redirect_uri = "http://localhost:3000/";

const state = crypto.randomBytes(16).toString("hex");

localStorage.setItem("stateKey", state);
const scope = "playlist-modify-public";

const url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

const Spotify = {
  getAccessToken: function () {
    if (userAccessToken !== "") {
      return userAccessToken;
    }
    if (
      window.location.href.match("/access_token=([^&]*)/") &&
      window.location.href.match("/expires_in=([^&]*)/")
    ) {
      userAccessToken = window.location.href.match("/access_token=([^&]*)/");
      expirationTime = window.location.href.match("/expires_in=([^&]*)/");

      window.setTimeout(() => (userAccessToken = ""), expirationTime * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location.replace(url);
    }
  },
};

export { Spotify };
