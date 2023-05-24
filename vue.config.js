/**
 * @description vue.config.js全局配置
 */
const path = require("path");
const {
  /* baseURL,*/
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z,
  buildGzip,
  imageCompression,
} = require("./src/config/index.ts");

const { name, version, author } = require("./package.json");
const dayjs = require("dayjs");
const dateTime = dayjs().format("YYYY-M-D HH:mm:ss");
const Webpack = require("webpack");
const WebpackBar = require("webpackbar");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

// const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-esm-webpack-plugin");


// 编译后浏览器注释显示
const webpackBanner = ` build: ${name} \n 版权所有 @ 2021-2022 上海悦高软件股份有限公司 \n time: `;

process.env.VUE_APP_TITLE = title;
process.env.VUE_APP_AUTHOR = author;
process.env.VUE_APP_UPDATE_TIME = dateTime;
process.env.VUE_APP_VERSION = version;

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // baseURL必须为/xxx，而不是后端服务器，请先了解代理逻辑，再设置前端代理
    // ！！！一定要注意！！！
    // 1.这里配置了跨域及代理只针对开发环境生效
    // 2.不建议你在前端配置跨域，建议你后端配置Allow-Origin,Method,Headers，放行token字段，一步到位
    // 3.后端配置了跨域，就不需要前端再配置，会发生Origin冲突
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + baseURL]: '',
    //     },
    //   },
    // },
    //after: require('./mock'),
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          //"~": resolve("."),
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "#": path.resolve(__dirname, "./"),
        },
      },
      module: {
        rules: [{
          test: /\.js/,
          enforce: 'pre',
          include: /node_modules[\\\/]monaco-editor[\\\/]esm/,
          use: MonacoWebpackPlugin.loader
        }]
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new MonacoWebpackPlugin()
        // new WebpackBar({
        //   name: `悦高软件[${name}]项目`,
        //   //color: "#f40",
        //   profile: true,
        //   reporters: ['profile'],  // 注意这里的配置很关键，不然没信息
        // }),
      ],
      performance: {
        hints: false,
      },
    };
  },
  chainWebpack(config) {
    config.resolve.symlinks(true);
    config
      .plugin("banner")
      .use(Webpack.BannerPlugin, [`${webpackBanner}${dateTime}`]);
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    // config.plugin("monaco-editor").use(
    //   new MonacoWebpackPlugin({
    //     languages: ["javascript", "typescript"],
    //   })
    // );
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/index.less")],
    },
  },
  runtimeCompiler: true,
  productionSourceMap: false,
};

// 记录 编译时间
const fs = require("fs");
const versionJSON = {
  compileTime: new Date().getTime(),
};

fs.writeFile("./version.json", JSON.stringify(versionJSON), (err) => {
  console.log("文件写入成功");
});
