import webpack from 'webpack';
import path from 'path';
import htmlWebPackPlugin from 'html-webpack-plugin';
import cleanWebPackPlugin from 'clean-webpack-plugin';

const APP_DIR  = path.resolve(__dirname, 'src', 'index.js');
const BUILD_DIR = path.join(__dirname, 'dist', 'client');

export default {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
            APP_DIR
        ],
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
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
    plugins: [
        new htmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new cleanWebPackPlugin(BUILD_DIR),
        new webpack.HotModuleReplacementPlugin()
    ]
}

