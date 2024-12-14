const botContoller = require('../../controllers/bot/botContoller');

const router = require('express').Router();

//****BOTS****
router.get('/Today', botContoller.botToday);
router.get('/Yesterday', botContoller.botYesterday);

router.get('/noting', botContoller.noting);

module.exports = { botRouter: router };
