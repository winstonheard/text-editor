const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),

      // new HtmlWebpackPlugin({
      //   template: './src/install.html',
      //   filename: 'install.html',
      //   chunks: ['install'],
      // }),

      new WebpackPwaManifest({
        name: 'My PWA',
        short_name: 'My PWA',
        description: 'My Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#4db6ac',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
            ios: true,
          },
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons', 'android'),
            android: true,
          },
        ],
        start_url: '/',
        display: 'standalone',
        crossorigin: 'use-credentials',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
        exclude: [/\.map$/, /manifest\.json$/],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
