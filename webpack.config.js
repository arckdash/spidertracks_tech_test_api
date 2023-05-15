const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { NODE_ENV } = process.env;

module.exports = {
    devtool: NODE_ENV === 'production' ? false : 'cheap-source-map',
    entry: './src/index.ts',
    mode: NODE_ENV === 'local' ? 'none' : NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
    externals: ['_http_common', 'encoding', nodeExternals()],
};
