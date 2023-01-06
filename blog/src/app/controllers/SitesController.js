import Account from '../models/Accounts.js'
import Product from '../models/Products.js'
import CopyDB from '../../util/mongoose.js'
import url from 'url'
import { validationResult } from 'express-validator'

class SitesController {
  // [GET] /
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render('home', {
          products: CopyDB.MultiResponseToObject(products),
          pathname: url.parse(req.originalUrl).pathname,
        })
      })
      .catch(next)
  }

  // [GET] / render form sign-up
  signup(req, res, next) {
    res.render('signup', {
      errors: {
        error_username: '',
        error_password: '',
      },
    })
  }

  // [POST] /sign up
  submitRegister(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let error_username = []
      let error_password = []
      errors.array().map((item, index) => {
        if (item.param === 'username') error_username.push(item)
      })
      errors.array().map((item, index) => {
        if (item.param === 'password') error_password.push(item)
      })
      return res.status(400).render('signup', {
        errors: {
          error_username: error_username[0]?.msg,
          error_password: error_password[0]?.msg,
        },
      })
    }
    Account.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((user) => {
        alert(user)
        res.json(user)
       
      })
      .catch(next)

    // .catch(next)
  }

  // [GET] /  render form log-in
  login(req, res, next) {
    res.render('login', {})
  }

  //[GET] /search
  search(req, res) {
    res.render('search')
  }

  // check API by Postman /api/v1/
  // checkAPI(req, res, next) {
  //   Course.find({})
  //     .then((courses) => {
  //       res.status(200).json({
  //         message: 'ok',
  //         courses: CopyDB.MultiResponseToObject(courses),
  //       })
  //     })
  //     .catch(next)
  // }
}
export default new SitesController()
