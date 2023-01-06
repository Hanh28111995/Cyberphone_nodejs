import express from 'express';
import coursesController from '../app/controllers/CoursesController.js';
const router = express.Router()

router.get('/create', coursesController.create)
router.post('/store', coursesController.store)
router.get('/:slug', coursesController.show)
router.get('/:id/edit', coursesController.edit)

router.put('/:id', coursesController.update)
router.delete('/:id', coursesController.del)
router.delete('/:id/force', coursesController.destroy)

router.patch('/:id/restore', coursesController.restore)

export default router
