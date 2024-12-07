const botContoller = require('../../controllers/bot/botContoller');

const router = require('express').Router();

//****BOTS****
router.get('/', botContoller.bots);
router.get('/noting', botContoller.noting);

module.exports = { botRouter: router };
