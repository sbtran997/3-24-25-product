const puppeteer = require('puppeteer');

async function generatePdf(url, pdfPath) {
    const browser = await puppeteer.launch({ headless: true }); // Run in headless mode (no browser window)
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0' }); // Wait for the page to load
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

const https = require('https');
const { JSDOM } = require('jsdom');

async function checkBodyClass(url, className) {
  try {
    const response = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
        res.on('error', (error) => {
          reject(error);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });

    const dom = new JSDOM(response);
    const body = dom.window.document.body;
    return body.classList.contains(className);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

/*
// Example usage:
const url = 'https://www.example.com/';
const classNameToCheck = 'my-class';

checkBodyClass(url, classNameToCheck)
  .then(hasClass => {
    console.log(`Body has class ${classNameToCheck}:`, hasClass);
  });
*/

function savePdf(url, pdfPath, className) {
    //Steps to take:
        //1: Check that the HTML page has the given class in its body using checkBodyClass function.
            //1.A: If it does, continue to step 2.
            //1.B: If it does not, then inform the user they are attempting to use the function incorrectly and return
        //2:Attempt to generate the pdf using the generatePdf function
            //2.A: If it succeeds then inform the user and return
            //2.B: If it fails then catch the error and inform the user
}

const url = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/tests/PdfSaving_Test_Plan_Correct.html';
const classNameToCheck = 'Travel Plan';

checkBodyClass(url, classNameToCheck)
  .then(hasClass => {
    console.log(`Body has class ${classNameToCheck}:`, hasClass);
  });

const pdfOutput = 'example.pdf'; // Replace with the desired path for the PDF
generatePdf(url, pdfOutput);