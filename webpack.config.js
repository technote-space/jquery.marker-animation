const webpack = require('webpack');
const p = require('./package');

const banner = `${p.name} ${p.version} - ${p.description}\nCopyright (c) ${ new Date().getFullYear() } ${p.author} - ${p.homepage}\nLicense: ${p.license}`;

const webpackConfig = {
    'context': __dirname + '/src',
    'entry': './index.js',
    'output': {
        'path': __dirname,
        'filename': `${p.name}.min.js`,
        'library': `markerAnimation`,
        'libraryTarget': 'umd'
    },
    'module': {
        'rules': [{
            'test': /\.js$/,
            'exclude': /node_modules/,
            'loader': 'babel-loader'
        }]
    },
    externals: {
        jquery: {
            root: 'jQuery',
            commonjs2: 'jquery',
            commonjs: 'jquery',
            amd: 'jquery'
        }
    },
    'plugins': [
        new webpack.BannerPlugin(banner)
    ]
};

module.exports = webpackConfig;