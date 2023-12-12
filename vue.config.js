const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const config = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/pawel-game',
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true // less3 inline JavaScript is not enabled
            }
        }
    },
    devServer: {
        before: function (app) {
            if (!process.env.npm_config_proxydev) {
                app.use(require('connect-cgi-mock')({
                    root: resolve(''),
                    route: '/mock'
                }))
            }
        }
    }
}

if (process.env.npm_config_proxydev) {
    if (process.env.NODE_ENV === 'production') {
    } else {
        config.devServer.proxy = {
            '/mock': {
                target: '',
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': '/api'
                },
                headers: {
                }
            }
        }
    }
}

module.exports = config
