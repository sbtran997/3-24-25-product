const activityGenerator = {
    getLocationType: () => {
        const types = ['Coastal', 'Mountain', 'Historic', 'Tropical', 'Urban', 'Countryside'];
        const styles = ['Retreat', 'Getaway', 'Exploration', 'Adventure', 'Experience', 'Tour'];
        return `${types[Math.floor(Math.random() * types.length)]} ${
            styles[Math.floor(Math.random() * styles.length)]}`;
    },

    generateActivity: (timeOfDay) => {
        const morningActivities = [
            'Guided historic walk', 
            'Scenic hiking trail',
            'Local market visit',
            'Breakfast with city views'
        ];
        
        const afternoonActivities = [
            'Beach relaxation time',
            'Museum tour',
            'Cooking class',
            'Kayaking adventure'
        ];

        const eveningActivities = [
            'Sunset beach stroll',
            'Dinner at local favorite spot',
            'Cultural performance',
            'Night market exploration'
        ];

        const times = {
            morning: morningActivities,
            afternoon: afternoonActivities,
            evening: eveningActivities
        };

        return times[timeOfDay][Math.floor(Math.random() * times[timeOfDay].length)];
    }
};

function generatePlan(destinationInput, budgetInput) {
    // Support testable inputs
    const destination =
        destinationInput ||
        (typeof document !== 'undefined' && document.getElementById('destination')?.value) ||
        'Selected Destination';
    
    const budget =
        budgetInput ||
        (typeof document !== 'undefined' && parseInt(document.getElementById('budget')?.value)) ||
        Math.floor(Math.random() * 3000) + 1000;

    // Generate itinerary
    const itinerary = Array.from({length: 3}, (_, i) => `
        <div class="day-plan">
            <h4>📅 Day ${i + 1}: ${activityGenerator.getLocationType()}</h4>
            <p>☀️ Morning: ${activityGenerator.generateActivity('morning')}</p>
            <p>⛅ Afternoon: ${activityGenerator.generateActivity('afternoon')} ($${Math.floor(Math.random() * 150) + 50})</p>
            <p>🌙 Evening: ${activityGenerator.generateActivity('evening')}</p>
        </div>
    `).join('');

    const budgetCategories = {
        'Accommodation': budget * 0.5,
        'Activities': budget * 0.3,
        'Dining': budget * 0.15,
        'Transportation': budget * 0.05
    };

    // DOM manipulation (browser only)
    if (typeof document !== 'undefined') {
        document.getElementById('itinerary').style.display = 'block';
        document.getElementById('budget-tracker').style.display = 'block';

        document.getElementById('itinerary-content').innerHTML = `
            <div class="ai-tag">AI Suggested Plan for ${destination}</div>
            ${itinerary}
        `;

        document.getElementById('budget-breakdown').innerHTML = `
            <p>Total Budget: $${budget}</p>
            ${Object.entries(budgetCategories).map(([category, amount]) => `
                <p>${category}: $${Math.round(amount)}</p>
            `).join('')}
        `;
    }

    // Return data for testability
    return {
        destination,
        budget,
        budgetBreakdown: budgetCategories
    };
}

module.exports = {
    activityGenerator,
    generatePlan
};