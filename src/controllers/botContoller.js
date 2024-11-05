const { fetchArticles, sendLinkNews } = require('../utils/function');

exports.bots = async (req, res, next) => {
  try {
    await sendLinkNews(fetchArticles(res));
    return res.status(200).json('فایل اخبار ساخته شدند');
  } catch (error) {
    next(error);
  }
};

exports.saveBotEN = async (req, res, next) => {
  try {
    const fs = require('fs');
    const path = require('path');

    // مسیر فایل JSON ورودی و فایل HTML خروجی
    const inputJson = path.join(__dirname, '..', '..', 'files', '2024', '11', '4', 'k4me0PN.json');
    const outputHtml = path.join(__dirname, '..', 'newsEN.html');

    // خواندن فایل JSON
    fs.readFile(inputJson, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the JSON file:', err);
        return;
      }

      // تبدیل JSON به یک آبجکت جاوا اسکریپت
      const jsonData = JSON.parse(data);

      // داده‌ها را از JSON استخراج می‌کنیم
      const { link, Image, en } = jsonData;
      const title = en.Title || 'No title';
      const summary = en.Summary || 'No summary';
      const subject = en.Subject || 'No subject';
      const date = en.Date || 'No date';
      const country = en.Country || 'No country';

      // ساختار HTML
      const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .news-item { max-width: 800px; margin: 0 auto; }
            .news-item h1 { font-size: 1.8em; color: #333; }
            .news-item .date, .news-item .country { color: #888; font-size: 0.9em; margin-bottom: 5px; }
            .news-item .image { margin: 15px 0; }
            .news-item img { max-width: 80%; height: 75%; }
            .news-item p { color: #000; font-size: 1.5em; line-height: 1.6; }
            .news-item a { color: #0066cc; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="news-item">
            <h1>${title}</h1>
            <div class="date">${date}</div>
            <div class="country">${country}</div>
            <div class="subject"> ${subject}</div>
            <div class="image">
                <img src="${Image}"  alt="News Image">
            </div>
            <p>${summary}</p>
            <p><a href="${link}" target="_blank">Read more</a></p>
        </div>
    </body>
    </html>`;

      // نوشتن محتوای HTML به فایل خروجی
      fs.writeFile(outputHtml, htmlContent, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing the HTML file:', err);
          return;
        }
        console.log('HTML file created successfully at:', outputHtml);
      });
    });
    return res.status(200).json('فایل HTML ساخته شد');
  } catch (error) {
    next(error);
  }
};

exports.saveBotFA = async (req, res, next) => {
  try {
    const fs = require('fs');
    const path = require('path');

    // مسیر فایل JSON ورودی و فایل HTML خروجی
    const inputJson = path.join(__dirname, '..', '..', 'files', '2024', '11', '4', 'k4me0PN.json');
    const outputHtml = path.join(__dirname, '..', 'newsFA.html');

    // خواندن فایل JSON
    fs.readFile(inputJson, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the JSON file:', err);
        return;
      }

      // تبدیل JSON به یک آبجکت جاوا اسکریپت
      const jsonData = JSON.parse(data);

      // داده‌ها را از JSON استخراج می‌کنیم
      const { link, Image, fa } = jsonData;
      const title = fa.Title || 'No title';
      const summary = fa.Summary || 'No summary';
      const subject = fa.Subject || 'No subject';
      const date = fa.Date || 'No date';
      const country = fa.Country || 'No country';

      // ساختار HTML
      const htmlContent = `
    <!DOCTYPE html>
    <html lang="fa">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px;text-align: right;}
            .news-item { max-width: 800px; margin: 0 auto; }
            .news-item h1 { font-size: 1.8em; color: #333; }
            .news-item .date, .news-item .country { color: #888; font-size: 0.9em; margin-bottom: 5px; }
            .news-item .image { margin: 15px 0; }
            .news-item img { max-width: 80%; height: 75%; }
            .news-item p { color: #000; font-size: 1.5em; line-height: 1.6; }
            .news-item a { color: #0066cc; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="news-item">
            <h1>${title}</h1>
            <div class="date">${date}</div>
            <div class="country">${country}</div>
            <div class="subject"> ${subject}</div>
            <div class="image">
                <img src="${Image}" alt="News Image">
            </div>
            <p>${summary}</p>
            <p><a href="${link}" target="_blank"> ادامه مطلب </a></p>
        </div>
    </body>
    </html>`;

      // نوشتن محتوای HTML به فایل خروجی
      fs.writeFile(outputHtml, htmlContent, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing the HTML file:', err);
          return;
        }
        console.log('HTML file created successfully at:', outputHtml);
      });
    });
    return res.status(200).json('فایل HTML ساخته شد');
  } catch (error) {
    next(error);
  }
};
