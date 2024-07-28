const authGoogle = document.getElementById("authGoogle");
authGoogle.addEventListener("click", () => {
  signInWithGoogle();
});

function signInWithGoogle() {
  const clientId =
    "293848068034-20qct0cu78jo8aktnsvi7skq9l5gd521.apps.googleusercontent.com";
  const redirectUri = "http://localhost:8080/auth/signin";
  const scopes = ["openid", "email", "profile"];

  const encodedScopes = scopes.map((scope) => encodeURIComponent(scope));
  const scopeParameter = encodedScopes.join(" ");

  let url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("response_type", "token");
  url.searchParams.append("scope", scopeParameter);
  window.location.href = url.toString();
}

function getAccessTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

window.onload = function () {
  const accessToken = getAccessTokenFromUrl();
  if (accessToken) {
    console.log(accessToken);
  } else {
    console.log("No access token found");
  }
};
