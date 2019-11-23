const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  entry:
    process.env.NODE_ENV === "development"
      ? ["react-hot-loader/patch", "./src/frontend/index.js"]
      : "./src/frontend/index.js",

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[path]___[hash:base64:5]"
              }
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/frontend/index.html"),
      inject: "body"
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, "/src/frontend/public"),
        to: path.join(__dirname, "/dist")
      }
    ]),
    new ManifestPlugin({
      fileName: "asset-manifest.json" // Not to confuse with manifest.json
    }),
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

        console.log(message);
      },
      minify: true, // minify and uglify the script
      navigateFallback: "/index.html",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ],

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "[name].[hash].js"
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"]
  }
};
