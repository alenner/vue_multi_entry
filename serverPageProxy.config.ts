/* 本地服务页面应用路径访问重定向设置 */

/**
 * 项目页面应用名称枚举
 * 新增的应用只需在枚举中记录就可以自动完成本地服务页面应用路径访问重定向设置
 * @enum {string}
 */
enum Apps {
  App1 = 'app1',
  app2 = 'app2',
}

// 路径重定向服务代理配置
interface AppsConfig {
  [keys: string]: {
    target: string;
    bypass: () => string;
  }
}
// 将枚举中的值转化成数组
const apps:Array<Apps> = Object.values(Apps)

// 生成配置
const serverProxy = (keys: Array<Apps>):AppsConfig | null => {
  const config:AppsConfig = {}
  keys.forEach(key => {
    Object.assign(config,{
      [`/${key}`]: {
        target: 'http://localhost',
        // 解决单页面html文件路径不为'/index.html'时，启用history路由刷新页面404问题
        bypass: (req, res, options) => {
          if (req.headers.accept.indexOf('html') !== -1) {
            return `/apps/${key}/index.html`;
          }
        }
      }
    })
  })
  
  return config
}

export default serverProxy(apps)