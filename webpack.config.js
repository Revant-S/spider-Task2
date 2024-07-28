const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    home: "./public/js/home.js",
    bookDetails : "./public/js/bookDetails.js",
    myProfile : "./public/js/myProfile.js",
    purchaseScript : "./public/js/purchaseScript.js",
    searchUser : "./public/js/searchUser.js",
    likeBtnHandler : "./public/js/utils/folloRequestHandler.js",
    reviewHandler : "./public/js/utils/reviewHandler.js",
    authGoogle : "./public/js/googleOAuth.js",
    myBooks : "./public/js/utils/addNewBook.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
