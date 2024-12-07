const date = new Date();
date.setDate(date.getDate() - 1);
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const { newsModel } = require('../../models/news');
const axios = require('axios');
const { alertAndBack } = require('../../utils/function');

exports.home = async (req, res, next) => {
  try {
    return res.render('home/home');
  } catch (error) {
    next(error);
  }
};

exports.allNews = async (req, res, next) => {
  try {
    const date = `${year}/${month}/${day < 10 ? `0${day}` : day}`;
    const news = await newsModel.find({ date });

    return res.render('home/allNews', { date, news });
  } catch (error) {
    next(error);
  }
};

exports.editNews = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const news = await newsModel.findOne({ slug });

    await axios
      .get('http://localhost:3001/v1/botQnewsCountri', {
        headers: {
          'x-token-manager': '',
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });

    return res.render('home/editNews', { news });
  } catch (error) {
    next(error);
  }
};

exports.api = async (req, res, next) => {
  try {
    let en = {};
    en.TitleEN = req.body.TitleEN;
    en.SummaryEN = req.body.SummaryEN;
    en.DateEN = req.body.DateEN;
    en.CountryEN = req.body.CountryEN;
    en.SubjectEN = req.body.SubjectEN;

    let fa = {};
    fa.TitleFA = req.body.TitleFA;
    fa.SummaryFA = req.body.SummaryFA;
    fa.DateFA = req.body.DateFA;
    fa.CountryFA = req.body.CountryFA;
    fa.SubjectFA = req.body.SubjectFA;

    const data = {
      url: req.body.link,
      img: req.body.image,
      Score: req.body.Score,
      date: req.body.DateEN,
      en,
      fa,
    };

    await axios
      .post('http://localhost:3001/v1/botQnews', data, {
        headers: {
          'x-token-manager': '',
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });

    return alertAndBack(req, res, '/allNews', {
      title: ' انجام شد ',
      message: ' خبر مورد نظر شما برای ذخیره سازی در سرور ارسال شد',
      icon: 'success',
      button: 'بسیار خب',
    });
  } catch (error) {
    next(error);
  }
};
