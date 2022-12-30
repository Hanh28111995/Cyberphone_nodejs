const Product = require('../models/Products')
const { MultiResponseToObject } = require('../../util/mongoose')
const path = require('path')
var url = require('url')
const { search } = require('../../routes/phoneList')

class NewsController {
  //[GET] /phoneList
  show(req, res, next) {
    let type_search = req.query.type || ''
    Product.find({})
      .then((products) => {
        let filterArr1 = products.map((item, index) => {
          return item.type
        })
        let filterArr2 = filterArr1.reduce(
          (unique, item) =>
            unique.includes(item) ? unique : [...unique, item],
          [],
        )
        //////array contain all the phone-type
        let SToA = []
        if (type_search === '') {
          SToA = filterArr2
        } else {
          let stringToArr = []
          stringToArr.push(type_search)
          SToA = stringToArr.toString().split(',')
        }
        /// convert query param type to array
        let filter_product = products.filter(item => SToA.includes(item.type));
    

        console.log(filter_product)
        res.render('phoneList', {
          products: MultiResponseToObject(filter_product),
          typeList: filterArr2,
          pathname: url.parse(req.originalUrl).pathname,
          response: type_search || '',
        })
      })

      .catch(next)
  }
  //[GET] /news/:slug
}
module.exports = new NewsController()
