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
推荐两种简单方式：

- GitHub Pages（自动发布构建后 `dist/` 到 `gh-pages` 分支）：

	1. 在本地安装依赖：`npm install --save-dev gh-pages`
	2. 在 `package.json` 中已添加 `deploy` 脚本：
		 ```bash
		 npm run deploy
		 ```
	3. 运行后会把 `dist/` 推送到 `gh-pages` 分支并自动生效（需要启用 GitHub Pages）。

  或者：仓库已添加 GitHub Actions 工作流，
  将代码推送到 `main` 分支会自动构建并把 `dist/` 发布到 `gh-pages`（无需本地运行 `deploy`）。

- Netlify：将仓库连接到 Netlify，构建命令 `npm run build`，发布目录 `dist/`。

> 如果需要，我可以帮你创建 GitHub Actions 自动构建并部署到 GH Pages 或 Netlify。

## Demo 截图 / 演示
- 模拟移动端后截取关键页面截图并放入 `README`（或放到 `docs/`），可以用浏览器 devtools 的设备模式截图。
- 建议录制 30s 演示视频/GIF 展示购物流程。

## 我负责的部分（可用于简历）
- 页面组件拆分与路由设计（`src/components`、`src/views`）
- 接口封装与状态管理（`src/api`、`src/store`）
- 实现按需路由加载与图片懒加载以优化首屏性能

## 工程与质量（已建议并部分集成）
- 已集成 ESLint/Prettier 配置及 `lint` / `lint:fix` 脚本
- 可选：配置 GitHub Actions 做 PR 校验与自动部署

## 其它
- 若要添加 PWA、单元测试或 Storybook，我可以逐步协助实现并写出简历中可量化的改进点。

---

作者：项目仓库
