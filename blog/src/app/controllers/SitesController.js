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
}
module.exports = new SitesController()
