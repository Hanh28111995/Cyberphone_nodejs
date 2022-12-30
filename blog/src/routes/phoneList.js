const express = require('express')
const router = express.Router()
const newsController = require('../app/controllers/NewsController')

// router.get('/phone-list', newsController.show)
router.get('/', newsController.show)

module.exports = router
