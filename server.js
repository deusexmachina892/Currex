"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var app = express();
if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var config = require('./webpack.config.js');
    var compiler = webpack(config);
    /**
     * Use webpack-dev-middleware, which facilitates creating a bundle.js in memory and updating it automatically
     * based on changed files
     */
    app.use(require('webpack-dev-middleware')(compiler, {
        /**
         * @noInfo Only display warnings and errors to the concsole
         */
        noInfo: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }));
    /**
     * Hot middleware allows the page to reload automatically while we are working on it.
     * Can be used instead of react-hot-middleware if Redux is being used to manage app state
     */
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(process.cwd(), 'public', 'index.html'));
    });
}
else {
    app.use(express.static(path.join(process.cwd(), 'dist', 'client')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(process.cwd(), 'dist', 'client', 'index.html'));
    });
}
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server bound to port: " + PORT);
});
