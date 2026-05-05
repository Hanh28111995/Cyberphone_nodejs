import express from 'express'
import AccessoriesController from '../app/controllers/AccessoriesController.js'

const router = express.Router()

router.get('/:slug', AccessoriesController.detail)
router.get('/', AccessoriesController.show)

export default router
