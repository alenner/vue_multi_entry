/* 页面应用路径访问重定向设置 */ 
export default {
    '/page1': {
      target: 'http://localhost',
      // 解决单页面html文件路径不为'/index.html'时，启用history路由刷新页面404问题
      bypass: (req, res, options) => {
        if (req.headers.accept.indexOf('html') !== -1) {
          return `/pages/page1/index.html`;
        }
      }
    },
    '/page2': {
      target: 'http://localhost',
      // 解决单页面html文件路径不为'/index.html'时，启用history路由刷新页面404问题
      bypass: (req, res, options) => {
        if (req.headers.accept.indexOf('html') !== -1) {
          return `/pages/page2/index.html`;
        }
      }
    }
}