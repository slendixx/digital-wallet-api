import express from 'express';
import controller from '../controllers/userController';
//const passport = require('passport');
//const { restrictTo } = require('../controllers/authController');
import transactionRouter from '../routes/transactionRoutes';

const router = express.Router();

router.use('/:userId/transactions', transactionRouter);

router.route('/').post(controller.create);
router.route('/:userId').get(controller.getById);

export default router;
