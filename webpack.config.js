const path = require("path");

module.exports = {
  entry: "./public/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./public/dist")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};