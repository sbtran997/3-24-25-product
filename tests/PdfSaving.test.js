/* 
Testing Plan:
    Correct: A URL to a plan on our webpage
    Incorrect: A non URL element, such as a string
    Edge: A URL which links to a different part of our site
    Boundary: A URL to a different / nonexistant site
*/

const PdfSaving = require('../js/PdfSaving');
const { describe, test, expect } = require('@jest/globals');

describe('PdfSaving', () => {
    test('Test that a PDF is generated when a URL to a travel plan is given', () => { //Correct use case
        const correctURL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/pages/PdfSaving_Test_Plan_Correct.html';
        const output = 'TravelPlan.pdf'
        expect(PdfSaving(correctURL, output)).toBe(`PDF generated successfully: ${output}`);
    });

    test('Test that the user can not save non-html elements', () => { //Incorrect use case
        const incorrectElement = '7';
        const output = 'TravelPlan.pdf';
        expect(PdfSaving(incorrectElement, output)).toBe("That's not a valid travel plan!");
    });

    test('Test that a PDF is not created when a URL to a different part of our site is used', () => { //Edge Case Use
        const URL = 'https://odinsean.github.io/SoftwareGroupN_CS3203_SPRING2025/tests/PdfSaving_Test_Plan_Edge.html';
        const output = 'TravelPlan.pdf';
        expect().toBe("That's not a valid travel plan!");
    });

    test('Test that no PDF is generated when given a URL to a different site', () => { //Boundry Case Use
        const URL = 'https://www.example.com/';
        const output = 'TravelPlan.pdf';
        expect().toBe("That's not a valid travel plan!");
    });

    test('Test that no PDF is generated when given a URL that does not exist', () => { //Boundry Case Use
        const URL = 'https://www.TotallyRealWebsite.com'
        const output = 'TravelPlan.pdf';
        expect().toBe("That's not a valid travel plan!");
    });
});