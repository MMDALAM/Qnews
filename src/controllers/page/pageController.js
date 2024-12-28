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
    if (req.header('Referer').substring(21) == '/bot/Today') {
      const dates = new Date();
      dates.setDate(dates.getDate());
      const year = dates.getFullYear();
      const month = dates.getMonth() + 1;
      const day = dates.getDate();
      const date = `${year}/${month}/${day < 10 ? `0${day}` : day}`;
      const news = await newsModel.find({ date });
      return res.render('home/allNews', { date, news });
    } else {
      const dates = new Date();
      dates.setDate(dates.getDate() - 1);
      const year = dates.getFullYear();
      const month = dates.getMonth() + 1;
      const day = dates.getDate();
      const date = `${year}/${month}/${day < 10 ? `0${day}` : day}`;
      const news = await newsModel.find({ date });
      return res.render('home/allNews', { date, news });
    }
  } catch (error) {
    next(error);
  }
};

exports.editNews = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const news = await newsModel.findOne({ slug });

    const country = await axios.get('https://api.psiket.com/v1/botQnewsCountri', {
      headers: {
        'x-token-manager':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoSWRBdXRoIjoiMmIxODM1YWI5ZmQ3MGQ1NTk1ZmFhNTJkMGM1YjBjMGUiLCJpYXQiOjE3MjgzODMyMDN9.VTsHS0NKAzkv6YvSSRnzBb7GVOUh9RlBb2Ha8X_Zmvo',
        'Content-Type': 'application/json',
      },
    });
    const countries = country.data;

    return res.render('home/editNews', { news, countries });
  } catch (error) {
    next(error);
  }
};

exports.api = async (req, res, next) => {
  try {
    const country = await axios.get('https://api.psiket.com/v1/botQnewsCountri', {
      headers: {
        'x-token-manager':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoSWRBdXRoIjoiMmIxODM1YWI5ZmQ3MGQ1NTk1ZmFhNTJkMGM1YjBjMGUiLCJpYXQiOjE3MjgzODMyMDN9.VTsHS0NKAzkv6YvSSRnzBb7GVOUh9RlBb2Ha8X_Zmvo',
        'Content-Type': 'application/json',
      },
    });
    const countries = country.data;

    const countryNames = [req.body.Country1, req.body.Country2, req.body.Country3];

    let countrys = [];
    let latlng = [];

    countryNames
      .filter((name) => name)
      .forEach((name) => {
        const foundCountry = countries.data.find((country) => country.name === name);
        if (foundCountry) {
          countrys.push(foundCountry.name);
          latlng.push(foundCountry.latlng);
        }
      });

    let en = {};
    en.TitleEN = req.body.TitleEN;
    en.BodyEN = req.body.BodyEN;
    en.TextFullEN = req.body.TextFullEN;
    en.DateEN = req.body.DateEN;
    en.SubjectEN = req.body.SubjectEN;

    let fa = {};
    fa.TitleFA = req.body.TitleFA;
    fa.BodyFA = req.body.BodyFA;
    fa.TextFullFA = req.body.TextFullFA;
    fa.DateFA = req.body.DateFA;
    fa.SubjectFA = req.body.SubjectFA;

    const data = {
      url: req.body.link,
      img: req.body.image,
      score: req.body.Score,
      date: req.body.DateEN,
      country: countrys,
      latlng: latlng,
      en,
      fa,
    };

    await axios
      .post('http://localhost:3001/v1/botQnews', data, {
        headers: {
          'x-token-manager':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoSWRBdXRoIjoiMmIxODM1YWI5ZmQ3MGQ1NTk1ZmFhNTJkMGM1YjBjMGUiLCJpYXQiOjE3MjgzODMyMDN9.VTsHS0NKAzkv6YvSSRnzBb7GVOUh9RlBb2Ha8X_Zmvo',
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
