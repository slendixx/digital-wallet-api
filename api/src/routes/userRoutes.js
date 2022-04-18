const express = require('express');
const controller = require('../controllers/userController');
const passport = require('passport');
const transactionRouter = require('../routes/transactionRoutes');

const router = express.Router();

router.use('/:userId/transactions', transactionRouter);

router.route('/').post(controller.create);
router
    .route('/:userId')
    .get(
        passport.authenticate('jwt-cookiecombo', { session: false }),
        controller.getById
    );

router
    .route('/:userId/changePassword')
    .patch(passport.authenticate('jwt'), controller.changePassword);

module.exports = router;
