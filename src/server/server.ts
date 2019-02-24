import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';
import * as compression from "compression";
import * as expressValidator from "express-validator";
import * as session from 'express-session';
import mongo from "connect-mongo";
import flash from "express-flash";
import { DB, SESSION_SECRET } from './config/keys';

// register User Schema
require('./models/User');

//register passport conf
require('./services/passport');
const app: express.Application = express();
const MongoStore = mongo(session);
mongoose.connect(DB, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to DB');
    });

app.use(compression());
app.use(expressValidator());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: DB,
      autoReconnect: true
    })
}));
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
      req.path !== "/login" &&
      req.path !== "/signup" &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
      req.session.returnTo = req.path;
    } else if (req.user &&
      req.path == "/account") {
      req.session.returnTo = req.path;
    }
    next();
});
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
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'dist', 'client', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server bound to port: ${PORT}`);
})