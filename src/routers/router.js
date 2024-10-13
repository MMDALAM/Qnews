const router = require('express').Router();

const { botRouter } = require('./bot');
router.use('/bot',botRouter)

module.exports = { AllRouters :router }