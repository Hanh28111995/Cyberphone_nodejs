import Product from '../models/Products.js'
import CopyDB from '../../util/mongoose.js'
import url from 'url'

class PhonesController {
  //[GET] /phoneList
  show(req, res, next) {
    let type_search = req.query.type || ''
    let page = req.query.p || 1
    let pageSize = 9
    let skip = (page - 1) * pageSize

    Product.find({})
      .then((products) => {
        let filterArr1 = products.map((item, index) => {
          return item.type
        })
        let AllTypes = filterArr1.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          [],
        )
        let SToA = []
        if (type_search === '') {
          SToA = AllTypes
        } else {
          let stringToArr = []
          stringToArr.push(type_search)
          SToA = stringToArr.toString().split(',')
        }
        /// convert query param type to array
        let  filter_product = products.filter((item) => SToA.includes(item.type))
        let pageFilter_products = filter_product.slice(skip, skip + pageSize)
        return { AllTypes, products: pageFilter_products }
      })

      .then((objectProduct) => {
        res.render('phones/phoneList', {
          products: CopyDB.MultiResponseToObject(objectProduct.products),
          typeList: objectProduct.AllTypes,
          pathname: url.parse(req.originalUrl).pathname,
          response: type_search || '',
          pagination: {
            page: page, // The current page the user is on
            pageCount: 7, // The total number of available pages
          },
        })
      })

      .catch(next)
  }
  //[GET] /news/:slug
}
export default new PhonesController()
