import { user } from "modules/user.js";

// Function to initialize Flatpickr & handle date selection
export function initDatePicker(inputSelector, displaySelector) {
    flatpickr(inputSelector, { 
        mode: "range",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr) {
            user.setDates(dateStr); // Store in User class
            document.querySelector(displaySelector).innerText = 
                dateStr.length > 0 ? `Selected Dates: ${dateStr}` : "No dates selected";
            console.log("User's selected dates (stored in module):", user.dates);
        }
    });
}