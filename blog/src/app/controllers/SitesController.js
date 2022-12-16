const Course = require('../models/Courses')
const { MultiResponseToObject } = require('../../util/mongoose')

class SitesController {
  //[GET] /
  index(req, res, next) {
    // Course.find({}, function (err, courses) {
    //   if (!err) {
    //     res.json(courses)
    //   } else {
    //     res.status(400).json({ error: 'ERROR !' })
    //   }
    // })
    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: MultiResponseToObject(courses),
        })
      })
      .catch(next)
  }
  //[GET] /search
  search(req, res) {
    res.render('search')
  }

  // check API /api/v1/
  checkAPI(req, res, next) {
    res.status(200).json({
      message: 'ok',
    })
    // Course.find({})
    //   .then((courses) => {
    //     res.status(200).json({
    //       message: 'ok',
    //       courses: MultiResponseToObject(courses),
    //     })
    //   })
    //   .catch(next)
  }
}
module.exports = new SitesController()
