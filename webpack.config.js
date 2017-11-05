const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')
const ENTRY = path.resolve(SRC, 'index.jsx')
const WPP = path.resolve(SRC, 'webpack-public-path.js')

module.exports = env => ({
  entry:
    env === 'dev'
      ? [WPP, 'react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', ENTRY]
      : ENTRY,
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      Object.assign(
        { test: /\.css$/ },
        env === 'dev'
          ? { loaders: ['style-loader', 'css-loader'] }
          : {
            use: ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
              loaders: ['css-loader']
            })
          }
      ),
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ].concat(env === 'dev'
    ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
    : [
      // new BundleAnalyzerPlugin(),
      new ExtractTextWebpackPlugin('styles.css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new UglifyJsWebpackPlugin({
        sourceMap: true
      }),
      new webpack.NoErrorsPlugin(),
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html|css)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]),
  devtool: env === 'dev' ? 'source-map' : 'eval-source-map',
  context: SRC,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  }
})
