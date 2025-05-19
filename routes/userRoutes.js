// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); 

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.put('/profile/update', userController.updateUser);
router.get('/profile', auth, userController.getUser);
router.delete('/profile', auth, userController.deleteUser);

router.get('/:id', userController.getUserById);
router.get('/nickname/:nickname', userController.getUserByNickname);
router.get('/', userController.getAllUsers); 

module.exports = router;
