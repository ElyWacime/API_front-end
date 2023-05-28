const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://re.jrc.ec.europa.eu',
            changeOrigin: true
        })
    );
};
