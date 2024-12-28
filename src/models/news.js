const { mongoose } = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    url: { type: String },
    link: { type: String },
    image: { type: String },
    slug: { type: String },
    date: { type: String },
    score: { type: Number, default: 0 },
    latlng: [{ type: String }],
    country: [{ type: String }],
    en: {
      Title: { type: String },
      Body: { type: String },
      TooMuchBody: { type: String },
      Subject: { type: String },
      Date: { type: String },
    },
    fa: {
      Title: { type: String },
      Body: { type: String },
      TooMuchBody: { type: String },
      Subject: { type: String },
      Date: { type: String },
    },
  },
  { timestamps: true }
);

const newsModel = mongoose.model('News', newsSchema);
module.exports = { newsModel };
