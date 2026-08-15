# dsh-vision-free-pack

> **为 DeepSeek Harness 提供免费多模态视觉能力的插件包**
>
> 集成智谱 GLM、阿里千问、腾讯混元、Kimi、OVHcloud 等免费视觉模型，支持 4 个视觉工具，开箱即用。

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
  <strong>⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！</strong>
</p>

---

## 📖 目录

- [✨ 特性](#-特性)
- [🆓 支持的免费视觉模型](#-支持的免费视觉模型)
- [📦 安装](#-安装)
- [🔑 API Key 配置](#-api-key-配置)
- [🛠️ 工具](#️-工具)
- [💡 使用示例](#-使用示例)
- [⚙️ 配置项](#️-配置项)
- [📋 降级策略](#-降级策略)
- [🔒 安全说明](#-安全说明)
- [❓ 常见问题](#-常见问题)
- [📄 许可证](#-许可证)
- [🔗 相关项目](#-相关项目)

---

## ✨ 特性

- **🆓 免费视觉模型** — 智谱 GLM-4.6V-Flash（永久免费）、阿里千问、腾讯混元、Kimi、OVHcloud
- **🔄 智能降级** — 自动按优先级切换提供商，一个失败自动尝试下一个
- **🌐 多提供商** — 5 个视觉提供商，覆盖国内外网络
- **💾 结果缓存** — LRU 缓存减少重复 API 调用
- **🛠️ 4 个工具** — `vision_describe`、`vision_ocr`、`vision_ask`、`vision_status`
- **⚡ 零配置** — 内置 OVHcloud 免费端点（免Key），有 Key 时自动启用更多提供商
- **🔒 安全** — API Key 仅存储在本地凭据文件，不进入代码或日志

---

## 🆓 支持的免费视觉模型

| 提供商 | 模型 | 免费方式 | 直连 | 需要 Key |
|--------|------|----------|------|----------|
| **智谱 GLM** | glm-4.6v-flash | 🆓 永久免费 | ✅ 国内 | ✅ |
| **阿里千问** | qwen-vl-plus | 🆓 新用户100万token/90天 | ✅ 国内 | ✅ |
| **腾讯混元** | hunyuan-vision-1.5-thinking | 🆓 新用户100万token | ✅ 国内 | ✅ |
| **Kimi 月之暗面** | kimi-vl-a3b-thinking | 🆓 新用户¥15赠金 | ✅ 国内 | ✅ |
| **OVHcloud** | Qwen2.5-VL-72B-Instruct | 🆓 免费（2次/分钟/IP） | ✅ | ❌ 免Key |

> **💡 推荐**：只需配置一个 Key 即可使用。推荐使用智谱 GLM（永久免费）。OVHcloud 免 Key，作为兜底自动可用。

---

## 📦 安装

### 方式一：从 GitHub 安装（推荐）

```bash
dsh plugin --profile web add github:pyljjun2009-sketch/asa
```

### 方式二：从 npm 安装

```bash
dsh plugin --profile web add dsh-vision-free-pack
```

### 方式三：本地安装

```bash
git clone https://github.com/pyljjun2009-sketch/asa.git
cd asa
dsh plugin --profile web add .
```

安装后重启 DSH Web 即可生效。

---

## 🔑 API Key 配置

### 快速配置（推荐）

编辑 `~/.dsh/.credentials.yaml`，添加你的 API Key：

```yaml
# 智谱 GLM（永久免费，推荐）
ZHIPU_API_KEY: your_key_here

# 阿里千问 DashScope（新用户100万token/90天）
DASHSCOPE_API_KEY: your_key_here

# 腾讯混元（新用户100万token）
HUNYUAN_API_KEY: your_key_here

# Kimi 月之暗面（新用户¥15赠金）
KIMI_API_KEY: your_key_here
```

### Key 申请地址

| 提供商 | 注册地址 | 免费额度 |
|--------|----------|----------|
| 智谱 GLM | https://open.bigmodel.cn/ | 🆓 永久免费 |
| 阿里千问 | https://bailian.console.aliyun.com/ | 🆓 100万token/90天 |
| 腾讯混元 | https://console.cloud.tencent.com/hunyuan | 🆓 100万token |
| Kimi | https://platform.moonshot.cn | 🆓 ¥15赠金 |

### 环境变量方式

也可以通过环境变量设置：

```bash
# Linux/macOS
export ZHIPU_API_KEY=your_key_here

# Windows PowerShell
$env:ZHIPU_API_KEY = "your_key_here"
```

---

## 🛠️ 工具

### vision_describe

分析图片内容，支持描述、OCR、视觉问答。

**参数：**
- `image_source` (必填) — 图片来源：本地路径、URL 或 base64
- `question` (可选) — 针对图片的问题
- `provider` (可选) — 指定提供商：`auto`、`zhipu`、`dashscope`、`hunyuan`、`kimi`、`ovh`

**示例：**
```json
{
  "image_source": "D:\\work\\screenshot.png",
  "question": "这张图片里有什么内容？"
}
```

### vision_ocr

提取图片中的文字（中英文）。

**参数：**
- `image_source` (必填) — 图片来源

**示例：**
```json
{
  "image_source": "https://example.com/document.jpg"
}
```

### vision_ask

根据图片回答指定问题。

**参数：**
- `image_source` (必填) — 图片来源
- `question` (必填) — 要问的问题

**示例：**
```json
{
  "image_source": "D:\\photos\\receipt.png",
  "question": "这张发票的金额是多少？"
}
```

### vision_status

查看各视觉提供商的配置状态。

**参数：** 无

---

## 💡 使用示例

### 基础用法

```
帮我看看这张图 D:\work\screenshot.png
```

### OCR 文字提取

```
提取这张图片中的文字：C:\Documents\scan.jpg
```

### 视觉问答

```
这张订单截图里商品是什么？多少钱？
```

### 指定提供商

```
用智谱分析 code/my/logo.png，描述一下配色
用千问看看这张照片 D:\photos\cat.jpg
```

### 多图对比

```
对比这两张图片的区别：
- D:\design\v1.png
- D:\design\v2.png
```

---

## ⚙️ 配置项

在 `~/.dsh/profiles/web/cordis.patch.yml` 中配置：

```yaml
- id: vision-free-pack
  config:
    # 缓存设置
    cacheMaxSize: 200           # 缓存最大条目数
    cacheTtlSeconds: 3600       # 缓存过期时间（秒）
    
    # 可选：覆盖凭据文件中的 Key
    zhipuApiKey: ''
    dashscopeApiKey: ''
    hunyuanApiKey: ''
    kimiApiKey: ''
```

### ⚠️ 重要：dsh-vision-router 的 textProvider 配置

如果你同时使用了 `dsh-vision-router` 插件，**必须使用新的对象格式**配置 `textProvider`，否则会导致 DSH 启动卡住：

**❌ 错误格式（会导致启动卡住）：**
```yaml
- id: vision-router
  config:
    textProvider: deepseek-official  # 字符串格式已弃用
```

**✅ 正确格式：**
```yaml
- id: vision-router
  config:
    textProvider:
      provider: deepseek-official
      model: deepseek-v4-pro
```

---

## 📋 降级策略

插件按以下顺序尝试视觉提供商：

```
1. 智谱 GLM-4.6V-Flash（永久免费）🥇
   ↓ 失败
2. 阿里千问 qwen-vl-plus（免费额度）🥈
   ↓ 失败
3. 腾讯混元 hunyuan-vision（免费额度）🥉
   ↓ 失败
4. Kimi kimi-vl（免费额度）
   ↓ 失败
5. OVHcloud Qwen2.5-VL-72B（免Key兜底）🛡️
```

只有配置了对应 Key 的提供商才会被启用。OVHcloud 始终可用作为兜底。

---

## 🔒 安全说明

- ✅ API Key 仅存储在 `~/.dsh/.credentials.yaml`（权限 0600）
- ✅ 不进入代码、日志或版本控制
- ✅ 图片数据仅发送给选定的视觉提供商
- ✅ 缓存在内存中，不持久化到磁盘
- ✅ 支持随时更换 Key，无需重启

---

## ❓ 常见问题

### Q: 需要配置所有 Key 吗？

A: 不需要。只需配置一个 Key 即可使用。推荐使用智谱 GLM（永久免费）。OVHcloud 免 Key，作为兜底自动可用。

### Q: 支持哪些图片格式？

A: 支持 PNG、JPEG、WebP、GIF、BMP 格式。

### Q: 图片大小有限制吗？

A: 默认最大 20MB。超过 4MB 的图片会自动压缩。

### Q: 国内网络可以直接用吗？

A: 可以。智谱、千问、混元、Kimi 都是国内直连，无需代理。OVHcloud 也是直连。

### Q: 如何查看当前使用的提供商？

A: 使用 `vision_status` 工具，或在返回结果中查看 `provider` 字段。

### Q: DSH 启动卡住怎么办？

A: 如果你同时使用了 `dsh-vision-router` 插件，请检查 `textProvider` 配置格式。旧格式（字符串）会导致启动卡住，必须使用新格式（对象）：

```yaml
# ❌ 错误格式
textProvider: deepseek-official

# ✅ 正确格式
textProvider:
  provider: deepseek-official
  model: deepseek-v4-pro
```

---

## 📄 许可证

[MIT](LICENSE) © 2026 [pyljjun2009-sketch](https://github.com/pyljjun2009-sketch)

---

## 🔗 相关项目

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — DSH 官方仓库
- [dsh-vision-router](https://github.com/ysr666/dsh-vision-router) — 像素级视觉工具箱
- [dsh-plugin-vision](https://github.com/tdf1995/dsh-plugin-vision) — 轻量看图+OCR
- [dsh-plugin-deepeye](https://github.com/deepseek-ai/dsh-plugin-deepeye) — 多后端视觉引擎

---

## 🙏 致谢

感谢以下免费视觉模型提供商：

- [智谱 AI](https://open.bigmodel.cn/) — GLM-4.6V-Flash 永久免费
- [阿里云百炼](https://bailian.console.aliyun.com/) — 千问 VL 系列
- [腾讯混元](https://console.cloud.tencent.com/hunyuan) — 混元视觉模型
- [月之暗面](https://platform.moonshot.cn) — Kimi VL 系列
- [OVHcloud](https://ovh.ai/) — 免费视觉端点

---

<p align="center">
  <strong>⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！</strong>
  <br>
  <a href="https://github.com/pyljjun2009-sketch/asa/stargazers">
    <img src="https://img.shields.io/github/stars/pyljjun2009-sketch/asa?style=social" alt="Stars">
  </a>
</p>
