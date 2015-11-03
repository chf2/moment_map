var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/moment_map_app.jsx",
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'] 
  }
};