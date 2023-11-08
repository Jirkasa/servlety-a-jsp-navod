const fs = require("fs");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function createHtmlWebpackPluginsForTutorialPages() {
    const htmlPlugins = [];
    fs.readdirSync("./pages/tutorial").forEach(pageName => {
        const htmlPlugin = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "pages", "tutorial", pageName, "index.ejs"),
            filename: `${pageName}/index.html`,
            chunks: ["style", "codeBoxInitializer"],
            inject: true
        });
    
        htmlPlugins.push(htmlPlugin);
    });
    return htmlPlugins;
}

const tutorialPages = createHtmlWebpackPluginsForTutorialPages();

module.exports = {
    entry: {
        style: './less/main.less',
        icons: './icons/main.js',
        codeBoxInitializer: './ts/code-box-initializer/main.ts'
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ejs$/i,
                use: [{
                    loader: 'html-loader',
                    options: {
                        sources: false
                    }
                }, 'template-ejs-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: "static/icon-sprite.svg"
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: ['*:fill:(none|black)', '*:stroke:(none|black)']
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "pages", "index.ejs"),
            chunks: ["style", "codeBoxInitializer"],
            inject: true
        }),
        ...tutorialPages,
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "static").replace(/\\/g, "/"),
                    to: path.resolve(__dirname, "dist", "static"),
                    noErrorOnMissing: true
                }
            ]
        }),
        new RemoveEmptyScriptsPlugin(),
        new SpriteLoaderPlugin()
    ]
}