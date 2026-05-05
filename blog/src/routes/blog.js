import express from 'express'
import BlogController from '../app/controllers/BlogController.js'

const router = express.Router()

router.get('/:slug', BlogController.detail)
router.get('/', BlogController.index)

export default router
