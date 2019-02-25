const webpack = require('webpack');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const cleanWebPackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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
   // new BundleAnalyzerPlugin()
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
    entry: process.env.NODE_ENV === 'production'?
        APP_DIR:
        [
        'webpack-hot-middleware/client?reload=true',
            APP_DIR
        ],
    output: {
        path: BUILD_DIR,
        filename: process.env.NODE_ENV === 'production'?'[name].[contenthash].js':'[name].[hash].js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/'
    },
    resolve:{
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.webpack.json"
                }
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(a?png|woff|woff2|gif|eot|ttf|svg|jpe?g)$/,
                loader: 'file-loader',
                query:{
                    outputPath: './img/',
                    name: '[name].[ext]?[hash]'
                }
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
        //     new UglifyJsPlugin({
        //       cache: true,
        //       parallel: true,
        //       uglifyOptions: {
        //         compress: false,
        //         ecma: 6,
        //         mangle: true
        //       },
        //       sourceMap: true
        //     })
        ]
    },
    plugins: plugins
   
}

