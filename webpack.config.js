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
    open: true
  },
  resolve: {
    extensions: [".js", ".ts", ".vue", ".json"],
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
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
