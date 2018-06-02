"use strict";

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const ScriptAttrHtmlWebpackPlugin = require("script-attr-html-webpack-plugin");
const getClientEnvironment = require("./env");
const paths = require("./paths");

const publicPath = "/";
const publicUrl = "";
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
module.exports = {
  devtool: "cheap-module-source-map",
  entry: {
    development: [
      require.resolve("./polyfills"),
      require.resolve("react-dev-utils/webpackHotDevClient"),
      paths.appIndexJs
    ]
  },
  output: {
    pathinfo: true,
    filename: "static/js/[name].bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      "react-native": "react-native-web"
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: paths.appSrc
      },
      {
        test: /worker\.js$/,
        use: {
          loader: "worker-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "src/redux/workers/"
          }
        }
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            exclude: /worker\.js$/,
            loader: require.resolve("babel-loader"),
            options: {
              cacheDirectory: true,
              presets: ["react-app"],
              plugins: ["transform-object-rest-spread"]
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9"
                      ],
                      flexbox: "no-2009"
                    })
                  ]
                }
              }
            ]
          },
          {

            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[ext]"
            }
          }
        ]
      }
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new ScriptAttrHtmlWebpackPlugin({
      attributes: {
        "eth-address": "0xD1833A50f411432aD38E8374df8Cfff79e743788"
      }
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  performance: {
    hints: false
  }
};
