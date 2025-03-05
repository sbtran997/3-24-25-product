class User {
    constructor(name) {
        this.name = name;
        this.preferences = {};
    }

    takeUserPreference(input) {
        this.preferences = input; // Store user preferences
    }

    createPlan() {
        if (Object.keys(this.preferences).length === 0) {
            console.log("No preferences provided. Creating a default plan.");
            return { plan: "Default Plan" };
        }

        console.log("Creating a plan based on user preferences...");
        return { plan: "Custom Plan", details: this.preferences };
    }
}

// Example Usage:
function testQuestionUser() {
    console.log("Testing questionUser...");
}

function testTakeUserPreference() {
    const user = new User("Test User");
    user.takeUserPreference({ preference: "Dark Mode", notifications: true });
    console.log("User preferences set:", user.preferences);
}

function testCreatePlan() {
    const user = new User("Test User");
    user.takeUserPreference({ preference: "Dark Mode", notifications: true });
    const plan = user.createPlan();
    console.log("Generated Plan:", plan);
}