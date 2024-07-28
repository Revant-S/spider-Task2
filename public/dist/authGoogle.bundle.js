/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/googleOAuth.js":
/*!**********************************!*\
  !*** ./public/js/googleOAuth.js ***!
  \**********************************/
/***/ (() => {

eval("var authGoogle = document.getElementById(\"authGoogle\");\nauthGoogle.addEventListener(\"click\", function () {\n  signInWithGoogle();\n});\nfunction signInWithGoogle() {\n  var clientId = \"293848068034-20qct0cu78jo8aktnsvi7skq9l5gd521.apps.googleusercontent.com\";\n  var redirectUri = \"http://localhost:8080/auth/signin\";\n  var scopes = [\"openid\", \"email\", \"profile\"];\n  var encodedScopes = scopes.map(function (scope) {\n    return encodeURIComponent(scope);\n  });\n  var scopeParameter = encodedScopes.join(\" \");\n  var url = new URL(\"https://accounts.google.com/o/oauth2/v2/auth\");\n  url.searchParams.append(\"client_id\", clientId);\n  url.searchParams.append(\"redirect_uri\", redirectUri);\n  url.searchParams.append(\"response_type\", \"token\");\n  url.searchParams.append(\"scope\", scopeParameter);\n  window.location.href = url.toString();\n}\nfunction getAccessTokenFromUrl() {\n  var hash = window.location.hash.substring(1);\n  var params = new URLSearchParams(hash);\n  return params.get(\"access_token\");\n}\nwindow.onload = function () {\n  var accessToken = getAccessTokenFromUrl();\n  if (accessToken) {\n    console.log(accessToken);\n  } else {\n    console.log(\"No access token found\");\n  }\n};\n\n//# sourceURL=webpack://delta_task_3/./public/js/googleOAuth.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/googleOAuth.js"]();
/******/ 	
/******/ })()
;