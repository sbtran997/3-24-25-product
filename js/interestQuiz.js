document.addEventListener("DOMContentLoaded", function () {
    const submitQuizBtn = document.getElementById("submit-quiz");

    // Default context
    const defaultContext = {
        food: true,
        sports: false,
        beaches: true,
        entertainment: false,
        music: true,
        budget: 500
    };

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

        if (!interests.food && !interests.sports && !interests.beaches && 
            !interests.entertainment && !interests.music) {
            alert("Please select at least one interest.");
            return;
        }

        localStorage.setItem("quizData", JSON.stringify(interests));
        displayStoredData();
        alert("Preferences saved successfully!");
    });

    // Display current preferences
    function displayStoredData() {
        let storedData = JSON.parse(localStorage.getItem("quizData")) || defaultContext;
        let resultDiv = document.getElementById("stored-results");

        let interestsText = Object.keys(storedData)
            .filter(key => storedData[key] === true && key !== "budget")
            .join(", ") || "No interests selected";

        let budgetText = storedData.budget ? `$${storedData.budget}` : "Not set";

        resultDiv.innerHTML = `<strong>Your Interests:</strong> ${interestsText} <br> 
                             <strong>Your Budget:</strong> ${budgetText}`;
    }

    // Initialize form with current preferences
    const storedData = JSON.parse(localStorage.getItem("quizData")) || defaultContext;
    document.getElementById("interest-food").checked = storedData.food;
    document.getElementById("interest-sports").checked = storedData.sports;
    document.getElementById("interest-beaches").checked = storedData.beaches;
    document.getElementById("interest-entertainment").checked = storedData.entertainment;
    document.getElementById("interest-music").checked = storedData.music;
    document.getElementById("budgetInput").value = storedData.budget;
    
    // Show current preferences on load
    displayStoredData();
});
