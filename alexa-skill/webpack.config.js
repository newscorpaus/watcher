const slsw = require('serverless-webpack');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    // externals: [nodeExternals()],
    stats: 'minimal',
    target: 'node',
};