const { newsModel } = require('../../models/news');
const { fetchArticles, sendLinkNews } = require('../../utils/function');
const date = new Date();
date.setDate(date.getDate() - 1);
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

exports.bots = async (req, res, next) => {
  try {
    const date = `${year}/${month}/${day}`;
    const news = await newsModel.find({ date });
    if (news.length) return res.redirect('/allNews');
    await sendLinkNews(fetchArticles(res), res);
    return res.render('home/extraction');
  } catch (error) {
    next(error);
  }
};

exports.noting = async (req, res, next) => {
  try {
    return res.render('home/noting');
  } catch (error) {
    next(error);
  }
};
