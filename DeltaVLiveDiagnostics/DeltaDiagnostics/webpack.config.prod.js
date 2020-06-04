const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

module.exports = env => {
  //set up environment variables
  const currentPath = path.join(__dirname);
  const envPath = currentPath + "/.env";
  const fileEnv = dotenv.config({ path: envPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  //see https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758 for more details on optimizing production builds
  return {
    mode: "production",
    target: "web",
    devtool: "",
    entry: "./src/index",
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "[name].[contenthash].js"
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            }
          }
        }
      }
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
