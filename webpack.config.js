const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 8080
  }
}
