const Course = require('../models/Courses')
const { MultiResponseToObject } = require('../../util/mongoose')
const mongoose = require('../../util/mongoose')

class MyfrofileController {
  //[GET] /myprofile/my-courses
  savedCourse(req, res, next) {
    Course.find({ deletedAt: null }) //dk thuoc tinh Deleted trong DB
      .then((courses) =>
        res.render('myprofile/myCourse', {
          courses: MultiResponseToObject(courses),
        }),
      )
      .catch(next)
  }
  //[GET] /my-profile/bin/my-courses
  trashCourse(req, res, next) {
    Course.findDeleted() //dk thuoc tinh Deleted trong DB
      .then((courses) =>
        res.render('myprofile/trashCourse', {
          courses: MultiResponseToObject(courses),
        }),
      )
      .catch(next)
  }
}
module.exports = new MyfrofileController()
