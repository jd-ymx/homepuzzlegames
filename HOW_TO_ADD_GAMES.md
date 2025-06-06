# 如何添加新游戏 - 详细指南

这个指南专门为编程新手准备，教你如何轻松地向GameHub添加新游戏。

## 🎯 简单三步添加游戏

### 第一步：找到游戏数据文件

1. 打开项目文件夹
2. 找到 `src/data/games.json` 文件
3. 用任何文本编辑器打开（推荐VS Code、记事本等）

### 第二步：复制游戏模板

在 `games` 数组的最后一个游戏后面，添加一个逗号，然后复制粘贴以下模板：

```json
{
  "id": "your-game-id",
  "title": "游戏名称",
  "description": "游戏的中文描述",
  "descriptionEn": "Game description in English",
  "category": "puzzle",
  "url": "https://game-website.com",
  "thumbnail": "https://game-website.com/favicon.ico",
  "featured": false,
  "tags": ["标签1", "标签2", "标签3"]
}
```

### 第三步：填写游戏信息

替换模板中的信息：

- **id**: 给游戏起一个唯一的英文ID（如：bubble-shooter）
- **title**: 游戏的中文名称
- **description**: 用中文描述这个游戏
- **descriptionEn**: 用英文描述游戏（可选）
- **category**: 选择游戏分类（见下方分类列表）
- **url**: 游戏的网址链接
- **thumbnail**: 游戏图标的网址（通常是网站的favicon）
- **featured**: 是否为精选游戏（true 或 false）
- **tags**: 游戏标签，用数组格式

## 📋 游戏分类列表

目前支持的分类：

- `puzzle` - 益智游戏 🧩
- `action` - 动作游戏 ⚡
- `strategy` - 策略游戏 🎯
- `casual` - 休闲游戏 🎮

## 💡 实际示例

假设我要添加一个新的贪吃蛇游戏：

```json
{
  "id": "snake-classic",
  "title": "经典贪吃蛇",
  "description": "怀旧的贪吃蛇游戏，控制小蛇吃食物长大",
  "descriptionEn": "Classic Snake game, control the snake to eat food and grow",
  "category": "casual",
  "url": "https://playsnake.org/",
  "thumbnail": "https://playsnake.org/favicon.ico",
  "featured": true,
  "tags": ["经典", "怀旧", "简单"]
}
```

## ⚠️ 注意事项

1. **JSON格式要正确**：
   - 每个字段都要用双引号包围
   - 字符串值也要用双引号
   - 最后一个游戏后面不要加逗号
   - 数组用方括号 `[]`，对象用花括号 `{}`

2. **ID要唯一**：
   - 每个游戏的ID都不能重复
   - 建议用英文和连字符，如：`bubble-shooter`

3. **分类要正确**：
   - category字段必须是已存在的分类ID
   - 如果需要新分类，先在categories数组中添加

4. **网址要完整**：
   - URL必须包含 `https://` 或 `http://`
   - 确保链接可以正常访问

## 🔧 如何添加新分类

如果现有分类不够用，可以添加新分类：

在 `categories` 数组中添加：

```json
{
  "id": "sports",
  "name": "体育游戏",
  "nameEn": "Sports Games",
  "icon": "⚽"
}
```

## 🚀 测试你的更改

1. 保存 `games.json` 文件
2. 在终端运行 `npm run dev`
3. 打开浏览器访问 `http://localhost:3000`
4. 检查新游戏是否正确显示

## 🆘 常见错误

### 错误1：页面显示空白
**原因**：JSON格式错误
**解决**：检查是否有多余的逗号、缺少引号等

### 错误2：游戏不显示
**原因**：分类ID不存在
**解决**：确保category字段使用正确的分类ID

### 错误3：图标不显示
**原因**：图标链接无效
**解决**：使用有效的图片链接，或者留空让系统使用默认图标

## 📞 需要帮助？

如果遇到问题：
1. 检查JSON格式是否正确
2. 确认所有必填字段都已填写
3. 验证网址链接是否有效
4. 参考现有游戏的格式

记住：添加游戏就是编辑一个JSON文件，非常简单！ 