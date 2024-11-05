const { mongoose } = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    url: { type: String },
    news: [{ type: String }],
    date: { type: String },
    path: { type: String },
  },
  { timestamps: true }
);

const newsModel = mongoose.model('News', newsSchema);
module.exports = { newsModel };
