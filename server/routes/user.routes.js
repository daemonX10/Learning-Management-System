const express = require('express');
const isLoggedIn = require('../middlewares/auth.middleware.js')

const router = express.Router();
const { 
    register, 
    login, 
    logout, 
    getProfile } = require('../controllers/user.controller');

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn ,getProfile);

module.exports = router;