const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    externals: {
        'preact': {
            commonjs: 'preact',
            commonjs2: 'preact',
            amd: 'preact',
            root: 'preact',
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'PreactShareWidget',
            type: 'umd',
            export: 'default',
        },
        globalObject: 'this',
    },
}); 