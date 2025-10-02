import express from "express";
import { ChangePassword, forgetPassword, getProfile, login, logout, makeUserAdmin, register, resetPassword, updateUser, requestAdminAccess, getAdminRequests, reviewAdminRequest, getUserAdminRequest } from "../controllers/user.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router    // /api/v1/user
    .post('/register',upload.single('avatar'),register)
    .post('/login',login)
    .get('/logout',logout)
    .get('/profile',isLoggedIn,getProfile)
    .post('/reset',forgetPassword)
    .post('/reset/:resetToken',resetPassword)
    .post('/changePassword',isLoggedIn,ChangePassword)
    .put('/update',isLoggedIn,upload.single('avatar'), updateUser)
    .put("/:userId/makeAdmin",isLoggedIn,authorizedRoles('ADMIN'),makeUserAdmin)
    .post('/request-admin',isLoggedIn,requestAdminAccess)
    .get('/admin-requests',isLoggedIn,authorizedRoles('ADMIN'),getAdminRequests)
    .put('/admin-requests/:requestId/review',isLoggedIn,authorizedRoles('ADMIN'),reviewAdminRequest)
    .get('/my-admin-request',isLoggedIn,getUserAdminRequest)

export default router;