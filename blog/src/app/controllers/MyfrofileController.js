import Course from '../models/Courses.js';
import  CopyDB  from '../../util/mongoose.js';

class MyfrofileController {
  //[GET] /myprofile/my-courses
  savedCourse(req, res, next) {
    Course.find({ deletedAt: null }) //dk thuoc tinh Deleted trong DB
      .then((courses) =>
        res.render('myprofile/myCourse', {
          courses: CopyDB.MultiResponseToObject(courses),
        }),
      )
      .catch(next)
  }
  //[GET] /my-profile/bin/my-courses
  trashCourse(req, res, next) {
    Course.findDeleted() //dk thuoc tinh Deleted trong DB
      .then((courses) =>
        res.render('myprofile/trashCourse', {
          courses: CopyDB.MultiResponseToObject(courses),
        }),
      )
      .catch(next)
  }
}
export default new MyfrofileController()
