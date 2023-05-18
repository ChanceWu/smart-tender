/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/inner/': {
      target: 'http://localhost:3000',
      changeOrigin: true, // 允许跨域
      pathRewrite: { '/inner/': '/' },
    },
    '/usercenter/': {
      target: 'http://10.30.5.248:8080',
      changeOrigin: true, // 允许跨域
      pathRewrite: { '/usercenter/': '/' },
    },
    '/tender/': {
      target: 'http://10.10.168.177:8080',
      changeOrigin: true, // 允许跨域
      pathRewrite: { '^/': '/' },
    },
    '/file/': {
      target: 'http://10.10.168.177:8080',
      changeOrigin: true, // 允许跨域
      pathRewrite: { '^/': '/' },
    },
    '/gate/': {
      target: 'http://portal.supcon.com',
      changeOrigin: true, // 允许跨域
      pathRewrite: { '/gate/': '/' },
    },
    '/api/': {
      // 要代理的地址
      target: 'https://preview.pro.ant.design',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
