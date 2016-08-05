var debug = process.env.NODE_ENV !== "production";
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var staticContent = require('./src/static_site/static.js');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/routes.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "routes.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new StaticSiteGeneratorPlugin('routes.min.js', staticContent.routes, staticContent),
    new LodashModuleReplacementPlugin({
      'collections': true,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
  devServer: {
    historyApiFallback: true
  }
};
