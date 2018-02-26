const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: './server/bin/www',
    output: {
        filename: 'app.min.js'
    },
    target: "node",
    node: {
        __filename: false,
        __dirname: false
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js','.es6']
    },
    module: {
        loaders: [{
            test: /\.es6?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            query: {
                "presets": ["env"]
            }
        }]
    }

};

