async function generatePdf(url, pdfPath) {
    if (url.startsWith('https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages')) {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({ headless: true }); // Run in headless mode (no browser window)
        const page = await browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle0' }); // Wait for the page to load
            await page.evaluate(() => {
              const links = document.querySelectorAll('a');
              links.forEach(link => link.removeAttribute('href')); // Remove each <a> element
            });
            const pdf = await page.pdf({
                path: pdfPath, // Save the PDF to this path
                format: 'A4',  // Optional: Set the page format (e.g., 'A4', 'Letter')
                margin: { // Optional: Set margins
                     top: '1cm',
                     right: '1cm',
                     bottom: '1cm',
                     left: '1cm'
                 }
            });
            //console.log(`PDF generated successfully: ${pdfPath}`);
            return `PDF generated successfully: ${pdfPath}`;
        } catch (error) {
            //console.error('Error generating PDF:', error);
            return 'Error generating PDF!'
        } finally {
            await browser.close();
        }
    } else {
        return "That's not a valid travel plan!";
    }
}

module.exports = generatePdf;

/*
Example usage:
const targetUrl = 'https://www.example.com'; // Replace with the URL of the webpage
const pdfOutput = 'example.pdf'; // Replace with the desired path for the PDF
generatePdf(targetUrl, pdfOutput);
*/

/*
Manual Testing Code:
const url = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/plans.html?';
const pdfOutput = 'example.pdf'; // Replace with the desired path for the PDF
console.log(url.startsWith('https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages'))
generatePdf(url, pdfOutput);
*/