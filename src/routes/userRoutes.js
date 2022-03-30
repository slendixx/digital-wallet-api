const express = require('express');
const controller = require('../controllers/userController');
//const passport = require('passport');
//const { restrictTo } = require('../controllers/authController');
const transactionRouter = require('../routes/transactionRoutes');

const router = express.Router();

router.use('/:userId/transactions', transactionRouter);

router.route('/').post(controller.create);
router.route('/:userId').get(controller.getById);

module.exports = router;
