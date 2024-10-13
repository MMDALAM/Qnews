const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const {PORT} = process.env;
const {MONGODBURL} = process.env;
const createError = require("http-errors");
const { AllRouters } = require("./routers/router");


module.exports = class Application{
    constructor(){
        this.configServer()
        this.createServer()
        this.createMongodb()
        this.createRoutes()
        this.errorHandler()
    }

    configServer(){
        app.use(cors())
        app.use(express.urlencoded({extended:true}));
        app.use(express.json({ limit: '1024mb' }));
    }

    createServer(){
        const server = http.createServer(app)
        server.listen(PORT,()=>console.log(`server run to PORT : ${PORT}`))
    }

    createMongodb(){
        mongoose.connect(MONGODBURL);
        mongoose.set("strictPopulate", true);
        mongoose.set("strictQuery", true);
        mongoose.connection.on('connected', () => console.log(`connect to mongodb `))
        mongoose.connection.on('desconnected', () => console.log(`desconnect to mongodb `))
    }

    createRoutes() {
        app.use(AllRouters);
      }

    errorHandler(){    
        app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر پیدا نشد"));
        });
        app.use((error,req,res,next)=> {
            const message = error.message || "";
            const status = error.status || 404;
            return res.status(status).json({ errors:message });
        })
    }
}