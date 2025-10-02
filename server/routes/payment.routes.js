import { Router } from 'express';
import { buySubscription, cancelSubscription, getAllPayments, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import logger from '../utils/logger.js';

const router = Router();

// Middleware to log cookie information for payment routes
const logPaymentCookies = (req, res, next) => {
    logger.info('Payment Route Cookie Debug:', {
        route: req.originalUrl,
        method: req.method,
        cookies: req.cookies,
        cookieHeader: req.headers.cookie,
        origin: req.headers.origin,
        userAgent: req.headers['user-agent'],
        hasToken: !!req.cookies?.token,
        timestamp: new Date().toISOString()
    });
    next();
};

// Apply cookie logging to all payment routes
router.use(logPaymentCookies);

router
    .route('/razorpay-key')
    .get(isLoggedIn,getRazorpayApiKey);

router
    .route('/subscribe')
    .post(isLoggedIn,buySubscription);

router
    .route('/verify')
    .post(isLoggedIn,verifySubscription);

router
    .route('/unsubscribe')
    .post(isLoggedIn,cancelSubscription);

router
    .route('/')
    .get(isLoggedIn,authorizedRoles('ADMIN'),getAllPayments);

export default router;