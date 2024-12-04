// routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.post('/update', healthController.updateHealth);

router.get('/:userId', healthController.getHealth);

module.exports = router;
