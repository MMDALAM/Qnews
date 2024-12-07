const { mongoose } = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    url: { type: String },
    link: { type: String },
    image: { type: String },
    slug: { type: String },
    date: { type: String },
    Score: { type: Number, default: 0 },
    en: {
      Title: { type: String },
      Body: { type: String },
      TooMuchBody: { type: String },
      Subject: { type: String },
      Date: { type: String },
      Country: { type: String },
    },
    fa: {
      Title: { type: String },
      Body: { type: String },
      TooMuchBody: { type: String },
      Subject: { type: String },
      Date: { type: String },
      Country: { type: String },
    },
  },
  { timestamps: true }
);

const newsModel = mongoose.model('News', newsSchema);
module.exports = { newsModel };
