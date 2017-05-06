const express = require('express');
const path = require('path');

const app = express();
const port = (process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/www')));

if (process.env.NODE_ENV !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require, no-extraneous-dependencies
    const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require, no-extraneous-dependencies
    const webpack = require('webpack'); // eslint-disable-line global-require, no-extraneous-dependencies
    const webpackConfig = require('./webpack.config.js'); // eslint-disable-line global-require, no-extraneous-dependencies
    const compiler = webpack(webpackConfig);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true,
        },
        watchOptions: {
            poll: true,
        },
    }));
}

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
