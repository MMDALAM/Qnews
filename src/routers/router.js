const router = require('express').Router();

const { homeRouter } = require('./home');
router.use('/', homeRouter);

const { botRouter } = require('./bot');
router.use('/bot', botRouter);

module.exports = { AllRouters: router };
