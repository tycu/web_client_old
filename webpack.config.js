/*eslint-disable */
global.Promise = require('bluebird'); // for node 0.10
const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin      = require('assets-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');
const port = (process.env.PROCESS_PORT === '8080');
// const gitRevision = require('child_process').execSync('git rev-parse HEAD').toString().trim().slice(0, 7);
console.log('isProd', isProd);
// console.log('gitRevision', gitRevision);


const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const isDebug   = isProd;
// const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
// const isVerbose = true;
var buildHash = process.env.NODE_ENV === "production" ? "[hash]" : "dev";
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


// Conditionally return a list of plugins to use based on the current environment. Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically drop any unreachable code.
  plugins.push(
    // new webpack.EnvironmentPlugin([
    //   "NODE_ENV"
    // ]),

    new StatsWriterPlugin() // NOTE Causes the asset's `size` method to be called
    // new ExtractTextPlugin('yourStyle.css')
  )

  // Conditionally add plugins for Production builds.
  if (isProd) {
    // plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(
      new webpack.optimize.DedupePlugin({preferEntry: true}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: { warnings: true },
        beautify: false,
        dead_code: true
      }),
      // new CompressionPlugin({ // https://github.com/webpack/compression-webpack-plugin
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),
      // new HtmlWebpackPlugin({
      //   template: './public/index.template.html',
      //   inject: true
      // }),
      // new LodashModuleReplacementPlugin({'collections': true}),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    )
  }

  // Conditionally add plugins for Development
  else {
    new webpack.HotModuleReplacementPlugin()
  }
  return plugins;
}



// NOTE loaders work at individual file level
// NOTE plugins work at bundle or chunk level at end of bundle gen process
// NOTE entry Can be string, object or array (each has different meaning)

module.exports = {
  entry: "./client/app.js",
  devtool: 'source-map',
  plugins: getPlugins(),



  plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' ),
          PRODUCTION: JSON.stringify(JSON.parse(isProd)),
          // VERSION: JSON.stringify(gitRevision || 'NA'),
          PROCESS_PORT: JSON.stringify(port || '8080')
        }
      }),
      new ExtractTextPlugin("[name].css"),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en|uk|tr/),
      new AssetsPlugin({path: path.join(__dirname, 'etc')})
  ],




  output: {
    path: path.join(__dirname, "/public/static/build/", buildHash),
    filename: "main.js",
    publicPath: "static/build/" + buildHash + "/"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },

      { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
      { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
      { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
      { test: /\.(woff|woff2|ttf|eot)/, loader: "url-loader?limit=1" },

      { test: /\.jsx$/, loader: "react-hot!babel", exclude: [/node_modules/, /public/] }, //!eslint-loader
      { test: /\.js$/, loader: "react-hot!babel", exclude: [/node_modules/, /public/] }, // !eslint-loader

      { test: /\.json$/, loader: "json-loader" },

      { test: /\.txt$/, loader: "raw-loader" }
    ]
  },
  eslint: {
    configFile: '.eslintrc.js'
  },

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
  devServer: {
    // port: 8080,
    // proxy: { // https://github.com/chimurai/http-proxy-middleware#options
    //   '/api/v1/**': {
    //     default: false,
    //     target: 'http://localhost:5000/',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }

};
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
