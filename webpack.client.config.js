
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: ['./client/App', './client/scss/main'],
    output: {
        filename: path.join('public', 'js', 'app.js')
    },
    target: "web",
    resolve: {
        extensions: ['.jsx','.scss','.json','.css','.js']
    },
    module: {

        rules: [

            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({use:['css-loader', 'sass-loader']})
            },
            { // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?importLoaders=1']
                })
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'public/css/[name].bundle.css',
            allChunks: true
        })
    ]
};