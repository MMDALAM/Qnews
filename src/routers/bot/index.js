const router = require('express').Router();
const { bots } = require('../../controllers/botContoller');

//****BOTS****  
router.get('/',bots)

module.exports = { botRouter :router }