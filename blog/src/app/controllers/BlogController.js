import url from 'url'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class BlogController {
  //[GET] /blog
  index(req, res, next) {
    const page = Number(req.query.p || 1)
    const pageSize = 6
    const skip = (page - 1) * pageSize

    try {
      const jsonPath = path.join(__dirname, '../../util/blog_data.json')
      const fileData = fs.readFileSync(jsonPath, 'utf8')
      const posts = fileData.trim() ? JSON.parse(fileData) : []

      const pagePosts = posts.slice(skip, skip + pageSize)

      res.render('blog/blogList', {
        posts: pagePosts,
        pathname: url.parse(req.originalUrl).pathname,
        pagination: {
          page,
          pageCount: Math.ceil(posts.length / pageSize),
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //[GET] /blog/:slug
  detail(req, res, next) {
    try {
      const jsonPath = path.join(__dirname, '../../util/blog_data.json')
      const fileData = fs.readFileSync(jsonPath, 'utf8')
      const posts = fileData.trim() ? JSON.parse(fileData) : []

      const post = posts.find((p) => p.slug === req.params.slug)
      if (!post) {
        return res.status(404).send('Không tìm thấy bài viết!')
      }

      res.render('blog/blogDetail', {
        post,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new BlogController()
