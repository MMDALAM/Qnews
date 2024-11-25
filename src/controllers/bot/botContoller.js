const { fetchArticles, sendLinkNews } = require('../../utils/function');

exports.bots = async (req, res, next) => {
  try {
    await sendLinkNews(fetchArticles(res));
    return res.render('home/extraction');
  } catch (error) {
    next(error);
  }
};
