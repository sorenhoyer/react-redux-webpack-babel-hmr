const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
//const moduleResolverPlugin = require('babel-plugin-module-resolver');

const dotenv = require('dotenv').config({ path: path.join(__dirname, '.env') });

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, 'public', 'index.html'),
});

const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

  process.env.APP_ROOT_PATH = process.env.NODE_PATH
console.log(process.env.APP_ROOT_PATH)

const src = path.join.bind(path, process.cwd(), "src");
console.log(src('components'))

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src', 'index.js'),
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "packages/app-initializer")
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "entry"
                }
              ],
              '@babel/preset-react',
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              // ["module-resolver", {
              //   "root": ["./src"],
              //   "alias": {
              //     "test": "./test",
              //     "underscore": "lodash"
              //   }
              // }]
              ]
          }
        }],
      }
    ],
    
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'components': src('components'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules', 'packages'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    htmlPlugin,
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify(dotenv.ENV),
    //     'NODE_PATH': JSON.stringify(process.env.NODE_PATH),
    //     'APP_ROOT_PATH': JSON.stringify(process.env.NODE_PATH),
    //   }
    // })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    historyApiFallback: true,
    port: 3000,
  }
};