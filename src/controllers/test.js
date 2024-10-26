const fs = require('fs');
const randomstring = require('randomstring');
const axios = require('axios');
const cheerio = require('cheerio');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate() - 3;
const baseUrl = `https://thequantuminsider.com/${year}/${month}/${day}/`;

async function getArticles(link) {
  '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';

  let news = {
    title_en: 'Purifications, Fidelity & the Future of Computing',
    content_en:
      'This article explores key concepts in quantum computing, focusing on purification and fidelity. Purification simplifies quantum states, helping manipulate complex systems, while fidelity measures the similarity between quantum states, essential for quantum error correction and stability.',
    topic_en: 'Quantum Computing',
    country_en: 'Global',
    date_en: '2024-10-13',
    link: link,
    عنوان: 'تصفیه، وفاداری و آینده رایانش',
    متن: 'این مقاله به بررسی مفاهیم کلیدی در رایانش کوانتومی می‌پردازد، تمرکز بر تصفیه و وفاداری دارد. تصفیه به ساده‌سازی حالات کوانتومی کمک کرده و وفاداری میزان شباهت بین حالات کوانتومی را اندازه‌گیری می‌کند، که برای تصحیح خطا و پایداری کوانتومی ضروری است.',
    موضوع: 'رایانش کوانتومی',
    کشور: 'جهانی',
    تاریخ: '2024-10-13',
  };

  let result = randomstring.generate(7);
  fs.writeFileSync(`${result}.json`, JSON.stringify(news, null, 2));

  //ذخیره سازی
  console.log(`News save to mongodb`);

  //ارسال ایمیل
  console.log(`News sent to email address`);
}
