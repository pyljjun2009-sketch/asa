# dsh-vision-free-pack

> **Free Multimodal Vision Plugin Pack for DeepSeek Harness**
>
> Integrates free vision models from ZhiPu GLM, Alibaba Qwen, Tencent Hunyuan, Kimi (Moonshot), and OVHcloud. 4 vision tools, works out of the box.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)
![Platform](https://img.shields.io/badge/platform-DeepSeek%20Harness-4B32C3.svg)
![Vision](https://img.shields.io/badge/vision-Free%20Multimodal-1a73e8.svg)

[中文文档](README.zh.md)

---

## ✨ Features

- **Free Vision Models** — ZhiPu GLM-4.6V-Flash (forever free), Alibaba Qwen, Tencent Hunyuan, Kimi, OVHcloud
- **Smart Fallback** — Auto-switches providers in priority order, tries next on failure
- **Multi-Provider** — 5 vision providers covering domestic and international networks
- **Result Caching** — LRU cache reduces redundant API calls
- **4 Tools** — `vision_describe`, `vision_ocr`, `vision_ask`, `vision_status`
- **Zero Config** — Built-in OVHcloud free endpoint (no key needed), more providers auto-enabled with keys

---

## 🆓 Supported Free Vision Models

| Provider | Model | Free Tier | Direct Access | Key Required |
|----------|-------|-----------|---------------|--------------|
| **ZhiPu GLM** | glm-4.6v-flash | Forever Free | ✅ China | ✅ |
| **Alibaba Qwen** | qwen-vl-plus | 1M tokens/90 days | ✅ China | ✅ |
| **Tencent Hunyuan** | hunyuan-vision-1.5-thinking | 1M tokens | ✅ China | ✅ |
| **Kimi (Moonshot)** | kimi-vl-a3b-thinking | ¥15 credits | ✅ China | ✅ |
| **OVHcloud** | Qwen2.5-VL-72B-Instruct | Free (2 req/min/IP) | ✅ | ❌ No Key |

---

## 📦 Installation

```bash
# Via npm
dsh plugin --profile web add dsh-vision-free-pack

# From GitHub
dsh plugin --profile web add github:AILift-LiuJianjun/dsh-vision-free-pack
```

Restart DSH Web after installation.

---

## 🔑 API Key Configuration

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

| Provider | URL |
|----------|-----|
| ZhiPu GLM | https://open.bigmodel.cn/ |
| Alibaba Qwen | https://bailian.console.aliyun.com/ |
| Tencent Hunyuan | https://console.cloud.tencent.com/hunyuan |
| Kimi | https://platform.moonshot.cn |

> **Tip**: Only one key is needed. ZhiPu GLM (forever free) is recommended. OVHcloud works without any key as fallback.

---

## 🛠️ Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `vision_describe` | Analyze image (describe, OCR, Q&A) | `image_source`, `question?`, `provider?` |
| `vision_ocr` | Extract text from image | `image_source` |
| `vision_ask` | Answer question about image | `image_source`, `question` |
| `vision_status` | Check provider configuration | None |

---

## ⚙️ Configuration

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
- id: vision-free-pack
  config:
    cacheMaxSize: 200
    cacheTtlSeconds: 3600
    zhipuApiKey: ''
    dashscopeApiKey: ''
    hunyuanApiKey: ''
    kimiApiKey: ''
```

---

## 📋 Fallback Strategy

The plugin tries vision providers in this order:

1. **ZhiPu GLM-4.6V-Flash** (forever free)
2. **Alibaba Qwen qwen-vl-plus** (free quota)
3. **Tencent Hunyuan hunyuan-vision** (free quota)
4. **Kimi kimi-vl** (free quota)
5. **OVHcloud Qwen2.5-VL-72B** (no key fallback)

Only providers with configured keys are enabled. OVHcloud is always available as fallback.

---

## 📄 License

[MIT](LICENSE)
