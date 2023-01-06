import express, { Router } from 'express';
import sitesController from '../app/controllers/SitesController.js';
import validate from '../util/validator.js';

const router = express.Router();

router.get('/search', sitesController.search);

router.get('/signup', sitesController.signup);
router.post('/signup', validate.validateRegisterUser() ,sitesController.submitRegister)

router.get('/login', sitesController.login);

router.get('/',  sitesController.index);

export default router;
