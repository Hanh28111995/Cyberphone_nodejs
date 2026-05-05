import url from 'url'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TYPE_LABELS = {
  Case: 'Ốp lưng',
  Charger: 'Củ sạc',
  Cable: 'Cáp sạc',
  Earphone: 'Tai nghe',
  PowerBank: 'Pin dự phòng',
  Stand: 'Giá đỡ',
}

const MAIN_TYPES = Object.keys(TYPE_LABELS)

class AccessoriesController {
  //[GET] /accesories
  show(req, res, next) {
    const type_search = req.query.type || ''
    const page = Number(req.query.p || 1)
    const pageSize = 9
    const skip = (page - 1) * pageSize

    try {
      const jsonPath = path.join(__dirname, '../../util/accesories-data.json')
      const fileData = fs.readFileSync(jsonPath, 'utf8')
      const products = fileData.trim() ? JSON.parse(fileData) : []

      const typeList = [
        { key: '', label: 'Tất cả' },
        ...MAIN_TYPES.map((key) => ({ key, label: TYPE_LABELS[key] })),
        { key: 'Others', label: 'Khác' },
      ]

      let filter_product = products
      if (type_search !== '') {
        filter_product = products.filter((item) => {
          const isMain = MAIN_TYPES.includes(item.type)
          const matchedMain = item.type === type_search
          const matchedOthers = type_search === 'Others' && !isMain
          return matchedMain || matchedOthers
        })
      }

      const pageFilter_products = filter_product.slice(skip, skip + pageSize)

      res.render('accesories/accessoryList', {
        products: pageFilter_products,
        typeList,
        pathname: url.parse(req.originalUrl).pathname,
        response: type_search || '',
        pagination: {
          page,
          pageCount: Math.ceil(filter_product.length / pageSize),
        },
      })
    } catch (error) {
      next(error)
    }
  }

  //[GET] /accesories/:slug
  detail(req, res, next) {
    try {
      const jsonPath = path.join(__dirname, '../../util/accesories-data.json')
      const fileData = fs.readFileSync(jsonPath, 'utf8')
      const products = fileData.trim() ? JSON.parse(fileData) : []

      const accessory = products.find((p) => p.slug === req.params.slug)
      if (!accessory) {
        return res.status(404).send('Không tìm thấy phụ kiện!')
      }

      res.render('accesories/accessoryDetail', {
        accessory,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AccessoriesController()
