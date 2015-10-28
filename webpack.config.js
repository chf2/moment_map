var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/moment_map_app.js.jsx",
  output: {
    path: "./frontend",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
    ]
  }
};