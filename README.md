# dsh-vision-free-pack

> **Free Multimodal Vision Plugin Pack for DeepSeek Harness**
>
> Integrates free vision models from ZhiPu GLM, Alibaba Qwen, Tencent Hunyuan, Kimi (Moonshot), and OVHcloud. 4 vision tools, works out of the box.

<p align="center">
  <a href="https://github.com/pyljjun2009-sketch/asa/stargazers"><img src="https://img.shields.io/github/stars/pyljjun2009-sketch/asa?style=social" alt="Stars"></a>
  <a href="https://github.com/pyljjun2009-sketch/asa/network/members"><img src="https://img.shields.io/github/forks/pyljjun2009-sketch/asa?style=social" alt="Forks"></a>
  <a href="https://github.com/pyljjun2009-sketch/asa/issues"><img src="https://img.shields.io/github/issues/pyljjun2009-sketch/asa" alt="Issues"></a>
  <a href="https://github.com/pyljjun2009-sketch/asa/blob/main/LICENSE"><img src="https://img.shields.io/github/license/pyljjun2009-sketch/asa" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dsh-vision-free-pack"><img src="https://img.shields.io/npm/v/dsh-vision-free-pack?color=red&label=npm" alt="npm"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-green.svg" alt="Node"></a>
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img src="https://img.shields.io/badge/platform-DeepSeek%20Harness-4B32C3.svg" alt="Platform"></a>
</p>

<p align="center">
  <strong>⭐ If this project helps you, please give it a Star!</strong>
</p>

<p align="center">
  <a href="README.zh.md">中文文档</a>
</p>

---

## ✨ Features

- **🆓 Free Vision Models** — ZhiPu GLM-4.6V-Flash (forever free), Alibaba Qwen, Tencent Hunyuan, Kimi, OVHcloud
- **🔄 Smart Fallback** — Auto-switches providers in priority order, tries next on failure
- **🌐 Multi-Provider** — 5 vision providers covering domestic and international networks
- **💾 Result Caching** — LRU cache reduces redundant API calls
- **🛠️ 4 Tools** — `vision_describe`, `vision_ocr`, `vision_ask`, `vision_status`
- **⚡ Zero Config** — Built-in OVHcloud free endpoint (no key needed), more providers auto-enabled with keys
- **🔒 Secure** — API Keys stored only in local credentials file, never in code or logs

---

## 🆓 Supported Free Vision Models

| Provider | Model | Free Tier | Direct Access | Key Required |
|----------|-------|-----------|---------------|--------------|
| **ZhiPu GLM** | glm-4.6v-flash | 🆓 Forever Free | ✅ China | ✅ |
| **Alibaba Qwen** | qwen-vl-plus | 🆓 1M tokens/90 days | ✅ China | ✅ |
| **Tencent Hunyuan** | hunyuan-vision-1.5-thinking | 🆓 1M tokens | ✅ China | ✅ |
| **Kimi (Moonshot)** | kimi-vl-a3b-thinking | 🆓 ¥15 credits | ✅ China | ✅ |
| **OVHcloud** | Qwen2.5-VL-72B-Instruct | 🆓 Free (2 req/min/IP) | ✅ | ❌ No Key |

> **💡 Tip**: Only one key is needed. ZhiPu GLM (forever free) is recommended. OVHcloud works without any key as fallback.

---

## 📦 Installation

### Option 1: From GitHub (Recommended)

```bash
dsh plugin --profile web add github:pyljjun2009-sketch/asa
```

### Option 2: From npm

```bash
dsh plugin --profile web add dsh-vision-free-pack
```

### Option 3: Local Install

```bash
git clone https://github.com/pyljjun2009-sketch/asa.git
cd asa
dsh plugin --profile web add .
```

Restart DSH Web after installation.

---

## 🔑 API Key Configuration

### Quick Setup (Recommended)

Edit `~/.dsh/.credentials.yaml`:

```yaml
# ZhiPu GLM (forever free, recommended)
ZHIPU_API_KEY: your_key_here

# Alibaba Qwen DashScope (1M tokens/90 days)
DASHSCOPE_API_KEY: your_key_here

# Tencent Hunyuan (1M tokens)
HUNYUAN_API_KEY: your_key_here

# Kimi Moonshot (¥15 credits)
KIMI_API_KEY: your_key_here
```

### Key Registration

| Provider | URL | Free Tier |
|----------|-----|-----------|
| ZhiPu GLM | https://open.bigmodel.cn/ | 🆓 Forever Free |
| Alibaba Qwen | https://bailian.console.aliyun.com/ | 🆓 1M tokens/90 days |
| Tencent Hunyuan | https://console.cloud.tencent.com/hunyuan | 🆓 1M tokens |
| Kimi | https://platform.moonshot.cn | 🆓 ¥15 credits |

### Environment Variables

You can also set keys via environment variables:

```bash
# Linux/macOS
export ZHIPU_API_KEY=your_key_here

# Windows PowerShell
$env:ZHIPU_API_KEY = "your_key_here"
```

---

## 🛠️ Tools

### vision_describe

Analyze image content — description, OCR, visual Q&A.

**Parameters:**
- `image_source` (required) — Image source: local path, URL, or base64
- `question` (optional) — Question about the image
- `provider` (optional) — Provider: `auto`, `zhipu`, `dashscope`, `hunyuan`, `kimi`, `ovh`

### vision_ocr

Extract text from image (Chinese & English).

**Parameters:**
- `image_source` (required) — Image source

### vision_ask

Answer a specific question about an image.

**Parameters:**
- `image_source` (required) — Image source
- `question` (required) — Question to ask

### vision_status

Check provider configuration status.

**Parameters:** None

---

## 💡 Usage Examples

### Basic Usage

```
Help me look at this image D:\work\screenshot.png
```

### OCR Text Extraction

```
Extract text from this image: C:\Documents\scan.jpg
```

### Visual Q&A

```
What items are in this order screenshot? How much?
```

### Specify Provider

```
Analyze code/my/logo.png with ZhiPu, describe the colors
Use Qwen to look at this photo D:\photos\cat.jpg
```

---

## ⚙️ Configuration

In `~/.dsh/profiles/web/cordis.patch.yml`:

```yaml
- id: vision-free-pack
  config:
    # Cache settings
    cacheMaxSize: 200           # Max cache entries
    cacheTtlSeconds: 3600       # Cache TTL in seconds
    
    # Optional: Override credentials file keys
    zhipuApiKey: ''
    dashscopeApiKey: ''
    hunyuanApiKey: ''
    kimiApiKey: ''
```

### ⚠️ Important: dsh-vision-router textProvider Format

If you also use the `dsh-vision-router` plugin, you **must use the new object format** for `textProvider`, otherwise DSH will hang on startup:

**❌ Wrong format (causes startup hang):**
```yaml
- id: vision-router
  config:
    textProvider: deepseek-official  # String format is deprecated
```

**✅ Correct format:**
```yaml
- id: vision-router
  config:
    textProvider:
      provider: deepseek-official
      model: deepseek-v4-pro
```

---

## 📋 Fallback Strategy

The plugin tries vision providers in this order:

```
1. ZhiPu GLM-4.6V-Flash (forever free) 🥇
   ↓ failed
2. Alibaba Qwen qwen-vl-plus (free quota) 🥈
   ↓ failed
3. Tencent Hunyuan hunyuan-vision (free quota) 🥉
   ↓ failed
4. Kimi kimi-vl (free quota)
   ↓ failed
5. OVHcloud Qwen2.5-VL-72B (no key fallback) 🛡️
```

Only providers with configured keys are enabled. OVHcloud is always available as fallback.

---

## 🔒 Security

- ✅ API Keys stored only in `~/.dsh/.credentials.yaml` (permission 0600)
- ✅ Never in code, logs, or version control
- ✅ Image data only sent to selected vision provider
- ✅ Cache in memory, not persisted to disk
- ✅ Support changing keys anytime, no restart needed

---

## ❓ FAQ

### Q: Do I need to configure all keys?

A: No. Only one key is needed. ZhiPu GLM (forever free) is recommended. OVHcloud works without any key as fallback.

### Q: What image formats are supported?

A: PNG, JPEG, WebP, GIF, BMP.

### Q: Is there an image size limit?

A: Default max 20MB. Images over 4MB are auto-compressed.

### Q: Can I use it in China without proxy?

A: Yes. ZhiPu, Qwen, Hunyuan, and Kimi all have direct access in China. OVHcloud is also direct.

### Q: How to check which provider is being used?

A: Use the `vision_status` tool, or check the `provider` field in the response.

### Q: DSH hangs on startup?

A: If you also use the `dsh-vision-router` plugin, check the `textProvider` format. The old string format causes startup hang. Use the new object format:

```yaml
# ❌ Wrong format
textProvider: deepseek-official

# ✅ Correct format
textProvider:
  provider: deepseek-official
  model: deepseek-v4-pro
```

---

## 📄 License

[MIT](LICENSE) © 2026 [pyljjun2009-sketch](https://github.com/pyljjun2009-sketch)

---

## 🔗 Related Projects

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — DSH Official
- [dsh-vision-router](https://github.com/ysr666/dsh-vision-router) — Pixel-level Vision Tools
- [dsh-plugin-vision](https://github.com/tdf1995/dsh-plugin-vision) — Lightweight Vision + OCR
- [dsh-plugin-deepeye](https://github.com/deepseek-ai/dsh-plugin-deepeye) — Multi-backend Vision Engine

---

## 🙏 Acknowledgments

Thanks to these free vision model providers:

- [ZhiPu AI](https://open.bigmodel.cn/) — GLM-4.6V-Flash forever free
- [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/) — Qwen VL series
- [Tencent Hunyuan](https://console.cloud.tencent.com/hunyuan) — Hunyuan Vision
- [Moonshot AI](https://platform.moonshot.cn) — Kimi VL series
- [OVHcloud](https://ovh.ai/) — Free vision endpoints

---

<p align="center">
  <strong>⭐ If this project helps you, please give it a Star!</strong>
  <br>
  <a href="https://github.com/pyljjun2009-sketch/asa/stargazers">
    <img src="https://img.shields.io/github/stars/pyljjun2009-sketch/asa?style=social" alt="Stars">
  </a>
</p>
