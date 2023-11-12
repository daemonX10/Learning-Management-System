import express from "express";
import { ChangePassword, forgetPassword, getProfile, login, logout, register, resetPassword } from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();


router.post('/register',upload.single('avatar'),register)
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,getProfile);
router.post('/reset',forgetPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/changePassword',isLoggedIn,ChangePassword);

export default router;