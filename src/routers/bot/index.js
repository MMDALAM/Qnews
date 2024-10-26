const router = require('express').Router();
const { bots, saveBot } = require('../../controllers/botContoller');

//****BOTS****  
router.get('/',bots)
router.get('/saveBot',saveBot)

module.exports = { botRouter :router }