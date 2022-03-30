const express = require('express');
const controller = require('../controllers/transactionController');
//const passport = require('passport');
//const { restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
/*
router.route('/').get(controller.getAll).post(controller.create);
router
    .route('/:userId')
    .get(controller.getById)
    .patch(controller.updateById)
    .delete(controller.deleteById);
*/
module.exports = router;
