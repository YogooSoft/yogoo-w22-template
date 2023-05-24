/**
 * @description 导出通用配置
 */
 module.exports = {
  // 标题，此项修改后需要重启项目！！！ (包括初次加载雪花屏的标题 页面的标题 浏览器的标题)
  loginPageTitle:"悦高 W22 低代码应用开发平台",
  title: "yogoo-w22-template",
  // 应用系统版本号
  appVersion: "1.0.08",
  // 标题分隔符
  titleSeparator: " - ",
  // 标题是否反转
  // 如果为false: "page - title"
  // 如果为ture : "title - page"
  titleReverse: false,
  // 简写
  abbreviation: "yogoo-w22-template",
  // 不可随意修改
  copyright: "版权所有 @ 2021-2022 上海悦高软件股份有限公司",
  // 缓存路由的最大数量
  // keepAliveMaxNum: 20,
  // 路由模式，是否为hash模式
  isHashRouterMode: true,
  // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
  routesWhiteList: ["/login", "/register", "/callback", "/404", "/403"],
  // 加载时显示文字
  loadingText: "正在加载中...",
  // token名称
  tokenName: "token",
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "yogoo-w22-template-token",
  // token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  // token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
  recordRoute: true,
  // 是否开启logo，不显示时设置false，请填写src/icon路径下的图标名称
  // 如需使用内置RemixIcon图标，请自行去logo组件切换注释代码(内置svg雪碧图较大，对性能有一定影响)
  logo: "vuejs-fill",
  // 语言类型zh、en
  i18n: "zh",
  // 消息框消失时间
  messageDuration: 3000,
  // 在哪些环境下显示高亮错误 ['development', 'production']
  errorLog: "development",
  // 是否开启登录拦截
  loginInterception: true,
  // 是否开启登录RSA加密
  loginRSA: false,
  // intelligence(前端导出路由)和all(后端导出路由)两种方式
  authentication: "intelligence",
  // 是否支持游客模式，支持情况下，访问白名单，可查看所有asyncRoutes
  supportVisit: false,
  // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true,
  // vertical column comprehensive common布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  // 需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
};
