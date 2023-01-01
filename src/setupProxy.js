const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-125-66-192.ap-northeast-2.compute.amazonaws.com:8000',
      changeOrigin: true,
    }),
  )
}
