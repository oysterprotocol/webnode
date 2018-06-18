"use strict";

// Plugins
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptAttrHtmlWebpackPlugin = require("script-attr-html-webpack-plugin");

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const paths = require("./paths");
const getClientEnvironment = require("./env");

const APP_VERSION = "0.0.1";
const publicPath = ""; //paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === "./";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.");
}

const cssFilename = `static/css/oyster-webnode-${APP_VERSION}.css`;
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split("/").length).join("../") }
  : {};

module.exports = {
  bail: true,
  devtool: shouldUseSourceMap ? "source-map" : false,
  // In production, we only want to load the polyfills and the app code.
  entry: {
    script: paths.appSrc + "/script.js"
  },
  output: {
    path: paths.appBuild,
    filename: `static/js/oyster-webnode-${APP_VERSION}.min.js`,
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      "react-native": "react-native-web"
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [
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
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[ext]"
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              compact: true,
              presets: ["react-app"],
              plugins: ["transform-object-rest-spread"]
            }
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve("css-loader"),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap
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
                extractTextPluginOptions
              )
            )
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },

          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[ext]"
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true
    }),
    new ScriptAttrHtmlWebpackPlugin({
      attributes: {
        "eth-address": "0xD1833A50f411432aD38E8374df8Cfff79e743788"
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    new MinifyPlugin(
      {
        removeDebugger: true
      },
      {
        sourceMap: null
      }
    ),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + "/index.html",
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]
};
