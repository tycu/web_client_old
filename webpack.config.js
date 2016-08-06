var isProd = (process.env.NODE_ENV === 'production');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
console.log('isProd', isProd);

var path = require('path');
var staticContent = require('./src/static_site/static.js');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

// Conditionally return a list of plugins to use based on the current environment. Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically drop any unreachable code.
  // plugins.push(
  //   new webpack.DefinePlugin({
  //   "process.env": {
  //     NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  //   }
  // }));

  // Conditionally add plugins for Production builds.
  if (isProd) {
    // plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      new StaticSiteGeneratorPlugin('routes.min.js', staticContent.routes, staticContent),
      new LodashModuleReplacementPlugin({'collections': true}),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    )
  }

  // Conditionally add plugins for Development
  else {
  }
  return plugins;
}


module.exports = {
  context: path.join(__dirname, "src"),
  devtool: isProd ? null : "inline-sourcemap",
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
  plugins: getPlugins(),
  devServer: {
    historyApiFallback: true
  }
};
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
