# wisdom-mall

## Project setup
# wisdom-mall

移动端电商示例项目（基于 Vue 2 + Vant），用于学习与演示前端工程实践。

## 技术栈
- Vue 2
- Vue Router
- Vuex
- Vant (UI)
- axios

## 本地运行
安装依赖：
```bash
npm install
```
开发模式（热重载）：
```bash
npm run serve
```
构建生产包：
```bash
npm run build
```

代码风格检查：
```bash
npm run lint        # 检查
npm run lint:fix    # 自动修复可修复项
```

## 部署（线上 demo）
- GitHub Pages（自动发布构建后 `dist/` 到 `gh-pages` 分支）：

	1. 在本地安装依赖：`npm install --save-dev gh-pages`
	2. 在 `package.json` 中已添加 `deploy` 脚本：
		 ```bash
		 npm run deploy
		 ```
	3. 运行后会把 `dist/` 推送到 `gh-pages` 分支并自动生效。


## 已实现部分
- 页面组件拆分与路由设计（`src/components`、`src/views`）
- 接口封装与状态管理（`src/api`、`src/store`）
- 实现按需路由加载与图片懒加载以优化首屏性能

## 仓库结构（核心文件）
- `src/`：项目源码（组件、页面、路由、状态管理、样式）
- `public/`：静态资源与 index.html
- `package.json`：依赖与脚本（运行、构建、lint、deploy）
- `README.md`：项目说明（当前文件）
- `.gitignore`：忽略项（本仓库已添加，避免提交 node_modules/dist 等）


## 工程与质量（已建议并部分集成）
- 已集成 ESLint/Prettier 配置及 `lint` / `lint:fix` 脚本
- 已配置：配置 GitHub Actions 做 PR 校验与自动部署

---

作者：橙子
