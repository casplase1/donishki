const path = require('path');

const WEBPACK_DEV_SERVER_PORT = 8080;
const DEV_SERVER_PORT = 3000;

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env", "react"]
          }
        },
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: false,
    port: WEBPACK_DEV_SERVER_PORT,
    proxy: {'*': `http://localhost:${DEV_SERVER_PORT}`}
  }
};