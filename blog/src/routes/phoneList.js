import express from 'express';
import PhonesController from '../app/controllers/PhonesController.js';
const router = express.Router()


// router.get('/phone-list', newsController.show)
router.get('/', PhonesController.show)

export default router
