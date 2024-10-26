const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate() - 3;
const randomstring = require('randomstring');
const baseUrl = `https://thequantuminsider.com/2024/10/11/open-quantum-institute-details-quantum-computing-solutions-for-global-challenges-from-food-security-to-climate/`;
const API_KEY = "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"

// API Key خود را اینجا قرار دهید

// تابعی برای ارسال پیام به ChatGPT API
async function sendToChatGPT(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
  }
}


async function processNews(url) {
  const message = `
  لینک خبر : ${url}
    عنوان
    متن
    تاریخ
    کشور
    نتیجه رو یک json برگردان.
  `;

  const result = await sendToChatGPT(message);
  let randomstrings = randomstring.generate(7);
  return  fs.writeFileSync(`${randomstrings}.json`, result, null, 2);
}

// تست با یک لینک خبر
processNews(baseUrl);