const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate() - 2;
const path = require('path');

exports.home = async (req, res, next) => {
  try {
    return res.render('home/home');
  } catch (error) {
    next(error);
  }
};
