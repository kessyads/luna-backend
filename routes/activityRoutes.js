const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middleware/auth');

router.post('/update', auth, activityController.updateActivity);

router.get('/:userId', auth, activityController.getActivity);

module.exports = router;
