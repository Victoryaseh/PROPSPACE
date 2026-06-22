const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, userController.getProfile);
router.put('/me', protect, userController.updateProfile);
router.put('/me/password', protect, userController.changePassword);

module.exports = router;
