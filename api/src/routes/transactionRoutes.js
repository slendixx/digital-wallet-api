const express = require('express');
const controller = require('../controllers/transactionController');
const passport = require('passport');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(
        passport.authenticate('jwt-cookiecombo', { session: false }),
        controller.getAll
    )
    .post(
        passport.authenticate('jwt-cookiecombo', { session: false }),
        controller.create
    );
router
    .route('/:transactionId')
    .patch(
        passport.authenticate('jwt-cookiecombo', { session: false }),
        controller.updateById
    )
    .delete(
        passport.authenticate('jwt-cookiecombo', { session: false }),
        controller.deleteById
    );

module.exports = router;
