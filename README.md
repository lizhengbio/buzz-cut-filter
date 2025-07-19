# Buzz Cut AI Filter

> 🔥 **AI驱动的智能发型转换平台** - 使用先进的AI技术和人脸保护机制，安全地将任何发型转换为寸头造型

一个基于Next.js、AI视觉模型和高级人脸保护技术构建的现代化发型转换平台。专为用户提供安全、准确、高质量的寸头预览体验。

## ✨ 核心特性

### 🛡️ **高级人脸保护技术**
- **人脸ID锁定** - 使用人脸嵌入技术确保身份不变
- **精准发型分割** - MediaPipe风格的头发区域检测
- **ControlNet约束** - 限制AI编辑范围，只修改头发
- **防换脸机制** - 多重技术栈防止身份替换

### 🎨 **智能发型转换**
- **Flux Kontext Pro模型** - 业界领先的图像生成模型
- **多种发色选择** - 黑色、棕色、金色、灰色
- **真实感渲染** - 保持原始光影和照片风格
- **高分辨率输出** - 1024x1024高清图像生成

### 🚀 **现代化用户体验**
- **拖拽上传** - 简单直观的图片上传界面
- **实时预览** - 即时查看转换效果
- **响应式设计** - 完美适配各种设备
- **流畅动画** - 精心设计的交互体验

### 🔧 **技术架构**
- **Next.js 14** - App Router + 服务器组件
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 现代化UI设计系统
- **Supabase** - 身份验证和数据存储
- **AI模型集成** - 多个AI服务API整合

## 🏗️ 技术实现

### 人脸保护核心机制

```typescript
// 人脸嵌入提取 (utils/face-protection.ts:120-144)
const faceEmbedding = await extractFaceEmbedding(imageBase64);

// 发型分割遮罩生成 (utils/face-protection.ts:77-115)  
const hairMask = await generateHairMask(imageBase64);

// ControlNet + IP-Adapter 约束生成 (utils/face-protection.ts:149-194)
const result = await generateWithControlNet(
  originalImage,
  hairMask,
  faceEmbedding,
  color,
  { preserveFace: true, faceIdStrength: 0.8 }
);
```

### AI模型集成

- **Flux Kontext Pro** - 主要的图像生成模型
- **KIE API** - 人脸分析和嵌入提取
- **头发分割服务** - 精准的头发区域检测
- **安全容忍度控制** - 防止不当内容生成

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Supabase 账户
- Replicate API 密钥
- KIE API 密钥

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/buzz-cut-filter.git
   cd buzz-cut-filter
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   cp .env.example .env.local
   ```
   
   配置以下环境变量：
   ```env
   # Supabase配置
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # AI模型API密钥
   REPLICATE_API_TOKEN=your_replicate_token
   KIE_API_KEY=your_kie_api_key
   
   # 应用配置
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **数据库设置**
   - 在Supabase中运行SQL迁移文件
   - 配置身份验证提供商

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
buzz-cut-filter/
├── app/                      # Next.js应用目录
│   ├── api/                 # API路由
│   │   ├── generate/        # 主要生成API
│   │   ├── generate-flux/   # Flux模型API
│   │   └── webhooks/        # Webhook处理
│   ├── dashboard/           # 用户仪表板
│   └── page.tsx            # 首页
├── components/              # React组件
│   ├── product/            # 产品核心组件
│   │   ├── buzz-cut-simulator.tsx
│   │   ├── color-selector.tsx
│   │   ├── image-upload.tsx
│   │   └── result-display.tsx
│   ├── ui/                 # 基础UI组件
│   └── home/               # 首页组件
├── utils/                   # 工具函数
│   ├── face-protection.ts  # 人脸保护核心
│   ├── flux-kontext-api.ts # Flux API集成
│   ├── kie-api.ts          # KIE API集成
│   └── supabase/           # Supabase工具
├── types/                   # TypeScript类型定义
└── public/                  # 静态资源
```

## 🔐 安全特性

### 人脸保护机制

1. **身份锁定**
   - 提取并保存原始人脸的数字化特征
   - 使用人脸嵌入作为身份验证锚点

2. **区域限制**
   - 精准的头发分割遮罩
   - 物理隔离面部和头发编辑区域

3. **模型约束**
   - ControlNet引导生成过程
   - IP-Adapter控制面部特征保持

4. **Prompt工程**
   - 明确指令限制编辑范围
   - 强调保持面部特征不变

### 数据安全

- 图片临时存储，定期清理
- API密钥加密存储
- 用户数据隐私保护
- 安全的文件上传验证

## 🎯 使用指南

### 基本操作

1. **上传照片**
   - 支持 JPG、PNG 格式
   - 建议分辨率 512x512 以上
   - 确保人脸清晰可见

2. **选择发色**
   - 黑色：经典深色寸头
   - 棕色：自然棕色寸头  
   - 金色：时尚金色寸头
   - 灰色：成熟银灰寸头

3. **生成预览**
   - 点击"生成寸头"按钮
   - 等待AI处理（通常1-3分钟）
   - 查看高质量转换结果

### 最佳实践

- 📸 使用光线充足的正面照片
- 👤 确保人脸占照片主要部分
- 🔍 避免模糊或低分辨率图片
- 💡 尝试不同发色找到最佳效果

## 🛠️ 开发指南

### API端点

```typescript
// 主要生成API
POST /api/generate
{
  "image_base64": "data:image/jpeg;base64,/9j/4AAQ...",
  "color": "black",
  "tier": "free"
}

// 状态查询API  
GET /api/generate/[taskId]

// Flux直接API
POST /api/generate-flux
```

### 核心组件

- `BuzzCutSimulator` - 主要交互组件
- `ImageUpload` - 图片上传处理
- `ColorSelector` - 发色选择界面
- `ResultDisplay` - 结果展示组件

### 扩展开发

1. **添加新发色**
   ```typescript
   // components/product/color-selector.tsx
   const COLOR_OPTIONS = [
     // 添加新的颜色配置
   ];
   ```

2. **集成新的AI模型**
   ```typescript
   // utils/new-model-api.ts
   export class NewModelAPI {
     // 实现模型接口
   }
   ```

## 📊 性能优化

- 🚀 **图片压缩** - 自动优化上传图片
- ⚡ **流式处理** - 异步任务处理机制
- 🔄 **智能缓存** - 减少重复API调用
- 📱 **响应式加载** - 适配不同设备性能

## 🚀 部署指南

### Vercel部署（推荐）

1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署完成

### 自定义部署

```bash
npm run build
npm start
```

### 环境变量配置

确保在生产环境中正确配置所有API密钥和服务端点。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持与帮助

- 📧 邮箱：support@example.com
- 💬 微信：your-wechat-id
- 🐛 Bug报告：[GitHub Issues](https://github.com/yourusername/buzz-cut-filter/issues)
- 📚 文档：[完整文档](https://docs.example.com)

## 🎉 致谢

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React应用框架
- [Flux Kontext Pro](https://replicate.com/) - AI图像生成模型
- [Supabase](https://supabase.com/) - 后端即服务
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍UI组件

---

**⭐ 如果这个项目对你有帮助，请给我们一个星标！**