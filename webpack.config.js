const webpack = require('webpack');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const cleanWebPackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const APP_DIR  = path.resolve(__dirname, 'src', 'index.tsx');
const BUILD_DIR = path.join(__dirname, 'dist', 'client');

let plugins = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || 'development', // use 'development' unless process.env.NODE_ENV is defined
        DEBUG: 'false'
      }),
    new htmlWebPackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new cleanWebPackPlugin(BUILD_DIR),
   // new webpack.optimize.ModuleConcatenationPlugin(),
];

if(process.env.NODE_ENV === 'production'){
    plugins.push(
        new webpack.HashedModuleIdsPlugin(),
    )
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
    )
}
module.exports =  {
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    entry: [
        //'webpack-hot-middleware/client?reload=true',
            APP_DIR
        ],
    output: {
        path: BUILD_DIR,
        filename: process.env.NODE_ENV === 'production'?'[name].[contenthash].js':'[name].[hash].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    resolve:{
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            },
            {
                test: /(\.jsx?)/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // optimization
    optimization: {
        splitChunks: {
            chunks: 'all',
        cacheGroups: {
            default: false,
            vendors: false,
            // vendor chunk
            vendor: {
            name: 'vendor',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /[\\/]node_modules[\\/]/
            }
          }
        },
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            // new UglifyJsPlugin({
            //   cache: true,
            //   parallel: true,
            //   uglifyOptions: {
            //     compress: false,
            //     ecma: 6,
            //     mangle: true
            //   },
            //   sourceMap: true
            // })
          ]
    },
    plugins: plugins
   
}

