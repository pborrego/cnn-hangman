var config = require('webpack-es6-config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = config({
    filename: 'hangman.js',
    libraryName: 'Hangman',
    entry: ['./client/js/index.js'],
    loaders: [{
        test: /\.scss|\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')},
    {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
    }],
    plugins: [
        new ExtractTextPlugin('hangman.css')
    ]
});
