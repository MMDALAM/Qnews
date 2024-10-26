const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const createError = require('http-errors');
const randomstring = require('randomstring');
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

async function processNews(url) {
  const img = await getImg(url);

  const message = `
          نمونه اطلاعات خبر
          data = { 
          link: ${url},
          Image: ${img},
          en : {
          "Title": "",
          "Summary": "",
          "Subject": "",
          "Date": "تاریخ میلادی",
          "Country": ""
          }
          fa : {
          "Title": "",
          "Summary": "",
          "Subject": "",
          "Date": "تاریخ شمسی",
          "Country": ""
          }
           json دقیقا در همین قالب به دو زبان en , fa برگردانید.
           لطفا هیچ متن توضیح یا کامنتی قرار نده
          `;

  const result = await sendToChatGPT(message);
  let randomstrings = randomstring.generate(7);
  const $ = result.replace(/```/g, '');
  const news = $.replace(/json/g, '');

  fs.writeFileSync(`files/${randomstrings}.json`, news, null, 2);

  return news;
}

async function sendLinkNews(link) {
  const links = await link;

  if (!links.length) throw createError.NotFound('هیج خبری در این تاریخ پیدا نشد');

  let i = 0;
  function printLink() {
    if (i < links.length) {
      processNews(links[i]);
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

    const specificImgTag = html('div.elementor-widget-container img.attachment-full').first();

    // بازگرداندن لینک عکس
    return specificImgTag.attr('src');
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

async function fetchArticles(res) {
  try {
    const response = await axios.get(baseUrl);
    const html = cheerio.load(response.data);
    const articleLinksSet = new Set();

    html('a').each((index, element) => {
      const link = html(element).attr('href');
      if (link && link.includes(`/${year}/${month}/${day}`)) {
        articleLinksSet.add(link);
      }
    });

    const articleLinks = Array.from(articleLinksSet);

    return articleLinks;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

module.exports = { sendToChatGPT, processNews, sendLinkNews, fetchArticles };
