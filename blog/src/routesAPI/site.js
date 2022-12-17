const express = require('express');
const router = express.Router();
const sitesController = require('../app/controllers/SitesController');
const timeOut = require('connect-timeout')


// router.get('/search', sitesController.search);
router.get('/*', timeOut('6s') ,sitesController.checkAPI);

module.exports = router;