const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
          "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
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
    })
  ],

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".scss"]
  }
};
