# BuzzCut AI – MVP 产品需求文档


## 1. 项目概述
BuzzCut AI 是一款基于浏览器的发型模拟网站，核心功能是在数秒内为用户生成高保真、可调节头发颜色的 “buzz‑cut（寸头）” 试发效果，并提供一键分享、下载与决策辅助。MVP 阶段聚焦 **免费免注册体验 + 高清单张下载** 的闭环。

## 2. 目标与衡量指标

| 目标      | 指标 (MVP 结束时)                                        |
| ------- | --------------------------------------------------- |
| 提供零门槛试发 | 首次加载 ≤ 3 s(LCP)；交互延迟 ≤ 100 ms(FID)                  |
| 吸引有机流量  | 站点核心词 “buzz cut filter” Google 前 30；自然流量 ≥ 1 k UV/月 |
| 形成正向口碑  | NPS ≥ 40；工具使用次数 / UV ≥ 25 %  

## 3. 用户画像

1. **短视频创作者 (Z 时代)** — TikTok / Snapchat 活跃，需求：有趣、可分享。
2. **理发决策者** — 计划剃寸头，关注真实度、可调颜色。
3. **发际线焦虑者** — 想先试光头/板寸，评估外观。

## 4. MVP 功能范围
### 4.1 必做功能
- **图片上传**：Dropzone 组件（.jpg/.png/.webp，≤5 MB）。
- **头发掩码**：MediaPipe Hair Segmenter WASM 在前端推理。
- **防换脸管控**  
  1. **IP-Adapter FaceID (SDXL)** → lock identity；  
  2. **局部 in-paint** 仅作用于掩码区域。
- **Flux-Kontext-Pro 调用**：REST API（Replicate.com）；prompt 固定且包含“keep same face”。
- **头发颜色调节**：用户可在 UI 中选择基本颜色（黑 / 棕 / 金 / 灰）传至 prompt 生成不同颜色寸头效果。
- **结果展示**：原图／生成图滑块对比，自定义下载按钮。
- **免费 & Pro 权限**：免费每日 3 张 720p 带水印；Pro 无限次 4K 无水印（$4.99/月）。


### 4.2 可选功能（延期）
- 用户历史库、20+ 其他发型过滤器、批量队列。

## 5. 技术栈
| 层次 | 选择 | 备注 |
|------|------|------|
| 前端 | **Next.js App Router + TypeScript + TailwindCSS + shadcn/ui** | Vercel 托管 |
| 掩码 | MediaPipe Image Segmenter (WASM) | 浏览器帧延迟 < 120 ms |
| 人脸锁定 | **IP-Adapter FaceID (SDXL)** | 本地 A10G/GPU 推理，≈1.1 s |
| 生成 | **Flux-Kontext-Pro** (Replicate API) | $0.04/图；输出 1024²–4K，可调颜色 |
| 后端 | FastAPI (Serverless Function) | 统一 `/api/generate` 路由 |
| 存储 | Supabase Storage + R2 CDN | 24h 后自动清理 |
| 支付 | Creem + Stripe & Webhook | 写 `subscriptions` |
| UI | TailwindCSS + shadcn/ui + react-compare-image | 容易实现滑块对比 |

## 6. 系统架构流程
```mermaid
flowchart TD
A[用户上传 Original.jpg] --> B(MediaPipe 掩码生成 Mask.png)
B --> C(IP-Adapter FaceID 锁脸)
C --> D{Flux-Kontext-Pro inpaint(mask) + color}
D --> E[生成寸头 Result.jpg]
E --> F[CDN 缓存]
F --> G[前端展示]
```

## 7. API 契约
```http
POST /api/generate
{
  "image_url": "...",
  "mask_url": "...",
  "color": "black|brown|blonde|gray",
  "tier": "free|pro"
}
→ 202
{ "task_id": "uuid" }

GET /api/generate/{task_id}
→ 200 OK
{
  "status": "success",
  "result_url": "https://cdn.../buzzcut.png",
  "facesim": 0.22
}
```

## 8. 防换脸技术细节
主要通过掩码 + IP-Adapter FaceID 保证脸部一致。
1）掩码边界：OpenCV dilate(3px) + feather(5px)，确保剪影干净。

2）IP‑Adapter FaceID：上传原图 128×128 特征向量，控制权重 0.8 – 1.0。

3）Prompt 策略：

  主 prompt："Give the person a clean buzz cut. Keep SAME face."

  负面 prompt："different face, new identity, distortion"。

4) 回退逻辑：若连续 2 次人脸相似度 >0.3 仍失败 → 返回“生成失败，建议上传更清晰正面照”。

## 9. 站点信息架构 (树状)

```
/
├─ buzz-cut-simulator/
│   ├─ live-camera/
│   ├─ upload-photo/
│   └─ results/
├─ buzz-cut-guides/
│   ├─ how-to-use-buzz-cut-filter/
│   ├─ guard-lengths/
│   │   ├─ guard-1-3-ultra-short/
│   │   ├─ guard-4-6-classic/
│   │   └─ guard-7-8-long-buzz/
│   ├─ styles/
│   │   ├─ buzz-cut-fade/
│   │   ├─ blonde-buzz-cut/
│   │   ├─ bleach-buzz-cut/
│   │   └─ colored-buzz-cut/
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

## 10. 付费订阅设计 – BuzzCut Pro
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


## 11. 非功能要求
- 性能：5 s p95、首页 LCP ≤ 2.5 s。
- 安全：HTTPS、CSP、24h 自动清除图像、GDPR 符合。
- 可靠性：调用失败率 < 3 %，重试机制开启。

## 12. 里程碑（4 周压缩版）
详见上轮 v0.3 内容，新增颜色控制 UI 开发。

## ✅ 验收标准
- 人脸稳定性：连续 20 张生成图 facesim < 0.3。
- 颜色功能：至少两种颜色调用成功。
- 性能：生成延迟 < 5 s，CWV 三项全绿。
- 权限与订阅逻辑正常。


