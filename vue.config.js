const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  // 生产环境用仓库名作为公共路径，开发环境用 /
  publicPath: process.env.NODE_ENV === 'production' ? '/wisdom-mall/' : '/',
  transpileDependencies: true,
});
