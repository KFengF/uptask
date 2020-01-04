const path = require("path");
require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js-front/main.js",
    styles: "./src/css/styles.css",
    normalize: "./src/css/normalize.css"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "./public")
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
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].mini.css"
    }),
    new FixStyleOnlyEntries()
  ]
};
