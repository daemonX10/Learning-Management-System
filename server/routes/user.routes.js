import express from 'express';
import  isLoggedIn  from '../middlewares/auth.middleware.js';

const router = express.Router();
import { 
    register, 
    login, 
    logout, 
    getProfile } from '../controllers/user.controllers.js';

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn ,getProfile);

export default router;