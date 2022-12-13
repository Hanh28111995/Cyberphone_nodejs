const Course = require('../models/Courses')
const { SingleResponseToObject } = require('../../util/mongoose')
const mongoose = require('../../util/mongoose')

class CoursesController {
  //[GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: SingleResponseToObject(course) })
      })
      .catch(next)
  }
  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create')
  }
  //[POST] /courses/create
  store(req, res, next) {
    const formData = req.body
    formData.thumnail = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(formData)
    course.save()
    res.send('COURSE SAVE !!!')
  }
}
module.exports = new CoursesController()
