import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const RSS_URL = 'https://vnexpress.net/rss/so-hoa.rss'

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const requestUrl = typeof url === 'string' ? new URL(url) : url
    https
      .get(requestUrl, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const location = res.headers.location
          if (location.startsWith('http://') || location.startsWith('https://')) {
            return resolve(fetchText(location))
          }
          if (location.startsWith('//')) {
            return resolve(fetchText(`https:${location}`))
          }
          return resolve(fetchText(new URL(location, requestUrl)))
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        res.setEncoding('utf8')
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

function decodeBasicEntities(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function slugify(input) {
  return String(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractCData(xml) {
  const match = xml.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  return match ? match[1] : xml
}

function pickImageFromHtml(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : ''
}

function stripTags(html) {
  return String(html).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function parseRssItems(xml, limit = 12) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let m
  while ((m = itemRegex.exec(xml)) && items.length < limit) {
    const itemXml = m[1]

    const title = decodeBasicEntities(extractCData((itemXml.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim())
    const link = decodeBasicEntities(((itemXml.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '').trim())
    const pubDate = ((itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '').trim()
    const descriptionRaw = extractCData((itemXml.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '').trim()
    const descriptionHtml = decodeBasicEntities(descriptionRaw)
    const image = pickImageFromHtml(descriptionHtml)
    const excerpt = stripTags(descriptionHtml)

    let slug = ''
    if (link) {
      slug = link
        .split('?')[0]
        .split('#')[0]
        .split('/')
        .filter(Boolean)
        .pop()
        .replace(/\.html$/i, '')
      slug = slugify(slug)
    }
    if (!slug) slug = slugify(title)
    if (!slug) continue

    items.push({
      title,
      slug,
      url: link,
      excerpt,
      image,
      publishedAt: pubDate,
      source: 'VnExpress - Số hoá',
    })
  }
  return items
}

async function updateBlogData() {
  console.log('Bắt đầu cào RSS blog...')
  const xml = await fetchText(RSS_URL)
  const posts = parseRssItems(xml, 12)
  const outPath = path.join(__dirname, 'blog_data.json')
  fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf8')
  console.log(`Hoàn tất! Đã lưu ${posts.length} bài vào: ${outPath}`)
}

updateBlogData().catch((e) => {
  console.error('Lỗi cào RSS:', e.message)
  process.exit(1)
})
