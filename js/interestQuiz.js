document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submit-quiz");
    const continueBtn = document.getElementById("continue-btn");
    const checkboxes = document.querySelectorAll("input[name='interest']");
    const budgetInput = document.getElementById("budgetInput");
    const display = document.getElementById("selections-display");
    
    // Update display when inputs change
    function updateDisplay() {
        let selected = [];
        checkboxes.forEach(cb => {
            if(cb.checked) selected.push(cb.value);
        });
        
        const budget = budgetInput.value || "Not specified";
        display.value = `Selected Interests:\n${selected.join(", ") || "None"}\n\nBudget: $${budget}`;
    }
    
    // Set up event listeners
    checkboxes.forEach(cb => cb.addEventListener("change", updateDisplay));
    budgetInput.addEventListener("input", updateDisplay);
    
    // Load saved preferences
    const savedInterests = JSON.parse(localStorage.getItem("interests")) || [];
    checkboxes.forEach(cb => {
        cb.checked = savedInterests.includes(cb.value);
    });
    updateDisplay();
    
    // Submit handler
    submitBtn.addEventListener("click", function() {
        let selectedInterests = [];
        document.querySelectorAll("input[name='interest']:checked").forEach(cb => {
            selectedInterests.push(cb.value);
        });
        
        if(selectedInterests.length > 0) {
            localStorage.setItem("interests", JSON.stringify(selectedInterests));
            localStorage.setItem("travelBudget", budgetInput.value || "500");
            updateDisplay();
            alert("Thanks! We'll personalize your experience.");
        } else {
            alert("Please select at least one interest.");
        }
    });
    
    // Continue button handler
    continueBtn.addEventListener("click", function() {
        window.location.href = "map.html";
    });
});
