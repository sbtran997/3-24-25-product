document.addEventListener("DOMContentLoaded", function () {
    const submitQuizBtn = document.getElementById("submit-quiz");
    const continueBtn = document.getElementById("continue-btn");
    const preferencesDisplay = document.getElementById("user-preferences");

    // Default context if user skips the quiz
    const defaultContext = {
        food: true,
        sports: false,
        beaches: true,
        entertainment: false,
        music: true,
        budget: 500
    };

    // Load stored data or set default
    function getStoredData() {
        let storedData = JSON.parse(localStorage.getItem("quizData"));
        return storedData ? storedData : defaultContext;
    }

    // Show stored data
    function displayStoredData() {
        let storedData = getStoredData();
        let resultDiv = document.getElementById("stored-results");

        let interestsText = Object.keys(storedData)
            .filter(key => storedData[key] === true && key !== "budget")
            .join(", ") || "No interests selected";

        let budgetText = storedData.budget ? `$${storedData.budget}` : "Not set";

        resultDiv.innerHTML = `<strong>Your Interests:</strong> ${interestsText} <br> 
                             <strong>Your Budget:</strong> ${budgetText}`;
        
        preferencesDisplay.style.display = "block";
        continueBtn.style.display = "block";
    }

    // Submit quiz data
    submitQuizBtn.addEventListener("click", function () {
        let interests = {
            food: document.getElementById("interest-food").checked,
            sports: document.getElementById("interest-sports").checked,
            beaches: document.getElementById("interest-beaches").checked,
            entertainment: document.getElementById("interest-entertainment").checked,
            music: document.getElementById("interest-music").checked,
            budget: parseFloat(document.getElementById("budgetInput").value.trim()) || defaultContext.budget
        };

        // Ensure at least one interest is selected
        if (!interests.food && !interests.sports && !interests.beaches && 
            !interests.entertainment && !interests.music) {
            alert("Please select at least one interest.");
            return;
        }

        localStorage.setItem("quizData", JSON.stringify(interests));
        displayStoredData();
    });

    // Continue to travel planner
    continueBtn.addEventListener("click", function() {
        window.location.href = "../pages/map.html";
    });

    // Set default data if none exists
    if (!localStorage.getItem("quizData")) {
        localStorage.setItem("quizData", JSON.stringify(defaultContext));
    }

    // Load current preferences
    const storedData = getStoredData();
    document.getElementById("interest-food").checked = storedData.food;
    document.getElementById("interest-sports").checked = storedData.sports;
    document.getElementById("interest-beaches").checked = storedData.beaches;
    document.getElementById("interest-entertainment").checked = storedData.entertainment;
    document.getElementById("interest-music").checked = storedData.music;
    document.getElementById("budgetInput").value = storedData.budget;
});
