import express from 'express';
import PhonesController from '../app/controllers/PhonesController.js';
const router = express.Router()

router.get('/:slug', PhonesController.detail)
router.get('/', PhonesController.show)

export default router
