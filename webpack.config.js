const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // https://github.com/ampedandwired/html-webpack-plugin
const scope = { window: {} };
const path = require('path');
// var ejs = require('ejs');
// var fs = require('fs');
// var template = ejs.compile(fs.readFileSync(__dirname + '/template.ejs', 'utf-8'))
const staticContent = require('./src/static_site/static.js');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
// const HotModuleReplacementPlugin = require('hot-module-replacement-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const isProd = (process.env.NODE_ENV === 'production');
const gitRevision = require('child_process').execSync('git rev-parse HEAD').toString().trim().slice(0, 7);
console.log('isProd', isProd);
console.log('gitRevision', gitRevision);




const isDebug   = isProd;
// const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
// const isVerbose = true;
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
// const useHMR = !!global.HMR; // Hot Module Replacement (HMR)


// NOTE: https://github.com/webpack/compression-webpack-plugin
// const CompressionPlugin = require('compression-webpack-plugin');



// Conditionally return a list of plugins to use based on the current environment. Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];
  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically drop any unreachable code.
  plugins.push(
    // new webpack.EnvironmentPlugin([
    //   "NODE_ENV"
    // ]),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(JSON.parse(isProd)),
      VERSION: JSON.stringify(gitRevision || 'NA'),
      // BROWSER_SUPPORTS_HTML5: true,
      // "typeof window": JSON.stringify("object")
      // 'process.env': {
      // }
    }),
    new StatsWriterPlugin() // NOTE Causes the asset's `size` method to be called
  )

  // Conditionally add plugins for Production builds.
  if (isProd) {
    // plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(
      new webpack.optimize.DedupePlugin({preferEntry: true}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      new StaticSiteGeneratorPlugin('routes.min.js', staticContent.routes, staticContent, scope),

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
      new LodashModuleReplacementPlugin({'collections': true}),
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
  context: path.join(__dirname, 'src'),
  devtool: isProd ? null : 'inline-sourcemap',
  // entry: [  'webpack-dev-server/client?http://localhost:8080',
  //           'webpack/hot/only-dev-server',
  //           './js/routes.js'
  //        ],
  // entry: './src/js/routes.js',
  entry: {
    app: './js/routes.js'
  },
  module: {
    loaders: [
      { test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      { test: /\.css$/,
        loader: 'style!css'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      { test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      { test: /\.png$/,
        loader: 'url-loader?limit=1024'
      }
    ]
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
  output: { // https://webpack.github.io/docs/configuration.html#output
    // filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
    // chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    path: __dirname + '/src/',
    filename: 'routes.min.js',
    publicPath: (isProd ? '/' : 'http://localhost:8080/'),
    // libraryTarget: 'umd' // https://webpack.github.io/docs/configuration.html#output-librarytarget
  },
  plugins: getPlugins(),
  devServer: {
    proxy: { // https://github.com/chimurai/http-proxy-middleware#options
      '/api/v1/*': 'http://localhost:5000'
    }
  }
};
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
