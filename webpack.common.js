const fs = require("fs");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function createHtmlWebpackPluginsForTutorialPages(folderName) {
    const htmlPlugins = [];
    fs.readdirSync(`./pages/${folderName}`).forEach(pageName => {
        const htmlPlugin = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "pages", folderName, pageName, "index.ejs"),
            filename: `${folderName}/${pageName}/index.html`,
            chunks: ["style", "common", "tutorial"],
            inject: true
        });
    
        htmlPlugins.push(htmlPlugin);
    });
    return htmlPlugins;
}

const tutorialPages = createHtmlWebpackPluginsForTutorialPages("tutorial");
const otherTutorialPages = createHtmlWebpackPluginsForTutorialPages("dalsi-tutorialy");

module.exports = {
    entry: {
        style: './less/main.less',
        icons: './icons/main.js',
        common: './ts/common/main.ts',
        tutorial: './ts/tutorial-page/main.ts'
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
                test: /(\.ts|\.d.ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                exclude: /css-images/,
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
            chunks: ["style", "common"],
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "pages", "popis-zdrojoveho-kodu-projektu", "index.ejs"),
            filename: "popis-zdrojoveho-kodu-projektu/index.html",
            chunks: ["style", "common", "tutorial"],
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "pages", "obsah", "index.ejs"),
            filename: "obsah/index.html",
            chunks: ["style", "common"],
            inject: true
        }),
        ...tutorialPages,
        ...otherTutorialPages,
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