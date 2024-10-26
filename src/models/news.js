const { mongoose } = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    link: String,
    image: String,
    TitleEn: String,
    SummaryEn: String,
    SubjectEn: String,
    CountryEn: String,
    Title: String,
    Summary: String,
    Subject: String,
    Country: String,
  },
  { timestamps: true }
);

const newsModel = mongoose.model('News', newsSchema);
module.exports = { newsModel };
