document.getElementById("submit-quiz").addEventListener("click", function() {
    // Collect user preferences
    let interests = {
        food: document.getElementById("interest-food").checked,
        sports: document.getElementById("interest-sports").checked,
        beaches: document.getElementById("interest-beaches").checked,
        entertainment: document.getElementById("interest-entertainment").checked,
        music: document.getElementById("interest-music").checked,
        budget: parseFloat(document.getElementById("budgetInput").value.trim()) || 500
    };

    // Validate at least one interest is selected
    if (!interests.food && !interests.sports && !interests.beaches && 
        !interests.entertainment && !interests.music) {
        alert("Please select at least one interest.");
        return;
    }

    // Save preferences to localStorage
    localStorage.setItem("quizData", JSON.stringify(interests));
    
    // Display the results
    displayResults(interests);
});

function displayResults(interests) {
    const resultsContainer = document.getElementById("results-container");
    const preferencesDisplay = document.getElementById("preferences-display");
    
    // Build the display text
    let selectedInterests = [];
    for (const [key, value] of Object.entries(interests)) {
        if (value && key !== "budget") {
            selectedInterests.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
    }
    
    const budgetText = interests.budget ? `$${interests.budget}` : "Not specified";
    
    preferencesDisplay.innerHTML = `
        <p><strong>Interests:</strong> ${selectedInterests.join(", ") || "None selected"}</p>
        <p><strong>Budget:</strong> ${budgetText}</p>
    `;
    
    // Show the results container
    resultsContainer.style.display = "block";
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Handle the proceed button click
document.addEventListener('DOMContentLoaded', function() {
    // This ensures the element exists before we try to add the listener
    const proceedButton = document.getElementById("proceed-button");
    if (proceedButton) {
        proceedButton.addEventListener("click", function() {
            window.location.href = "../pages/map.html";
        });
    }
});
