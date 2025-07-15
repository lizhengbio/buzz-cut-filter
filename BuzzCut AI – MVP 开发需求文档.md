# BuzzCut AI – MVP 阶段产品需求文档

## 1. 项目概述

BuzzCut AI 是一款基于浏览器的发型模拟网站，核心功能是在数秒内为用户生成高保真、可调长度与颜色的 “buzz-cut（寸头）” 试发效果，并提供一键分享、下载与决策辅助。MVP 阶段聚焦 **免费免注册体验 + 高清单张下载** 的闭环。

## 2. 项目目标与衡量指标

| 目标      | 指标 (MVP 结束时)                                        |
| ------- | --------------------------------------------------- |
| 提供零门槛试发 | 首次加载 ≤ 3 s (LCP)；交互延迟 ≤ 100 ms (FID)                |
| 吸引有机流量  | 站点核心词 “buzz cut filter” Google 前 30；自然流量 ≥ 1 k UV/月 |
| 形成正向口碑  | NPS ≥ 40；工具使用次数 / UV ≥ 25 %                         |

## 3. 用户画像

1. **短视频创作者 (Z 时代)** — TikTok / Snapchat 活跃，需求：有趣、可分享。
2. **理发决策者** — 计划剃寸头，关注真实度、可调 guard 长度。
3. **发际线焦虑者** — 想先试光头/板寸，评估外观。

## 4. MVP 范围

### 必做功能

* 实时预览（摄像头）
* 上传照片生成高清图
* 长度 / 颜色滑块控制
* 下载与社交分享
* SEO 结构优化与基本内容搭建

### 可选功能（MVP+）

* TikTok/Snapchat 社交滤镜 + 外链跳转
* 用户作品展示 & 挑战页

## 5. 网站结构信息架构

```
/
├─ buzz-cut-simulator/
│   ├─ live-camera/
│   ├─ upload-photo/
│   └─ results/
├─ buzz-cut-guides/
│   ├─ how-to-use-buzz-cut-filter/
│   ├─ guard-lengths/
│   ├─ styles/
│   ├─ maintenance-tips/
│   └─ buzz-cut-vs-crew-cut/
├─ inspiration/
│   ├─ gallery/
│   └─ buzzcut-challenge/
├─ blog/
│   ├─ trends/
│   ├─ product-reviews/
│   └─ api-updates/
├─ pricing/
├─ api/
├─ faq/
├─ about-us/
└─ contact/
```

## 6. 页面功能模块设计

### 6.1 /buzz-cut-simulator/

* Hero CTA：上传照片 / 打开摄像头
* 控制面板：长度滑块、颜色切换
* 示例展示：前后对比 + Gallery 卡片
* FAQ 区块（结构化 Schema）

### 6.2 /buzz-cut-guides/

* 使用指南 / 样式风格 / 保养建议 / 比较文章
* 所有文章支持互链 + 返回主工具页链接

## 7. 非功能性需求

| 类别   | 要求                                                     |
| ---- | ------------------------------------------------------ |
| 性能   | LCP ≤ 2.5 s、CLS ≤ 0.1、FID ≤ 100 ms                     |
| 可访问性 | Lighthouse A11y ≥ 90                                   |
| SEO  | 使用结构化数据：SoftwareApplication / HowTo / FAQ / Breadcrumb |
| 隐私   | 图片自动清理、不留原始人脸数据；支持用户手动删除请求                             |

## 8. 技术栈

* **前端**：NextJS 14 (App Router)、TypeScript、TailwindCSS、shadcn/ui
* **推理**：MediaPipe 实时 hair mask + Three.js shader；ComfyUI 后端生成
* **后端 API**：FastAPI + AWS Lambda
* **用户系统**：NextAuth + Supabase
* **支付系统**：Creem + Webhook
* **文件存储**：AWS S3 + CloudFront

## 9. 系统架构概览

```
Browser ↔ Next.js ↔ /api/buzzcut ↔ AWS FastAPI ↔ GPU EC2 (ComfyUI) ↔ S3
```

## 10. 后端接口示例

```http
POST /api/buzzcut
{
  "image_url": "https://...",
  "guard": 4,
  "color": "blonde"
}
→ 202 Accepted
{
  "task_id": "abc123"
}

GET /api/buzzcut/{task_id}
→ 200 OK
{
  "status": "success",
  "result_url": "https://s3.../output.jpg"
}
```

## 11. 数据模型（Supabase）

```ts
model User {
  id        String @id @default(uuid())
  email     String @unique
  credits   Int    @default(0)
  createdAt DateTime @default(now())
}

model GenerationTask {
  id        String @id @default(uuid())
  userId    String?
  imageUrl  String
  guard     Int
  color     String
  status    String
  resultUrl String?
  createdAt DateTime @default(now())
}
```

## 12. 安全与合规

* **HTTPS 全站加密**，启用 CSP/XFO/XSS-Protection 安全头；
* **输入验证**，上传图片限制格式与大小（≤5MB）；
* **用户数据**默认保存不超过 24 小时，手动删除即刻清除；
* **图片处理使用 S3 服务端加密 (SSE) + AWS KMS 密钥管理**；
* **合规支持** GDPR/CCPA，提供隐私政策链接与数据请求邮箱。

## 12A. 付费订阅设计 – BuzzCut Pro

> 核心定位：简洁明确的升级方案，为重度用户提供高清图、无水印与增强生成体验。

| 方案         | 价格              | 限制                                    | 订阅权益                                                                                                                                                                          | 适用用户                 |
| ---------- | --------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **免费用户**   | 免费              | 每日最多生成 3 张；720P JPG；带水印               | • 快速体验<br>• 分享友好<br>• 图片 24 小时内自动删除                                                                                                                                           | 尝鲜用户 / 社交用户          |
| **Pro 用户** | \$4.99/月；\$49/年 | 每月最多 60 次生成<br>支持 JPG / PNG / WebP 下载 | • 无水印下载（4K JPG/PNG/WebP）<br>• 自动生成对比动图（1080p GIF）<br>• 自定义 Guard 长度（支持毫米级调节）<br>• 立即“重新生成”一次机会（30 分钟内）<br>• 私密模式：不保存原图<br>• 商业使用权<br>• 无广告体验<br>• 优先处理队列<br>• 20+ 款其他发型滤镜提前体验 | 有决策需求的用户 / 创作者 / 理发师 |

### 升级流程

1. 用户点击 Upgrade 按钮或在生成页被提示；
2. 跳转至 Creem Checkout 页面；
3. 支付成功后 Webhook 更新 Supabase 中订阅状态；
4. 前端通过 `/api/me` 刷新当前登录状态。

### 取消与宽限期

* 用户可在 Creem 订阅管理页取消，系统保留权益至当前周期结束。

### 前端守卫示例

```ts
export const withPro = (Component: React.FC) => (props) => {
  const { user } = useUser();
  if (!user?.isPro) return <UpgradePrompt />;
  return <Component {...props} />;
};
```

### 核心指标监控

* 升级按钮点击率
* 免费转付费转化率
* 付费用户月均生成次数
* 续费率 & 每月 MRR

## 13. SEO 实现清单

* 使用语义化 URL 和结构化 `<h1>` 标签
* 自动生成 `sitemap.xml`、`robots.txt`
* 支持面包屑 Schema 与 JSON-LD 输出
* 图片均配 alt 文本与 Caption
* 博文目录页使用 ISR（60 分钟更新）

## 14. 里程碑（6 周）

| 周     | 交付项                                 |
| ----- | ----------------------------------- |
| 第 1 周 | 完成产品设计稿、基础 NextJS 项目架构与 CI/CD       |
| 第 2 周 | 实时摄像头预览 + UI 组件库集成                  |
| 第 3 周 | 后端推理（ComfyUI + StableHair）部署 + 接口搭建 |
| 第 4 周 | 上传-生成-下载闭环，订阅系统集成                   |
| 第 5 周 | SEO 优化 + 内容页面填充（指南/博客）              |
| 第 6 周 | Beta 上线、A/B 测试、问题修复与验收              |

## 15. 验收标准

* 所有核心流程可用（无 500 错误）
* PageSpeed CWV 三项全绿
* SEO 工具爬取无死链与重大错误
* 内部人工评分图像质量 ≥ 3.5/5
* 支付 / 下载 成功率 ≥ 98%

## 16. 后续迭代方向

* 发布 TikTok / Snap 滤镜，嵌入站外回链
* B2B API 接口开放（计费授权）
* 多语言切换与 hreflang 设置
* 引入更多 Guard 样式与渐层变体
* 增加挑战排行榜与 UGC 投票机制

---

> 文档编写：ChatGPT (OpenAI) – 最后更新 2025-07-15
