const botContoller = require('../../controllers/bot/botContoller');

const router = require('express').Router();

//****BOTS****
router.get('/', botContoller.bots);

module.exports = { botRouter: router };
