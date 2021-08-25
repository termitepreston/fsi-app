import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTSCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// fix for devServer field not found error.
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      favicon: "src/favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin({ percentBy: "dependencies" }),
    new ESLintPlugin({
      extensions: ["js", "ts", "jsx", "tsx"],
    }),
    new ForkTSCheckerWebpackPlugin({
      async: false,
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        ws: true,
      },
    },
  },
};

export default config;
