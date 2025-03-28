/* 
Testing Plan:
    Correct: A URL to a plan on our webpage
    Incorrect: A non URL element, such as a string
    Edge: A URL which links to a different part of our site
    Boundary: A URL to a different / nonexistant site
*/

const PdfSaver = require('../js/PdfSaving');
const { describe, test, expect } = require('@jest/globals');

describe('PdfSaving', () => {
    test('Test that a PDF is generated when a URL to a travel plan is given', async () => { //Correct use case
        const correctURL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/PdfSaving_Test_Plan_Correct.html';
        const output = 'pdfs/TravelPlan.pdf';
        let generator1 = new PdfSaver(correctURL, output);
        const result = await generator1.generatePdf();
        expect(result).toBe(`PDF generated successfully: ${output}`);
    });

    test('Test that the user can not save non-html elements', async () => { //Incorrect use case
        const incorrectElement = '7';
        const output = '../pdfs/TravelPlan.pdf';
        let generator2 = new PdfSaver(incorrectElement, output);
        const result = await generator2.generatePdf();
        expect(result).toBe("That's not a valid travel plan!");
    });

    test('Test that a PDF is not created when a URL to a different part of our site is used', async () => { //Edge Case Use
        const URL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/tests/PdfSaving_Test_Plan_Edge.html';
        const output = '../pdfs/TravelPlan.pdf';
        let generator3 = new PdfSaver(URL, output);
        const result = await generator3.generatePdf();
        expect(result).toBe("That's not a valid travel plan!");
    });

    test('Test that no PDF is generated when given a URL to a different site', async () => { //Boundry Case Use
        const URL = 'https://www.example.com/';
        const output = '../pdfs/TravelPlan.pdf';
        let generator4 = new PdfSaver(URL, output);
        const result = await generator4.generatePdf();
        expect(result).toBe("That's not a valid travel plan!");
    });

    test('Test that no PDF is generated when given a URL that does not exist', async () => { //Boundry Case Use
        const URL = 'https://www.TotallyRealWebsite.com'
        const output = '../pdfs/TravelPlan.pdf';
        let generator5 = new PdfSaver(URL, output);
        const result = await generator5.generatePdf();
        expect(result).toBe("That's not a valid travel plan!");
    });
});