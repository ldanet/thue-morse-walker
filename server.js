const express = require('express');
const app = express();
const port = (process.env.PORT || 3000)

app.use(express.static(__dirname + '/www'));

if (process.env.NODE_ENV !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true,
        },
        watchOptions: {
            poll: true
        }
    }));
}

const server = app.listen(port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
