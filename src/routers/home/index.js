const pageController = require('../../controllers/page/pageController');

const router = require('express').Router();

//****BOTS****
router.get('/', pageController.home);
router.get('/allNews', pageController.allNews);
router.get('/editNews/:slug', pageController.editNews);
router.post('/api', pageController.api);

module.exports = { homeRouter: router };
