import express from "express";
import { ChangePassword, forgetPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router    // /api/v1/user
    .post('/register',upload.single('avatar'),register)
    .post('/login',login)
    .get('/logout',logout)
    .get('/me',isLoggedIn,getProfile)
    .post('/reset',forgetPassword)
    .post('/reset/:resetToken',resetPassword)
    .post('/changePassword',isLoggedIn,ChangePassword)
    .put('/update',isLoggedIn,upload.single('avatar'),updateUser)

export default router;