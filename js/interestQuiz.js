// Default context if user hasn't taken the quiz
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

// Display stored data
function displayStoredData() {
    let storedData = getStoredData();
    let resultDiv = document.getElementById("stored-results");
    
    let interestsText = Object.keys(storedData)
        .filter(key => storedData[key] === true && key !== "budget")
        .join(", ") || "No interests selected";

    let budgetText = storedData.budget ? `$${storedData.budget}` : "Not set";

    resultDiv.innerHTML = `
        <h3>Your Current Preferences:</h3>
        <p><strong>Interests:</strong> ${interestsText}</p>
        <p><strong>Budget:</strong> ${budgetText}</p>
    `;
    resultDiv.style.display = "block";
}

// Set default data if none exists
if (!localStorage.getItem("quizData")) {
    localStorage.setItem("quizData", JSON.stringify(defaultContext));
}

// Load current preferences when page loads
window.addEventListener('DOMContentLoaded', (event) => {
    let storedData = getStoredData();
    
    // Set checkboxes based on stored data
    document.getElementById("interest-food").checked = storedData.food;
    document.getElementById("interest-sports").checked = storedData.sports;
    document.getElementById("interest-beaches").checked = storedData.beaches;
    document.getElementById("interest-entertainment").checked = storedData.entertainment;
    document.getElementById("interest-music").checked = storedData.music;
    document.getElementById("budgetInput").value = storedData.budget;
    
    displayStoredData();
});

// Submit quiz data
document.getElementById("submit-quiz").addEventListener("click", function() {
    let interests = {
        food: document.getElementById("interest-food").checked,
        sports: document.getElementById("interest-sports").checked,
        beaches: document.getElementById("interest-beaches").checked,
        entertainment: document.getElementById("interest-entertainment").checked,
        music: document.getElementById("interest-music").checked,
        budget: parseFloat(document.getElementById("budgetInput").value.trim()) || 500
    };

    // Ensure at least one interest is selected
    if (!interests.food && !interests.sports && !interests.beaches && 
        !interests.entertainment && !interests.music) {
        alert("Please select at least one interest.");
        return;
    }

    localStorage.setItem("quizData", JSON.stringify(interests));
    alert("Preferences saved successfully!");
    displayStoredData();
});
