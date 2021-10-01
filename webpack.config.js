const path = require('path')
const pkg = require('./package.json')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const libName = (name) => (
  name.replace(/@.*\//, '').split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')
)

module.exports = (env = {}, argv) => {
  const isProduction = argv.mode === 'production'

  return {
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
      plugins: [new TSConfigPathsPlugin],
    },

    plugins: [
      new CleanWebpackPlugin
    ],

    optimization: {
      minimize: false
    },

    devtool: (() => {
      return isProduction
        ? false
        : 'eval'
    })(),
  }
}
