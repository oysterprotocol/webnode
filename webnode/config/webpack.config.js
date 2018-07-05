"use strict";

//Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const paths = require("./paths");
const getClientEnvironment = require("./env");

const APP_VERSION = "0.0.1";
const publicPath = ""; //paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === "./";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const generateStatsFile = process.env.GENERATE_STATS_FILE !== "false";
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

const cssFilename = `static/css/oyster-webnode-${APP_VERSION}.css`;
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split("/").length).join("../") }
  : {};

const common = {
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
              plugins: ["transform-object-rest-spread", "lodash"]
            }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // you can specify a publicPath here
                  // by default it use publicPath in webpackOptions.output
                  publicPath: "../"
                }
              },
              "css-loader"
            ]
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      //       // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new LodashModuleReplacementPlugin()
  ]
};
// end common configuration

if (env.stringified["process.env"].NODE_ENV === '"production"') {
  console.log("xxxxxxxxxxxxxxxxxxx");
  module.exports = merge(common, {
    devServer: {
      port: 3001,
      open: true
    },
    devtool: "cheap-module-source-map",
    entry: paths.appSrc + "/script.js",
    output: {
      path: paths.appBuild,
      filename: `static/js/oyster-webnode-${APP_VERSION}.min.js`,
      chunkFilename: "static/js/[name].chunk.js",
      publicPath: publicPath,
      devtoolModuleFilenameTemplate: info =>
        path
          .relative(paths.appSrc, info.absoluteResourcePath)
          .replace(/\\/g, "/")
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml
      }),
      new InterpolateHtmlPlugin(env.raw)
    ]
  });
}

if (env.stringified["process.env"].NODE_ENV === '"BLAHHHHHH"') {
  module.exports = merge(common, {
    bail: true,
    devtool: shouldUseSourceMap ? "source-map" : false,
    // In production, we only want to load the polyfills and the app code.
    entry: {
      script: paths.appSrc + "/script.js"
    },
    output: {
      path: paths.appBuild,
      filename: `static/js/oyster-webnode-${APP_VERSION}.min.js`,
      chunkFilename: "static/js/[name].chunk.js",
      publicPath: publicPath,
      devtoolModuleFilenameTemplate: info =>
        path
          .relative(paths.appSrc, info.absoluteResourcePath)
          .replace(/\\/g, "/")
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
      alias: {
        react: "preact-compat",
        "react-dom": "preact-compat"
      },
      plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
    },
    plugins: [
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
      })
    ]
  });
}
// end production configuration

if (env.stringified["process.env"].NODE_ENV === '"development"') {
  module.exports = merge(common, {
    devServer: {
      port: 3001,
      open: true
    },
    devtool: "cheap-module-source-map",
    entry: paths.appIndexJs,
    output: {
      filename: "static/js/[name].bundle.[hash:8].js",
      chunkFilename: "static/js/[name].chunk.[chunkhash:8].js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml
      }),
      new InterpolateHtmlPlugin(env.raw)
    ]
  });
}
// end development configuration
