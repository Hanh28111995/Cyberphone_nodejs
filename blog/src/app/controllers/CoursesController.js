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
    req.body.thumnail = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(req.body)
    course
      .save()
      .then(() => {
        res.redirect('/my-profile/my-courses')
      })
      .catch(next)
  }
  //[GET] /courses/:ID/edit
  edit(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .then((course) => {
        res.render('courses/edit', { course: SingleResponseToObject(course) })
      })
      .catch(next)
  }
  //[PUT] /courses/:ID
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/my-profile/my-courses')
      })
      .catch(next)
  }
  //[DELETE] /courses/:ID
  del(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  //[DELETE] /courses/:ID/force
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  //[PATCH] /courses/:ID/RESTORE
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }
}
module.exports = new CoursesController()
