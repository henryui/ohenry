/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-commonjs */
require('dotenv').config();

const path = require('path');
const {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const WEBPACK_DEV_SERVER_PORT = 8800;

// check node_env
const isProd =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'sandbox';
const isDev = !isProd;

const plugins = [
  new CopyWebpackPlugin({
    patterns: [{ from: path.resolve(__dirname, 'img/'), to: 'img' }],
  }),
  new MiniCssExtractPlugin({
    filename: !isProd ? '[name].css' : 'output.[contenthash].css',
    chunkFilename: !isProd ? '[name].css' : '[name].[contenthash].css',
  }),
  new AssetsPlugin({
    filename: './api/controllers/_assets.json',
    processOutput: assets => {
      if (!assets.vendor) {
        assets.vendor = {
          js: '/vendor.js',
          css: '/vendor.css',
        };
      }
      return JSON.stringify(assets);
    },
  }),
  isDev && new HotModuleReplacementPlugin(),
  isDev && new ReactRefreshWebpackPlugin(),
  isDev && new NoEmitOnErrorsPlugin(),
  isDev &&
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './src/tsconfig.json',
      },
    }),
  isDev
    ? new Dotenv({ path: path.resolve(__dirname, '../.env') })
    : new EnvironmentPlugin(['FILESTACK_API_KEY']),
].filter(Boolean);

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: ['./src/index.tsx'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: !isProd ? '[name].js' : '[name].[contenthash].bundle.js',
    chunkFilename: !isProd ? '[name].js' : '[name].[contenthash].bundle.js',
    publicPath: !isProd ? `http://localhost:${WEBPACK_DEV_SERVER_PORT}/` : '/',
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: isProd && {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
        modules: {
          test: /\.module\.s?css$/,
          name: 'modules',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff2?)$/,
        use: ['file-loader'],
      },
    ],
  },
  // resolve: {
  //   modules: [
  //     /* assuming that one up is where your node_modules sit,
  //        relative to the currently executing script
  //     */
  //     path.join(__dirname, '../node_modules'),
  //   ],
  // },
  resolve: {
    alias: {
      helpers: path.resolve(__dirname, 'helpers/'),
      '@constants': path.resolve(__dirname, 'constants/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    compress: true,
    static: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    allowedHosts: 'all',
    hot: true,
    liveReload: false,
    port: WEBPACK_DEV_SERVER_PORT,
    devMiddleware: {
      writeToDisk: filePath => /(img)\//.test(filePath),
    },
  },
};
