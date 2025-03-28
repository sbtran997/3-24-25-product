const { generatePlan, activityGenerator } = require('../js/travelPlan');
const { describe, test, expect } = require('@jest/globals');

// Mock data
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

// Helper functions
function generateTestItinerary() {
    return Array.from({length: 3}, (_, i) => ({
        day: i + 1,
        morning: activityGenerator.generateActivity('morning'),
        afternoon: activityGenerator.generateActivity('afternoon'),
        evening: activityGenerator.generateActivity('evening')
    }));
}

function getAllActivities(itinerary) {
    return itinerary.flatMap(day => [
        day.morning,
        day.afternoon,
        day.evening
    ]);
}

function calculateBudgetBreakdown(budget) {
    return {
        Accommodation: budget * 0.5,
        Activities: budget * 0.3,
        Dining: budget * 0.15,
        Transportation: budget * 0.05
    };
}

describe('Travel Planner Tests', () => {
    test('Should generate unique daily activities', () => {
        const itinerary = generateTestItinerary();
        const allActivities = getAllActivities(itinerary);
        const uniqueActivities = new Set(allActivities);
        expect(uniqueActivities.size).toBe(allActivities.length);
    });

    test('Should calculate budget correctly', () => {
        const testBudget = 2000;
        const breakdown = calculateBudgetBreakdown(testBudget);

        expect(breakdown.Accommodation).toBe(1000);
        expect(breakdown.Activities).toBe(600);
        expect(breakdown.Dining).toBe(300);
        expect(breakdown.Transportation).toBe(100);
    });

    test('Should handle empty destination input', () => {
        const plan = generatePlan('', 1500);
        expect(plan.destination).toBe('Selected Destination');
    });

    test('Should generate valid location types', () => {
        const locationType = activityGenerator.getLocationType();
        const validPrefixes = ['Coastal', 'Mountain', 'Historic', 'Tropical', 'Urban', 'Countryside'];
        const validSuffixes = ['Retreat', 'Getaway', 'Exploration', 'Adventure', 'Experience', 'Tour'];

        const [prefix, suffix] = locationType.split(' ');
        expect(validPrefixes).toContain(prefix);
        expect(validSuffixes).toContain(suffix);
    });

    test('Should generate time-appropriate activities', () => {
        const morning = activityGenerator.generateActivity('morning');
        const afternoon = activityGenerator.generateActivity('afternoon');
        const evening = activityGenerator.generateActivity('evening');

        expect(morningActivities).toContain(morning);
        expect(afternoonActivities).toContain(afternoon);
        expect(eveningActivities).toContain(evening);
    });
});