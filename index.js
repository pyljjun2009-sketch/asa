// dsh-vision-free-pack — 免费多模态视觉插件包
// 集成智谱 GLM、阿里千问、腾讯混元、Kimi、OVHcloud 等免费视觉模型
// 为 DeepSeek Harness 提供开箱即用的视觉能力

import { readFileSync, existsSync } from 'fs'
import { resolve, extname } from 'path'

// ========== 视觉提供商适配器 ==========

/**
 * 智谱 GLM 视觉适配器
 * glm-4.6v-flash: 永久免费，国内直连
 */
class ZhipuVisionAdapter {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://open.bigmodel.cn/api/paas/v4'
    this.model = 'glm-4.6v-flash'
  }

  async analyze(imageBase64, question, mimeType) {
    const body = {
      model: this.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: question || '请详细描述这张图片的内容。' }
        ]
      }],
      max_tokens: 2048
    }

    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`智谱 API 错误 (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '无返回内容'
  }
}

/**
 * 阿里云百炼 DashScope 视觉适配器
 * qwen-vl-plus: 新用户100万token/90天
 */
class DashScopeVisionAdapter {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://dashscope.aliyuncs.com/compatible-mode/v1'
    this.model = 'qwen-vl-plus'
  }

  async analyze(imageBase64, question, mimeType) {
    const body = {
      model: this.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: question || '请详细描述这张图片的内容。' }
        ]
      }],
      max_tokens: 2048
    }

    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`DashScope API 错误 (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '无返回内容'
  }
}

/**
 * 腾讯混元视觉适配器
 * hunyuan-vision-1.5-thinking: 新用户100万token
 */
class HunyuanVisionAdapter {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.hunyuan.cloud.tencent.com/v1'
    this.model = 'hunyuan-vision-1.5-thinking'
  }

  async analyze(imageBase64, question, mimeType) {
    const body = {
      model: this.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: question || '请详细描述这张图片的内容。' }
        ]
      }],
      max_tokens: 2048
    }

    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`混元 API 错误 (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '无返回内容'
  }
}

/**
 * Kimi (月之暗面) 视觉适配器
 * kimi-vl-a3b-thinking: 新用户¥15赠金
 */
class KimiVisionAdapter {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.moonshot.cn/v1'
    this.model = 'kimi-vl-a3b-thinking'
  }

  async analyze(imageBase64, question, mimeType) {
    const body = {
      model: this.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: question || '请详细描述这张图片的内容。' }
        ]
      }],
      max_tokens: 2048
    }

    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Kimi API 错误 (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '无返回内容'
  }
}

/**
 * OVHcloud 视觉适配器（免Key，每IP 2次/分钟）
 */
class OVHVisionAdapter {
  constructor() {
    this.baseURL = 'https://ovh.ai/v1'
    this.model = 'Qwen2.5-VL-72B-Instruct'
  }

  async analyze(imageBase64, question, mimeType) {
    const body = {
      model: this.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: question || '请详细描述这张图片的内容。' }
        ]
      }],
      max_tokens: 2048
    }

    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`OVHcloud API 错误 (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || '无返回内容'
  }
}

// ========== 提供商工厂 ==========

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase()
  const mimeMap = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp'
  }
  return mimeMap[ext] || 'image/png'
}

function loadCredentials() {
  const credPath = resolve(process.env.HOME || process.env.USERPROFILE, '.dsh', '.credentials.yaml')
  if (!existsSync(credPath)) return {}

  const content = readFileSync(credPath, 'utf-8')
  const creds = {}
  for (const line of content.split('\n')) {
    const match = line.match(/^([A-Z_]+):\s*(.+)$/)
    if (match) creds[match[1]] = match[2].trim()
  }
  return creds
}

function createAdapters(config, creds) {
  const adapters = []

  // 智谱 GLM（优先级最高，永久免费）
  const zhipuKey = config?.zhipuApiKey || creds.ZHIPU_API_KEY || creds.ZAI_API_KEY
  if (zhipuKey && !zhipuKey.startsWith('placeholder')) {
    adapters.push({ name: '智谱 GLM-4.6V-Flash', adapter: new ZhipuVisionAdapter(zhipuKey) })
  }

  // 阿里千问 DashScope
  const dashKey = config?.dashscopeApiKey || creds.DASHSCOPE_API_KEY
  if (dashKey && !dashKey.startsWith('placeholder')) {
    adapters.push({ name: '千问 qwen-vl-plus', adapter: new DashScopeVisionAdapter(dashKey) })
  }

  // 腾讯混元
  const hunyuanKey = config?.hunyuanApiKey || creds.HUNYUAN_API_KEY
  if (hunyuanKey && !hunyuanKey.startsWith('placeholder')) {
    adapters.push({ name: '混元 hunyuan-vision', adapter: new HunyuanVisionAdapter(hunyuanKey) })
  }

  // Kimi 月之暗面
  const kimiKey = config?.kimiApiKey || creds.KIMI_API_KEY
  if (kimiKey && !kimiKey.startsWith('placeholder')) {
    adapters.push({ name: 'Kimi kimi-vl', adapter: new KimiVisionAdapter(kimiKey) })
  }

  // OVHcloud（兜底，免Key）
  adapters.push({ name: 'OVHcloud Qwen2.5-VL-72B', adapter: new OVHVisionAdapter() })

  return adapters
}

// ========== LRU 缓存 ==========

class LRUCache {
  constructor(maxSize = 100, ttlMs = 3600000) {
    this.maxSize = maxSize
    this.ttlMs = ttlMs
    this.cache = new Map()
  }

  get(key) {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (Date.now() - entry.time > this.ttlMs) {
      this.cache.delete(key)
      return null
    }
    this.cache.delete(key)
    this.cache.set(key, entry)
    return entry.value
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value, { value, time: Date.now() })
  }

  has(key) {
    return this.get(key) !== null
  }
}

// ========== 工具函数 ==========

async function computeHash(data) {
  const { createHash } = await import('crypto')
  return createHash('sha256').update(data).digest('hex').slice(0, 16)
}

// ========== 插件入口 ==========

export default (ctx, config) => {
  const creds = loadCredentials()
  const adapters = createAdapters(config, creds)
  const cache = new LRUCache(config?.cacheMaxSize || 200, config?.cacheTtlSeconds || 3600)

  // ---- 工具: vision_describe ----
  ctx.tools.register('vision_describe', {
    description: '分析图片内容，支持本地路径、URL 或 base64。可用于图片描述、OCR、视觉问答。',
    parameters: {
      type: 'object',
      properties: {
        image_source: {
          type: 'string',
          description: '图片来源：本地绝对路径、相对路径、HTTP(S) URL 或 data:image/...;base64,...'
        },
        question: {
          type: 'string',
          description: '针对图片的问题，省略时默认要求详细描述'
        },
        provider: {
          type: 'string',
          enum: ['auto', 'zhipu', 'dashscope', 'hunyuan', 'kimi', 'ovh'],
          description: '指定视觉提供商，auto 会按优先级自动降级'
        }
      },
      required: ['image_source']
    },
    async execute({ image_source, question, provider }) {
      // 读取图片
      let imageBase64, mimeType

      if (image_source.startsWith('data:')) {
        // data URI
        const match = image_source.match(/^data:([^;]+);base64,(.+)$/)
        if (!match) return { error: '无效的 data URI 格式' }
        mimeType = match[1]
        imageBase64 = match[2]
      } else if (image_source.startsWith('http://') || image_source.startsWith('https://')) {
        // URL
        try {
          const res = await fetch(image_source)
          if (!res.ok) return { error: `下载图片失败: ${res.status}` }
          const buf = Buffer.from(await res.arrayBuffer())
          imageBase64 = buf.toString('base64')
          mimeType = res.headers.get('content-type') || 'image/png'
        } catch (e) {
          return { error: `下载图片失败: ${e.message}` }
        }
      } else {
        // 本地文件
        const fs = await import('fs')
        const path = await import('path')
        const imgPath = path.resolve(image_source)
        if (!fs.existsSync(imgPath)) return { error: `文件不存在: ${imgPath}` }
        const buf = fs.readFileSync(imgPath)
        imageBase64 = buf.toString('base64')
        mimeType = getMimeType(imgPath)
      }

      // 缓存检查
      const hash = await computeHash(imageBase64 + (question || ''))
      const cached = cache.get(hash)
      if (cached) return { result: cached, cached: true }

      // 选择提供商并调用
      let lastError = null
      const targetAdapters = provider && provider !== 'auto'
        ? adapters.filter(a => a.name.toLowerCase().includes(provider))
        : adapters

      for (const { name, adapter } of targetAdapters) {
        try {
          const result = await adapter.analyze(imageBase64, question, mimeType)
          cache.set(hash, result)
          return { result, provider: name }
        } catch (e) {
          lastError = `${name}: ${e.message}`
          continue
        }
      }

      return { error: `所有视觉提供商均失败。最后错误: ${lastError}` }
    }
  })

  // ---- 工具: vision_ocr ----
  ctx.tools.register('vision_ocr', {
    description: '提取图片中的文字（OCR），支持中英文。',
    parameters: {
      type: 'object',
      properties: {
        image_source: {
          type: 'string',
          description: '图片来源：本地路径、URL 或 base64'
        }
      },
      required: ['image_source']
    },
    async execute({ image_source }) {
      // 复用 vision_describe 的逻辑
      const result = await ctx.tools.get('vision_describe').execute({
        image_source,
        question: '请提取这张图片中的所有文字内容，保持原始格式和排版。只输出文字，不要添加额外描述。'
      })
      return result
    }
  })

  // ---- 工具: vision_ask ----
  ctx.tools.register('vision_ask', {
    description: '根据图片回答指定问题。',
    parameters: {
      type: 'object',
      properties: {
        image_source: {
          type: 'string',
          description: '图片来源'
        },
        question: {
          type: 'string',
          description: '要问的问题'
        }
      },
      required: ['image_source', 'question']
    },
    async execute({ image_source, question }) {
      return ctx.tools.get('vision_describe').execute({ image_source, question })
    }
  })

  // ---- 工具: vision_status ----
  ctx.tools.register('vision_status', {
    description: '查看各视觉提供商的配置状态（不泄露 Key 内容）。',
    parameters: { type: 'object', properties: {} },
    async execute() {
      const status = adapters.map(({ name }) => ({
        name,
        configured: true
      }))
      return {
        providers: status,
        total: status.length,
        cacheSize: cache.cache.size
      }
    }
  })

  // ---- 注入 system prompt ----
  ctx.on('generate', (session) => {
    session.systemPrompt = (session.systemPrompt || '') + [
      '',
      '## 视觉能力',
      '你有以下视觉工具可用：',
      '- `vision_describe`: 分析图片内容（描述、OCR、问答）',
      '- `vision_ocr`: 提取图片文字',
      '- `vision_ask`: 根据图片回答问题',
      '- `vision_status`: 查看视觉提供商状态',
      '',
      '当用户发送图片或询问关于图片的问题时，使用这些工具。',
      '图片来源支持：本地路径、HTTP URL、base64 data URI。'
    ].join('\n')
  })

  ctx.logger.info(`[vision-free-pack] 已加载 ${adapters.length} 个视觉提供商: ${adapters.map(a => a.name).join(', ')}`)
}
