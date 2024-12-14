const { newsModel } = require('../../models/news');
const { fetchArticles, sendLinkNews } = require('../../utils/function');

exports.botToday = async (req, res, next) => {
  try {
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dataFull = `${year}/${month}/${day < 10 ? `0${day}` : day}`;
    // const news = await newsModel.find({ date :dataFull });
    // // if (news.length) return res.redirect('/allNews');

    await sendLinkNews(fetchArticles(dataFull), res, dataFull);
    return res.render('home/extraction');
  } catch (error) {
    next(error);
  }
};

exports.botYesterday = async (req, res, next) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dataFull = `${year}/${month}/${day < 10 ? `0${day}` : day}`;
    const news = await newsModel.find({ date: dataFull });
    if (news.length) return res.redirect('/allNews');

    await sendLinkNews(fetchArticles(dataFull), res, dataFull);
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
