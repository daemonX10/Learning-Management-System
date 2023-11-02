import express from 'express';
import { isLoggedIn } from '../middlewares/auth';

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

export default router;