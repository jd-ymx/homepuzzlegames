# Cloudflare Pages 部署指南

## 本地验证
项目现在可以在本地运行。访问: **http://localhost:3001**

## 部署到 Cloudflare Pages

### 1. 推送到 GitHub
```bash
git add .
git commit -m "Ready for Cloudflare Pages deployment"
git push origin main
```

### 2. 连接到 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 "Pages" 部分
3. 点击 "Create a project"
4. 选择 "Connect to Git"
5. 选择您的 GitHub 仓库

### 3. 配置构建设置
在 Cloudflare Pages 构建配置中设置：
- **Framework preset**: Next.js
- **Build command**: `npx @cloudflare/next-on-pages@1`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/` (保持默认)
- **Node.js version**: 18.x 或更高

### 4. 重要配置说明
✅ **使用 Cloudflare Pages 的 Next.js 集成** - 自动处理 Edge Runtime 和优化
✅ **Edge Runtime 配置** - 动态路由已配置为使用 Edge Runtime
⚠️ **不要使用静态导出模式** - 使用完整的 Next.js 功能

### 5. 自定义域名
部署完成后，您可以在 Cloudflare Pages 中设置自定义域名 `webpuzzlegames`

## 项目特性
✅ Next.js 15.3.3 完全兼容
✅ Edge Runtime 优化
✅ 响应式设计
✅ 图片优化
✅ SEO 友好
✅ 动态渲染游戏页面
✅ Cloudflare Edge 性能优化

## 构建验证
项目已通过以下验证:
- ✅ TypeScript 类型检查
- ✅ ESLint 代码质量
- ✅ Next.js 构建成功
- ✅ Edge Runtime 配置正确
- ✅ 静态页面(主页、游戏列表)预渲染
- ✅ 动态页面(游戏详情)Edge Runtime
- ✅ 图片组件优化
- ✅ Cloudflare Pages 兼容性

## 故障排除

### 如果部署仍然失败：

1. **确保构建设置完全正确**
   ```
   Framework preset: Next.js
   Build command: npx @cloudflare/next-on-pages@1
   Build output directory: .vercel/output/static
   Node.js version: 18.x
   ```

2. **验证 Edge Runtime 配置**
   - 动态路由 `/game/[id]` 已配置为使用 Edge Runtime
   - 这是 Cloudflare Pages 部署的必需配置

3. **检查 GitHub 仓库**
   - 确保最新代码已推送
   - 确保 package.json 和 next.config.js 都已提交

4. **环境变量设置**
   在 Cloudflare Pages 设置 → Environment variables 中添加：
   ```
   NODE_VERSION = 18
   ```

5. **如果遇到构建错误**
   - 检查 Node.js 版本是否为 18.x 或更高
   - 清除 Cloudflare Pages 缓存后重新部署 