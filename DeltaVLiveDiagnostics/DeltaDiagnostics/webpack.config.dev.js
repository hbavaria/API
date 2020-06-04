const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const dotenv = require("dotenv");

module.exports = env => {
  //set up environment variables

  const currentPath = path.join(__dirname);

  // Create the fallback path to the production .env
  const basePath = currentPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file
  const envPath = basePath + "." + env.ENVIRONMENT;

  // Check if a .env for the environment exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    mode: "development",
    target: "web",
    devtool: "source-map",
    entry: "./src/index",
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devServer: {
      stats: "minimal",
      overlay: true,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      https: false
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: "./src/favicon.ico",
        loading: "src/spinning-circles.svg"
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: "awesome-typescript-loader",
          options: {
            configFileName: "./tsconfig.json",
            transpileOnly: false,
            useBabel: true,
            useCache: true,
            cacheDirectory: "./node_modules/.awcache",
            visualStudioErrorFormat: true,
            forceIsolatedModules: true,
            babelOptions: {
              babelrc: false,
              compact: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: { chrome: 69 },
                    modules: false,
                    loose: false
                  }
                ]
              ]
            },
            babelCore: "@babel/core" // needed for Babel v7
          }
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /(\.css)$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  };
};
