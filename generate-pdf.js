const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const filePath = 'file:///' + path.resolve('cv.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    await page.pdf({
        path: 'CV-Yolanda-Aparicio-Gimenez.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log('PDF generado: CV-Yolanda-Aparicio-Gimenez.pdf');
    await browser.close();
})();
