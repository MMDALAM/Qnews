const { mongoose } = require("mongoose");

const newsSchema =  new mongoose.Schema({
    title: String,
    subject: String,
    images: [String],
    date: String
});

const newsModel =  mongoose.model('News', newsSchema);
module.exports = { newsModel }