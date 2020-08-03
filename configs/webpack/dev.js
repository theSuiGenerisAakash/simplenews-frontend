// development config
const merge = require("webpack-merge")
const webpack = require("webpack")
const commonConfig = require("./common")

module.exports = function (apiHost) {
    return merge(commonConfig, {
        mode: "development",
        entry: [
            "react-hot-loader/patch", // activate HMR for React
            "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
            "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
            "./index.tsx" // the entry point of our app
        ],
        devServer: {
            hot: true, // enable HMR on the server
            historyApiFallback: true,
            proxy: { "/api/v1.0/**": { target: "http://localhost:4000", secure: false } }
        },
        devtool: "cheap-module-eval-source-map",
        plugins: [
            new webpack.HotModuleReplacementPlugin(), // enable HMR globally
            new webpack.DefinePlugin({ "process.env": JSON.stringify(apiHost) })
        ]
    })
}
