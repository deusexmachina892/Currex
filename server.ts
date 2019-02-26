import * as express from 'express';
import * as path from 'path';

const app: express.Application = express();

app.use('/config', express.static(path.join(process.cwd(), 'data', 'config.json')));
app.use('/currencies', express.static(path.join(process.cwd(), 'data', 'currency.json')));

if(process.env.NODE_ENV === 'development'){
    const webpack = require('webpack');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);
    var history = require('connect-history-api-fallback');
    
    app.use('/static', express.static(path.resolve(process.cwd(), 'public')));
    /**
     * Use webpack-dev-middleware, which facilitates creating a bundle.js in memory and updating it automatically
     * based on changed files
     */
    app.use(history());
    app.use(require('webpack-dev-middleware')(compiler,{
        /**
         * @noInfo Only display warnings and errors to the concsole
         */
        noInfo: true,
        publicPath: '/',
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
     * Hot middleware allows the page to reload automatically while we are working on it
     * Can be used instead of react-hot-middleware if Redux is being used to manage app state
     */
    app.use(require('webpack-hot-middleware')(compiler));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'public', 'index.html'))
    })
} else {
    app.use(express.static(path.join(process.cwd(), 'dist', 'client')));

    const expressStaticGzip = require('express-static-gzip');
    app.use('/dist/client', expressStaticGzip('/dist/client', {
        enableBrotli: true,
        orderPreference: ['br', 'gz'],
     }));
    app.get('*', (req, res) => {
        res.setHeader("Cache-Control", "public, max-age=31536000");
        res.sendFile(path.resolve(process.cwd(), 'dist', 'client', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server bound to port: ${PORT}`);
})