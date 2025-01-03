const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const { PORT } = process.env;
const { MONGODBURL } = process.env;
const createError = require('http-errors');
const { AllRouters } = require('./routers/router');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const Helpers = require('./Helpers');
const session = require('express-session');
// const cookieParser = require('cookie-parser');

module.exports = class Application {
  constructor() {
    this.configServer();
    this.createServer();
    this.createMongodb();
    this.createRoutes();
    this.errorHandler();
  }

  configServer() {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '1024mb' }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.set('views', path.resolve('./resource/views'));
    app.use(expressLayouts);
    app.set('layout extractScripts', true);
    app.set('layout extractStyles', true);
    app.set('layout', 'home/master');
    app.use(flash());
    // app.use(cookieParser());
    app.use(
      session({
        secret: 'یک رشته رندوم و امن برای رمزنگاری',
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  createServer() {
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`server run to PORT : ${PORT}`));
  }

  createMongodb() {
    mongoose.connect(MONGODBURL);
    mongoose.set('strictPopulate', true);
    mongoose.set('strictQuery', true);
    mongoose.connection.on('connected', () => console.log(`connect to mongodb `));
    mongoose.connection.on('desconnected', () => console.log(`desconnect to mongodb `));
  }

  createRoutes() {
    app.use(AllRouters);
  }

  errorHandler() {
    app.use((req, res, next) => {
      next(createError.NotFound('آدرس مورد نظر پیدا نشد'));
    });
    app.use((error, req, res, next) => {
      const message = error.message || '';
      const status = error.status || 404;
      return res.status(status).json({ errors: message });
    });
  }
};
