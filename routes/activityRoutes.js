// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/update', activityController.updateActivity);

router.get('/:userId', activityController.getActivity);

module.exports = router;
