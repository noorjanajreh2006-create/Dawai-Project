const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');

router.post('/register', register); // public routes
router.post('/login', login); // you do not need a token

router.get('/profile', authMiddleware, getProfile); // private routes
router.put('/profile', authMiddleware, updateProfile); // Must have the right token to access, so we added authmiddleware to ensure that

module.exports = router;