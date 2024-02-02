import { Router } from 'express';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import { contactUs, userStats } from '../controllers/miscellaneous.controller.js';



const router = Router();

// @route   GET api/miscellaneous

router
    .route('/contact')
    .post(contactUs);

router
    .route('/admin/stats/users')
    .get(isLoggedIn , authorizedRoles('ADMIN') , userStats);

export default router;