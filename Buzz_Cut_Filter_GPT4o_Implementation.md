# Buzz Cut Filter 技术实现方案（基于 GPT-4o + Inpainting）

## 🧠 总览

该功能模拟 Bylo.ai 的 Buzz Cut Filter 实现逻辑，通过以下流程完成：
1. 用户上传照片；
2. 使用头发分割模型生成 mask 掩码；
3. 使用 OpenAI 的 GPT-4o Image API 中的 `/v1/images/edit` 接口进行 in-painting；
4. 返回生成的寸头图像。

---

## 🔧 技术栈概览

| 模块 | 工具 / 接口 |
|------|-------------|
| 前端上传 + UI 展示 | Next.js / React / TailwindCSS |
| 掩码生成 | MediaPipe Hair Segmenter 或 BiSeNet Face Parsing |
| 图像编辑 | OpenAI GPT-4o Image API（`/v1/images/edit`）|
| 后端 | Node.js Edge Function / Serverless API（如 Vercel）|
| 图像缓存 | Cloudflare R2 / CDN |

---

## 📐 架构流程图

```
用户上传图片
   ↓
生成发丝掩码（MediaPipe / BiSeNet）
   ↓
掩码处理（膨胀、羽化）
   ↓
调用 GPT-4o Image API 进行 inpainting
   ↓
返回寸头图像，供下载 / 对比
```

---

## 🪞 步骤详解

### 步骤 1：上传照片
- 用户通过前端 `<Dropzone>` 上传头像（建议尺寸 1024～1280 px）；
- 前端显示原图预览，并调用后端处理逻辑。

---

### 步骤 2：生成头发掩码

选择方案：

#### ✅ 推荐方案 A：MediaPipe Hair Segmenter
- 优点：轻量，支持 TF.js / WebAssembly，可直接部署到前端或 Cloud Function；
- 输出：二值掩码图（黑：头发，白：其他）。

#### ✅ 方案 B：BiSeNet Face Parsing
- GitHub: https://github.com/zllrunning/face-parsing.PyTorch
- 精度更高，能区分发际线、头皮，但需 GPU 推理；
- 部署为 REST API 后端服务调用。

#### 掩码后处理建议：
- OpenCV 膨胀 + 腐蚀处理，扩大掩码边界避免残留碎发；
- 羽化（feather）边缘，避免 inpaint 接缝明显。

---

### 步骤 3：调用 OpenAI GPT-4o Image API

接口说明：
- `endpoint`: `POST https://api.openai.com/v1/images/edit`
- `model`: `gpt-image-1`
- `image`: 原始照片（JPEG 或 PNG）
- `mask`: 掩码图（白色区域保持，透明区域进行 inpaint）
- `prompt`: 生成寸头风格的指令

#### 示例 Prompt：

```
"Give the person a neat #1 buzz cut. Keep the facial features, ears, lighting, and skin tone unchanged. Photorealistic."
```

#### 推荐参数：

```json
{
  "model": "gpt-image-1",
  "prompt": "Give the person a neat #1 buzz cut...",
  "image": <user_image>,
  "mask": <hair_mask>,
  "size": "1024x1024",
  "n": 1
}
```

> ✅ 可加入 `reference_image` 字段，用于身份一致性增强（脸部不变形）。

---

### 步骤 4：结果回传

- 将返回的图片 base64 或 URL 存储至缓存；
- 回传到前端，支持一键下载或滑块对比原图；
- 建议使用 CDN 缓存以节约 API 成本与提高加载速度。

---

## 📌 常见问题与优化

| 问题 | 原因 | 解决建议 |
|------|------|----------|
| 脸部变形 | prompt 不清晰 / 缺乏 identity 约束 | 添加 reference_image；强调 “keep face unchanged” |
| 头发残留 | 掩码区域不准确 | 膨胀 + 腐蚀处理，扩大掩码区域 |
| 色块不均 | inpaint 边缘突兀 | 掩码羽化处理（feather blur）|

---

## 🧪 开发示例（Node.js）

```js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function buzzCut(imageBuffer, maskBuffer) {
  const response = await openai.images.edit({
    model: "gpt-image-1",
    image: imageBuffer,
    mask: maskBuffer,
    prompt:
      "Give the person a neat #1 buzz cut. Keep the facial features, ears, lighting, and skin tone unchanged. Photorealistic.",
    size: "1024x1024",
    n: 1,
  });
  return response.data[0].url;
}
```

---

## 💰 成本与性能预估

| 项目 | 单次成本 / 时延 |
|------|-----------------|
| GPT-4o 图像生成 | ~$0.04 / 1280x1280 |
| 掩码推理（MediaPipe） | ~100ms / 本地或边缘推理 |
| 总体延迟 | 3–5 秒内完成 |

---

## 🔄 可拓展功能

- 多发型生成（寸头 / 寸头渐变 / 光头）切换不同 prompt；
- 对比滑块 UI（Image Comparison Slider）；
- 多角度重绘：prompt 指定 “side view”, “45° angle”等；
- fallback 模式：当 GPT-4o 接口限流时，自动转为 SD + ControlNet 本地编辑链路。

---

## 📚 参考资源

- [OpenAI Images API 文档](https://platform.openai.com/docs/guides/images)
- [MediaPipe Image Segmenter](https://developers.google.com/mediapipe/solutions/vision/image_segmenter)
- [BiSeNet Face Parsing](https://github.com/zllrunning/face-parsing.PyTorch)
- [OpenAI /v1/images/edit 参数说明](https://platform.openai.com/docs/guides/images/usage)
