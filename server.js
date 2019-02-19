import express from 'express';
import webpack from 'webpack';
import path from 'path';


const app = express();
if(process.env.NODE_ENV === 'development'){
        /**
     * Get the development configuration from webpack.config.
     */
    const config = require('./webpack.config.dev.js').default;

    /**
     * Create a webpack compiler which will output our bundle.js based on the application's code
     */
    const compiler = webpack(config);

    /**
     * Use webpack-dev-middleware, which facilitates creating a bundle.js in memory and updating it automatically
     * based on changed files
     */
    app.use(require('webpack-dev-middleware')(compiler,{
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

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'html'))
    })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server bound to port: ${PORT}`);
})