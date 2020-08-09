// production config
const merge = require("webpack-merge")
const { resolve } = require("path")
const webpack = require("webpack")

const commonConfig = require("./common")

module.exports = function (apiHost) {
    return merge(commonConfig, {
        mode: "production",
        entry: "./index.tsx",
        output: {
            filename: "js/bundle.[hash].min.js",
            path: resolve(__dirname, "../../dist"),
            publicPath: "/"
        },
        devtool: "source-map",
        plugins: [new webpack.DefinePlugin({ "process.env": JSON.stringify(apiHost) })]
    })
}
