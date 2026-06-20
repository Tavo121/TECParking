const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');

router.post('/spaces/update', hardwareController.updateSpace);


module.exports = router;