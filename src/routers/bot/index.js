const router = require('express').Router();
const { bots, saveBotEN, saveBotFA } = require('../../controllers/botContoller');

//****BOTS****
router.get('/', bots);
router.get('/saveEN', saveBotEN);
router.get('/saveFA', saveBotFA);

module.exports = { botRouter: router };
