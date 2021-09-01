const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    filename: "markdown-editor.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: 'live.csdn.net',
    open: true
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(less|css)$/i,
        use: ["style-loader", "css-loader", "less-loader"]
      },

      {
        test: /\.(ttf|woff|png|svg)$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
