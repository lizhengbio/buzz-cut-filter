# Face‑Lock 防换脸平头滤镜技术实现文档  
> 版本 v1.0  | 最后更新 2025‑07‑23  

---

## 1 · 项目背景  
在「BuzzCut Filter」场景中，用户希望仅替换发型，保持脸部、身体和背景像素级一致。传统整图生成易造成五官漂移或色差。本方案用 **IP‑Adapter FaceID + 精准发区掩码 In‑Paint + Alpha 合成**，实现前后对比图完美重叠。

## 2 · 目标与指标  

| 维度 | 目标值 |
| --- | --- |
| 掩码外 SSIM | ≥ 0.99 |
| 人脸特征余弦距离 | ≤ 0.30 |
| 1080p 推理延时 | ≤ 5 s (GPU A10) |
| 失败重试率 | < 3 % |

## 3 · 流程概览  
```mermaid
graph LR
U[用户上传原图] --> S1(头发掩码生成)
S1 --> S2(IP‑Adapter FaceID 解析)
S2 --> S3(Stable Diffusion In‑Paint<br>Pixel Perfect)
S3 --> S4(Alpha 合成)
S4 --> V[前后对比 Viewer]
```

## 4 · 系统架构  

### 4.1 前端  
- **HairSeg WASM** (≈100 ms)   
- 对比组件：可拖动滑块/按键快速切换  

### 4.2 后端微服务  
| 模块 | 关键依赖 | 描述 |
| --- | --- | --- |
| MaskService | **SAM, Mediapipe** | 生成/膨胀/羽化掩码 |
| FaceLockService | **InsightFace, IP‑Adapter** | 提取 FaceID Embedding，供 ControlNet |
| InpaintService | **SDXL Inpaint, LCM** | 按掩码重绘头发 |
| ComposeService | **OpenCV / PIL** | `final = mask*inpaint + (1‑mask)*original` |
| MetricService | **SSIM, Cosine** | 质检与重试 |

## 5 · 关键算法实现  

### 5.1 发区掩码生成  
```python
# 伪代码
mask = hair_segmentor(image)
mask = cv2.dilate(mask, k=3)
mask = cv2.GaussianBlur(mask, (5,5), 0)
```
> *膨胀 2‑4 px、羽化 1‑2 px* 可避免硬边与额头缺口。

### 5.2 Face‑Lock 对齐  
- **IP‑Adapter FaceID Plus V2**  
- ControlNet Weight 0.85，Start 0.0，End 0.8  
- 参考脸图：**同一张原图**  
- 可叠加 **ReActor** 二次精修细节  

### 5.3 平头发型 In‑Paint  
| 参数 | 建议值 |
| --- | --- |
| Sampler | DPM++ 2M Karras |
| CFG | 5‑7 |
| Steps | 20‑30 |
| Denoising | 0.15‑0.30 |
| Inpaint Area | only masked |
| Pixel Perfect | ✔ |


### 5.4 Alpha 合成与锁像素  
```python
final = mask * inpaint + (1 - mask) * original
```
- 避免直接输出整图，彻底消除非掩码随机噪声。  
- 返回 **无损 PNG**，由前端统一缩放。

## 6 · 性能与部署  

| 部署 | GPU | 1080p 单张耗时 |
| --- | --- | --- |
| 云端标准 | A10 (24 GB) | 3‑4 s |
| 云端加速 | A10 + **LCM** | 1‑2 s |
| 移动端轻量 | SD 1.5 + LoRA | 8‑10 s (Apple M2) |

> *建议在产品设置 “快速(720p)” 与 “高清(原图)” 两档，提升 UX*。

## 7 · 质量评估与自动重试  
```python
if ssim(out, original, mask_outside) < 0.99 or face_distance > 0.30:
    retry(seed+1)
```
- 允许最多 2 次重试后返回最佳结果。

## 8 · 常见问题  

| 问题 | 解决方案 |
| --- | --- |
| 发际线毛刺 | 掩码羽化+手工修订 |
| 背景轻微色差 | 合成替换 | 
| 五官偏移 | 提高 IP‑Adapter 权重或固定 seed |
| 手机低显存闪退 | 720p + LoRA 蒸馏权重 |

## 9 · 版本迭代规划  
1. **v1.0**：SDXL Inpaint + Face‑Lock (当前)  
2. **v1.1**：LoRA 发型库，支持渐变色  
3. **v2.0**：实时视频平头滤镜，帧间光流保持  

## 10 · 依赖与许可  
- Stable Diffusion XL 1.0 (遵循 CreativeML OpenRAIL‑M)  
- IP‑Adapter FaceID Plus (商用授权)  
- Segment‑Anything (Apache‑2.0)  
- InsightFace (MIT)  

---

© 2025 BuzzCut AI Team  
