const path = require('path');
const env = require('./env.prod');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

module.exports = {
  mode: 'production',
  stats: 'errors-warnings',
  target: ['es5', 'web'],
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: 'scripts/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  jsx: true,
                  dynamicImport: true,
                  syntax: 'ecmascript',
                },
                transform: {
                  react: {
                    useBuiltins: true,
                  },
                },
                minify: {
                  mangle: true,
                  compress: {
                    unused: true,
                  },
                },
              },
              minify: true,
            },
          },
          {
            loader: require.resolve('esbuild-loader'),
            options: {
              loader: 'jsx',
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: {
                  autoprefixer: {},
                },
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass-embedded'),
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      NODE_ENV: env.NODE_ENV,
      API_ENDPOINT: env.API_ENDPOINT,
    }),
    new CleanWebpackPlugin(),
    // Clean License files after build
    // new CleanWebpackPlugin({
    //   protectWebpackAssets: false,
    //   cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeOptionalTags: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
    }),
    new CompressionWebpackPlugin({
      filename: '[path][name].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common',
        },
      },
    },
    minimizer: [
      // Terser with removing License
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
