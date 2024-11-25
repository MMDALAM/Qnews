const homeController = require('../../controllers/page/pageController');

const router = require('express').Router();

//****BOTS****
router.get('/', homeController.home);

module.exports = { homeRouter: router };
