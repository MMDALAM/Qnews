const fs = require('fs');
const { fetchArticles, sendLinkNews } = require('../utils/function');

exports.bots = async (req, res, next) => {
  try {
    await sendLinkNews(fetchArticles(res));
    return res.status(200).json('فایل اخبار ساخته شدند');
  } catch (error) {
    next(error);
  }
};

exports.saveBot = async (req, res, next) => {
  try {
    // خواندن فایل JSON
    fs.readFile('files/FvGZnMa.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

<<<<<<< HEAD
      // پارس کردن داده‌ها به آبجکت جاوا اسکریپت
      const jsonData = JSON.parse(data);
=======
                //بازگشت 
                return res.status(200).json({text})
        
    
    } catch (error) {
        next(error)
    }
}
>>>>>>> c831b175421679738cbb712eea99f95683a35d15

      // دسترسی به آبجکت 'en'
      const enData = jsonData.en;

      console.log(enData);
    });

    // const news = req.body;
    // news.date = new Date();
    // const newsModel = new News(news);
    // await newsModel.save();
    // return res.json(newsModel);
  } catch (error) {
    next(error);
  }
};
