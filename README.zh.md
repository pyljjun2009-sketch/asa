# dsh-vision-free-pack

> **为 DeepSeek Harness 提供免费多模态视觉能力的插件包**
>
> 集成智谱 GLM、阿里千问、腾讯混元、Kimi、OVHcloud 等免费视觉模型，支持 4 个视觉工具，开箱即用。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)
![Platform](https://img.shields.io/badge/platform-DeepSeek%20Harness-4B32C3.svg)
![Vision](https://img.shields.io/badge/vision-免费多模态-1a73e8.svg)

---

## ✨ 特性

- **免费视觉模型** — 智谱 GLM-4.6V-Flash（永久免费）、阿里千问、腾讯混元、Kimi、OVHcloud
- **智能降级** — 自动按优先级切换提供商，一个失败自动尝试下一个
- **多提供商** — 5 个视觉提供商，覆盖国内外网络
- **结果缓存** — LRU 缓存减少重复 API 调用
- **4 个工具** — `vision_describe`、`vision_ocr`、`vision_ask`、`vision_status`
- **零配置** — 内置 OVHcloud 免费端点（免Key），有 Key 时自动启用更多提供商

---

## 🆓 支持的免费视觉模型

| 提供商 | 模型 | 免费方式 | 直连 | 需要 Key |
|--------|------|----------|------|----------|
| **智谱 GLM** | glm-4.6v-flash | 永久免费 | ✅ 国内 | ✅ |
| **阿里千问** | qwen-vl-plus | 新用户100万token/90天 | ✅ 国内 | ✅ |
| **腾讯混元** | hunyuan-vision-1.5-thinking | 新用户100万token | ✅ 国内 | ✅ |
| **Kimi 月之暗面** | kimi-vl-a3b-thinking | 新用户¥15赠金 | ✅ 国内 | ✅ |
| **OVHcloud** | Qwen2.5-VL-72B-Instruct | 免费（2次/分钟/IP） | ✅ | ❌ 免Key |

---

## 📦 安装

```bash
# 通过 npm 安装
dsh plugin --profile web add dsh-vision-free-pack

# 从 GitHub 安装
dsh plugin --profile web add github:AILift-LiuJianjun/dsh-vision-free-pack
```

重启 DSH Web 后生效。

---

## 🔑 API Key 配置

编辑 `~/.dsh/.credentials.yaml`：

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

| 提供商 | 注册地址 |
|--------|----------|
| 智谱 GLM | https://open.bigmodel.cn/ |
| 阿里千问 | https://bailian.console.aliyun.com/ |
| 腾讯混元 | https://console.cloud.tencent.com/hunyuan |
| Kimi | https://platform.moonshot.cn |

> **提示**：只需配置一个 Key 即可使用。推荐使用智谱 GLM（永久免费）。OVHcloud 免 Key，作为兜底自动可用。

---

## 🛠️ 工具

| 工具 | 说明 | 参数 |
|------|------|------|
| `vision_describe` | 分析图片内容（描述、OCR、问答） | `image_source`, `question?`, `provider?` |
| `vision_ocr` | 提取图片文字（中英文） | `image_source` |
| `vision_ask` | 根据图片回答问题 | `image_source`, `question` |
| `vision_status` | 查看提供商配置状态 | 无 |

### 使用示例

```
帮我看看这张图 D:\work\screenshot.png
这张订单截图里商品是什么？多少钱？
用智谱分析 code/my/logo.png，描述一下配色
提取这张图片中的文字
```

---

## ⚙️ 配置项

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
- id: vision-free-pack
  config:
    cacheMaxSize: 200       # 缓存最大条目
    cacheTtlSeconds: 3600   # 缓存过期时间（秒）
    zhipuApiKey: ''         # 可选，覆盖凭据文件中的 Key
    dashscopeApiKey: ''
    hunyuanApiKey: ''
    kimiApiKey: ''
```

---

## 📋 降级策略

插件按以下顺序尝试视觉提供商：

1. **智谱 GLM-4.6V-Flash**（永久免费）
2. **阿里千问 qwen-vl-plus**（免费额度）
3. **腾讯混元 hunyuan-vision**（免费额度）
4. **Kimi kimi-vl**（免费额度）
5. **OVHcloud Qwen2.5-VL-72B**（免Key兜底）

只有配置了对应 Key 的提供商才会被启用。OVHcloud 始终可用作为兜底。

---

## 🔒 安全说明

- API Key 仅存储在 `~/.dsh/.credentials.yaml`，不进入代码或日志
- 图片数据仅发送给选定的视觉提供商
- 缓存在内存中，不持久化到磁盘

---

## 📄 许可证

[MIT](LICENSE)

---

## 🔗 相关项目

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [dsh-vision-router](https://github.com/ysr666/dsh-vision-router)
- [dsh-plugin-vision](https://github.com/tdf1995/dsh-plugin-vision)
- [dsh-plugin-deepeye](https://github.com/deepseek-ai/dsh-plugin-deepeye)
