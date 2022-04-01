const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');

const router = express.Router();

router
    .route('/login')
    .post(
        passport.authenticate('local', { session: false }),
        controller.signJwt
    );
router.route('/forgot-password').post(controller.createPasswordRecoveryToken);

router.route('/reset-password').post(controller.resetPassword);

module.exports = router;
