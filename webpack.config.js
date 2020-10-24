const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        app: './src/frontend/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        test: /index.pug$/,
                        use: ['pug-loader']
                    },
                    {
                        use: ['pug-plain-loader']
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/frontend/index.pug',
            filename: 'index.html'
        }),
        new Dotenv()
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};