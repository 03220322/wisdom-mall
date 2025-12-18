const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: './', // 原来是'/'
  transpileDependencies: true,
});
