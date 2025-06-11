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
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (保持默认)
- **Node.js version**: 18.x 或更高

### 4. 重要配置说明
⚠️ **不要使用 wrangler.toml 文件** - 已删除该文件以避免配置冲突
✅ **使用 Web 界面配置** - 在 Cloudflare Pages 中直接配置构建设置更稳定

### 5. 自定义域名
部署完成后，您可以在 Cloudflare Pages 中设置自定义域名 `webpuzzlegames`

## 项目特性
✅ Next.js 15.3.3 完全兼容
✅ 静态站点生成 (SSG) 优化
✅ 响应式设计
✅ 图片优化
✅ SEO 友好
✅ 所有游戏页面预渲染
✅ 快速加载性能

## 构建验证
项目已通过以下验证:
- ✅ TypeScript 类型检查
- ✅ ESLint 代码质量
- ✅ Next.js 构建成功
- ✅ 所有路由预渲染
- ✅ 图片组件优化
- ✅ Cloudflare Pages 兼容性

## 故障排除

### 如果部署仍然失败：

1. **确保 Framework preset 设置正确**
   - 选择 "Next.js (Static HTML Export)" 而不是 "Next.js"
   - 或者选择 "None" 然后手动配置

2. **手动配置构建设置**
   ```
   Build command: npm run build
   Build output directory: .next
   Node.js version: 18.x
   ```

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