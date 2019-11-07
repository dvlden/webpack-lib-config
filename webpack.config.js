const path = require('path')
const pkg = require('./package.json')

const plugins = {
  clean: (() => {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    return CleanWebpackPlugin
  })(),
}

const libName = (name) => (
  name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')
)

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    index: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    library: libName(pkg.name),
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    // globalObject: 'typeof self !== \'undefined\' ? self : this', // temporary, waiting for Webpack fix
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new plugins.clean()
  ],

  devtool: ''
}
