const { newsModel } = require("../models/news")
const axios = require('axios');
const cheerio = require('cheerio');
exports.bots = async (req,res,next)=>{
    try {
                // URL صفحه مورد نظر
                const url = 'https://thequantuminsider.com/wp-content/uploads/2024/10/2024-Q3-TQI-Quarterly-Report-vF-1.pdf'; // جایگزین با URL مناسب

                // بارگیری HTML
                const { data } = await axios.get(url);
                
                // بارگیری محتوا با Cheerios
                const load = cheerio.load(data);
        
                // استخراج عنوان
                const title = load('h1').text();
                const text = load('p').text();
        
                // // استخراج متن
                // const paragraphs = [];

                // load('p').each((i, elem) => {
                //     paragraphs.push(load(elem).text().trim());
                // });
        
                // // ترکیب متن
                // const resultText = paragraphs.join('\n\n');
        
                // نمایش نتایج
                console.log('Title:', title);
                console.log('Content:\n', text);

                //بازگشت 
                return res.status(200).json({text})
        
    
    } catch (error) {
        next(error)
    }
}



// async function scrapeNews(url) {
//        const { data } = await axios.get(url);
//        const news = cheerio.load(data);

//        return data;
 
//        // بسته به ساختار HTML صفحه، سلکتورهای مناسب را بگذارید
//        const title = $('h1').text();  // تایتل
//        const subject = $('.subject').text();  // موضوع
//        const images = [];  // آرایه‌ای برای ذخیره عکس‌ها
//        $('.image-class img').each((i, elem) => {  // سلکتور برای عکس‌ها
//           images.push($(elem).attr('src'));
//        });
//        const date = $('.date-class').text();  // تاریخ
//        const text  =$('.elementor-widget-container').text(); 

//        const d = {title, text, subject, images, date}

//        return d;

//        // ذخیره داده‌ها در MongoDB
//     //    const newsItem = new News({ title, subject, images, date });
//     //    await newsItem.save();
//  }
