import express from 'express';
import myprofileController from '../app/controllers/MyfrofileController.js';
const router = express.Router()

router.get('/my-courses', myprofileController.savedCourse)
router.get('/trash/courses', myprofileController.trashCourse)

export default router
