import { Router } from 'express';
import { buySubscription, cancelSubscription, getAllPayments, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller';

const router = Router();

router
    .route('/razorpay-key')
    .get(getRazorpayApiKey);

router
    .route('/subscribe')
    .post(buySubscription);

router
    .route('/verify')
    .post(verifySubscription);

router
    .route('/unsubscribe')
    .post(cancelSubscription);

router
    .route('/')
    .get(getAllPayments);