const puppeteer = require('puppeteer');

async function generatePdf(htmlPath, pdfPath) {
    const browser = await puppeteer.launch({ headless: true }); // Run in headless mode (no browser window)
    const page = await browser.newPage();

    try {
        await page.goto(htmlPath, { waitUntil: 'networkidle0' }); // Wait for the page to load
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

        console.log(`PDF generated successfully: ${pdfPath}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        await browser.close();
    }
}

/*
Example usage:
const targetUrl = 'https://www.example.com'; // Replace with the URL of the webpage
const pdfOutput = 'example.pdf'; // Replace with the desired path for the PDF
generatePdf(targetUrl, pdfOutput);
*/

const fs = require('fs');
const { JSDOM } = require('jsdom');

function checkBodyClass(htmlPath, className) {
  try {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    return body.classList.contains(className);
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return false;
  }
}

/*
Example usage:
const filePath = 'path/to/your/file.html';
const classNameToCheck = 'my-class';

const hasClass = checkBodyClass(filePath, classNameToCheck);

if (hasClass) {
  console.log(`The body element has the class "${classNameToCheck}".`);
} else {
  console.log(`The body element does not have the class "${classNameToCheck}".`);
}
*/

function savePDF(htmlPath, pdfPath, className) {
    //Steps to take:
        //1: Check that the HTML page has the given class in its body using checkBodyClass function.
            //1.A: If it does, continue to step 2.
            //1.B: If it does not, then inform the user they are attempting to use the function incorrectly and return
        //2:Attempt to generate the pdf using the generatePdf function
            //2.A: If it succeeds then inform the user and return
            //2.B: If it fails then catch the error and inform the user
}