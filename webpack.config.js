const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const mode = ( process.env.NODE_ENV === 'production' ) ? 'production' : 'development'
const PROXY = 'http://theinfiniteagency.test/'

const config = {
    entry: {
        app: path.join(__dirname, './assets/js/app.js')
    },
    devServer: {
        open: true,
        index: '',
        hot: true,
        inline: true,
        port: 8080,
        disableHostCheck: true,
        proxy: {
            '/' : {
                context: () => true,
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    mode: mode,
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, './assets/dist'),
        publicPath: '/wp-content/themes/webpack-wordpress/assets/dist/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    useRelativePath: false,
                    emitFile: false //Prevents files from moving since they're correctly referenced
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new WebpackBuildNotifierPlugin({
            sound: 'Funk',
            successSound: 'Morse'
        }),
        new WriteFilePlugin({
            test: /^(?!.*(hot)).*/,
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            open: false,
            proxy: PROXY,
            files: [
                '**/*.twig',
                '**/*.php'
            ]
        }, {
            reload: false
        })
    ],
}

if ( process.env.NODE_ENV === 'production' ) {
    config.plugins.push(
        new CleanWebpackPlugin([
            'assets/dist',
            './style.css'
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MinifyPlugin(),
        new OptimizeCssAssetsPlugin(),
        new ProgressBarPlugin()
    )
}


module.exports = config