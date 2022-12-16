const express = require('express');
const router = express.Router();
const sitesController = require('../app/controllers/SitesController');

// router.get('/search', sitesController.search);
router.get('/', sitesController.checkAPI);

module.exports = router;