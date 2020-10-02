const path = require('path')
const pkg = require('./package.json')

const plugins = {
  clean: require('clean-webpack-plugin').CleanWebpackPlugin
}

const libName = (name) => (
  name.replace(/@.*\//, '').split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')
)

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    index: './index.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    library: libName(pkg.name),
    libraryTarget: 'umd',
    libraryExport: 'default',
    // umdNamedDefine: true,
    globalObject: 'this'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.ts'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new plugins.clean()
  ],

  // optimization: {
  //   minimize: false
  // },

  devtool: ''
}
