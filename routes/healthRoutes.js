const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const auth = require('../middleware/auth'); 

router.post('/update', auth, healthController.updateHealth);

router.get('/:userId', auth, healthController.getHealth);

module.exports = router;
