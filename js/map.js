// Initialize Map
var map = L.map('map').setView([40.7128, -74.0060], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// AI Chatbot
/*
async function askAI() {
    const inputText = document.getElementById("userInput").value;
    console.log("Input received:", inputText); // Log the input for debugging
    document.getElementById("response").innerText = "Thinking...";

    try {
        const ai = new WebLLM.ChatModule();
        await ai.init();
        const response = await ai.chat(inputText);
        console.log("AI Response:", response); // Log the response for debugging
        document.getElementById("response").innerText = response;
    } catch (error) {
        console.error("Error communicating with the AI:", error);
        document.getElementById("response").innerText = "There was an error processing your request.";
    }
}
*/
async function askAI() {
    const userInput = document.getElementById('userInput').value.trim();
    const responseDiv = document.getElementById('response');

    if (!userInput) {
        responseDiv.innerText = "Please enter a question.";
        return;
    }

    responseDiv.innerText = "Thinking...";

    try {
        const apiKey = "AIzaSyC90piHkP_eVyz0l5uogiFhvqBqx2FQ-wk"; // api key

        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        const interests = JSON.parse(localStorage.getItem('interests')) || [];
        const budget = localStorage.getItem('travelBudget') || "Not specified";

        const checklistItems = (() => {
            const encrypted = localStorage.getItem('checklist');
            if (!encrypted) return [];
            try {
                const decrypted = simpleDecrypt(encrypted); // You already have this function
                return JSON.parse(decrypted) || [];
            } catch (error) {
                console.error('Checklist decryption failed:', error);
                return [];
            }
        })();

        const checklistText = checklistItems.length > 0
            ? checklistItems.map(item => `${item.checked ? '✓' : '◻️'} ${item.text}`).join(', ')
            : "No checklist items.";

        // 2. Craft the enhanced prompt
        const fullPrompt = `
You are a travel planning expert. Based on the user profile below, You will provide a short and concise response that contains:
1. Transportation suggestions (e.g., flights, trains, buses) to the destination.
2. Accommodation suggestions (e.g., hotels, hostels, vacation rentals) in the destination.
3. Activity suggestions (e.g., sightseeing, dining, entertainment) in the destination.
Additionally, cater to the users budget and interests.
User Profile:

User Interests: ${interests.join(', ') || 'None'}
User Budget: $${budget}
User Checklist: ${checklistText}

Now, based on the above information, respond to the following query from the user:

"${userInput}"
        `.trim();

        // 3. Send the full prompt to Gemini
        const requestData = {
            contents: [{
                parts: [{
                    text: fullPrompt
                }]
            }]
        };

        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        });

        const data = await result.json();
        console.log("Raw API Response:", data); // <-- See the full response in console

        if (data && data.candidates && data.candidates.length > 0) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            responseDiv.innerText = aiResponse;
        } else {
            responseDiv.innerText = "No response candidates found.";
        }

    } catch (error) {
        console.error("Error contacting Gemini API:", error);
        responseDiv.innerText = "There was an error contacting the AI.";
    }
}


// Simulated AI response (for testing if AI is taking too long)
        // async function askAI() {
        //     const inputText = document.getElementById("userInput").value;
        //     console.log("Input received:", inputText); // Log the input for debugging
        //     document.getElementById("response").innerText = "Thinking...";
        //     setTimeout(() => {
        //         document.getElementById("response").innerText = "This is a sample AI response!";
        //     }, 1000);
        // }