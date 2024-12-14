const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const randomstring = require('randomstring');
const { newsModel } = require('../models/news');
const baseUrl = 'https://thequantuminsider.com/category/daily/';
const API_KEY =
  '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';

async function sendToChatGPT(message) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
  }
}

async function processNews(url, dataFull) {
  const img = await getImg(url);

  const message = `
          نمونه دریافت اطلاعات خبر    
          data = { 
          link: ${url},
          Image: ${img},
          en : {
          "Title": "",
          "Body": "",
          "TooMuchBody": "",
          "Subject": "",
          "Date": "تاریخ میلادی",
          "Country": ""
          }
          fa : {
          "Title": "",
          "Body": "",
          "TooMuchBody": "",
          "Subject": "",
          "Date": "تاریخ شمسی",
          "Country": ""
          }
           json دقیقا در همین قالب به دو زبان en , fa برگردانید.
           با ویراستار اخباری
           لطفا هیچ متن توضیح یا کامنتی اضافه ای قرار نده
           لطفا TooMuchBody بیشتر از 2000 کاراکتر بده
          `;

  const result = await sendToChatGPT(message);
  let randomstrings = randomstring.generate(7);

  const $ = result.replace(/```/g, '');
  const news = $.replace(/json/g, '');

  // fs.writeFileSync(`${directory(year, month, day)}/${randomstrings}.json`, news, null, 2);

  const data = JSON.parse(news);

  const newNews = new newsModel({
    slug: randomstrings,
    link: data.link,
    image: data.Image,
    date: dataFull,
    en: data.en,
    fa: data.fa,
  });
  await newNews.save();

  return news;
}

async function sendLinkNews(link, res, dataFull) {
  const links = await link;

  if (!links.length) return res.redirect('/bot/noting');

  let i = 0;
  function printLink() {
    if (i < links.length) {
      processNews(links[i], dataFull);
      console.log(links[i]);
      i++;
      setTimeout(printLink, 10000);
    }
  }

  printLink();
}

async function getImg(url) {
  try {
    const response = await axios.get(url);
    const html = cheerio.load(response.data);

    // یافتن متا تگ og:image
    const specificImgTag = html('meta[property="og:image"]').attr('content');

    // بازگرداندن لینک عکس
    return specificImgTag;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

async function fetchArticles(dataFull) {
  try {
    const response = await axios.get(baseUrl);
    const html = cheerio.load(response.data);
    const articleLinksSet = new Set();

    html('a').each((index, element) => {
      const link = html(element).attr('href');
      if (link && link.includes(dataFull)) {
        articleLinksSet.add(link);
      }
    });

    const articleLinks = Array.from(articleLinksSet);

    return articleLinks;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

async function alertAndBack(req, res, url, data) {
  let title = data.title || '',
    message = data.message || '',
    icon = data.icon || 'info',
    button = data.button || null,
    timer = data.timer || 2500;

  req.flash('sweetalert', { title, message, icon, button, timer });
  return res.redirect(url);
}

module.exports = { sendToChatGPT, processNews, sendLinkNews, fetchArticles, alertAndBack };
