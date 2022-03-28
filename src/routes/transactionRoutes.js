import express from 'express';
import controller from '../controllers/transactionController';
import { getById } from '../controllers/userController';
//const passport = require('passport');
//const { restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(controller.getAll).post(controller.create);
router
    .route('/:userId')
    .get(controller.getById)
    .patch(controller.updateById)
    .delete(controller.deleteById);

export default router;
