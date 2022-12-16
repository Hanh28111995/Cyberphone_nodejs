const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/CoursesController')

router.get('/create', coursesController.create)
router.post('/store', coursesController.store)
router.get('/:slug', coursesController.show)
router.get('/:id/edit', coursesController.edit)

router.put('/:id', coursesController.update)
router.delete('/:id', coursesController.del)
router.delete('/:id/force', coursesController.destroy)

router.patch('/:id/restore', coursesController.restore)

module.exports = router
