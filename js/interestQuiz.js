document.addEventListener("DOMContentLoaded", function () {
    const submitQuizBtn = document.getElementById("submit-quiz");
    const budgetInput = document.getElementById("budgetInput");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const selectionsDisplay = document.getElementById("selections-display");

    // Default context
    const defaultContext = {
        food: true,
        sports: false,
        beaches: true,
        entertainment: false,
        music: true,
        budget: 500
    };

    // Function to update selections display
    function updateSelectionsDisplay() {
        let selectedInterests = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedInterests.push(checkbox.value);
            }
        });
        
        const budget = budgetInput.value || "Not specified";
        
        selectionsDisplay.value = `Selected Interests:\n${selectedInterests.join(", ") || "None"}\n\nBudget: $${budget}`;
    }

    // Update display when any input changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateSelectionsDisplay);
    });
    budgetInput.addEventListener("input", updateSelectionsDisplay);

    // Submit quiz data
    submitQuizBtn.addEventListener("click", function () {
        let interests = {
            food: document.getElementById("interest-food").checked,
            sports: document.getElementById("interest-sports").checked,
            beaches: document.getElementById("interest-beaches").checked,
            entertainment: document.getElementById("interest-entertainment").checked,
            music: document.getElementById("interest-music").checked,
            budget: parseFloat(budgetInput.value.trim()) || defaultContext.budget
        };

        if (!interests.food && !interests.sports && !interests.beaches && 
            !interests.entertainment && !interests.music) {
            alert("Please select at least one interest.");
            return;
        }

        localStorage.setItem("quizData", JSON.stringify(interests));
        alert("Preferences saved successfully!");
        updateSelectionsDisplay();
    });

    // Initialize form with current preferences
    const storedData = JSON.parse(localStorage.getItem("quizData")) || defaultContext;
    document.getElementById("interest-food").checked = storedData.food;
    document.getElementById("interest-sports").checked = storedData.sports;
    document.getElementById("interest-beaches").checked = storedData.beaches;
    document.getElementById("interest-entertainment").checked = storedData.entertainment;
    document.getElementById("interest-music").checked = storedData.music;
    budgetInput.value = storedData.budget;
    
    // Show current preferences on load
    updateSelectionsDisplay();
});
