const express = require('express')
const router = express.Router()
const myprofileController = require('../app/controllers/MyfrofileController')

router.get('/my-courses', myprofileController.savedCourse)
router.get('/trash/courses', myprofileController.trashCourse)

module.exports = router
