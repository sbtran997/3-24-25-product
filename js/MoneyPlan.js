class Money {
    constructor(user, money, currentCurrency, newCurrency) {
        this.user = user;
        this.money = money;
        this.currentCurrency = currentCurrency;
        this.newCurrency = newCurrency
}
takeUserPreference() {
  // Takes in the amount of money the user has and gives it to createMoneyPlan
    if (this.money >= 0) {
        return this.money;
    }else {
        return "User has invaild amount of money!";
    }
}

createMoneyPlan() {
    // takes the int value from userPrefence coverts it to the type of curreny that the user will be using based on where they are traveling to.
    console.log(this.currentCurrency, this.newCurrency);
        if (this.currentCurrency === this.newCurrency) {
            return this.money; // No conversion needed
        }

        let exchangeRates = { // These are the currceny exchange rates for the different types of currency
            "USD": { "EURO": 0.92, "JPY": 148.34, "RUBLE": 87.20, "RENMINBI": 7.26, "SKW": 1451.17 },
            "EURO": { "USD": 1.09, "JPY": 161.98, "RUBLE": 95.22, "RENMINBI": 7.93, "SKW": 1584.87 },
            "JPY": { "USD": 0.0067, "EURO": 0.0062, "RUBLE": 0.59, "RENMINBI": 0.049, "SKW": 9.78 },
            "RUBLE": { "USD": 0.011, "EURO": 0.011, "JPY": 1.70, "RENMINBI": 0.084, "SKW": 16.70 },
            "RENMINBI": { "USD": 0.14, "EURO": 0.13, "JPY": 20.42, "RUBLE": 11.97, "SKW": 199.87 },
            "SKW": { "USD": 0.00069, "EURO": 0.00063, "JPY": 0.10, "RENMINBI": 0.0050, "RUBLE": 0.060 }
        };

        if (!exchangeRates[this.currentCurrency] || !exchangeRates[this.currentCurrency][this.newCurrency]) {
            return "Invalid currency conversion!";
        }

        let rate = exchangeRates[this.currentCurrency][this.newCurrency]; // does the conversion
        this.money *= rate;
        this.currentCurrency = this.newCurrency;
        return this.money;
    }
displayTotalCost() {
        if (typeof this.money === "number") { // checks if the money is a number and if it is then it will display it with the users name and currency type
            return `${this.user} has ${this.money.toFixed(2)} ${this.currentCurrency}`;
        } else {
            return "Invalid total cost!";
        }
    }
}

// Test Cases
function testTakeUserPreference() {
    let user1 = new Money("Alice", 100, "USD", "USD");
    console.log(user1.takeUserPreference()); // Should return 100

    let user2 = new Money("Bob", -50, "JPY", "USD");
    console.log(user2.takeUserPreference()); // Should return "User has an invalid amount of money!"

    let user3 = new Money("Jerry",100000000000000000000000000000, "USD", "EURO");
    console.log(user3.takeUserPreference()); // Should return 100000000000000000000000000000

    let user4 = new Money("Tom",-10000000000000000000000000000, "USD", "EURO");
    console.log(user4.takeUserPreference()); // Should return -10000000000000000000000000000
}

function testCreateMoneyPlan() {
    let user1 = new Money("Alice", 100, "USD", "EURO");
    console.log(user1.createMoneyPlan()); // Convert USD to EURO

    let user2 = new Money("Jerry", 100, "USD", "INVALID");
    
    console.log(user2.createMoneyPlan("")); // Invalid currency conversion
    let user3 = new Money("Bob", 100, "USD", "USD");

    console.log(user3.createMoneyPlan()); // No conversion should happen
    let user4 = new Money("Harry",100000000000000000000000000000, "USD", "EURO");
    console.log(user4.takeUserPreference()); // Should return 100000000000000000000000000000 * Exchange rate
    
    let user5 = new Money("Tom",-10000000000000000000000000000, "USD", "EURO");
    console.log(user5.takeUserPreference()); // Should return User has invaild amount of Money!
}

function testDisplayTotalCost() {
    let user1 = new Money("Alice", 150.75, "USD","USD");
    console.log(user1.displayTotalCost()); // Should display formatted total

    let user2 = new Money("Bob", "Invalid", "USD","USD");
    console.log(user2.displayTotalCost()); // Should return "Invalid total cost!"

    let user3 = new Money("Jerry",100000000000000000000000000000, "USD", "EURO");
    console.log(user3.takeUserPreference()); // Should return 100000000000000000000000000000

    let user4 = new Money("Tom",-10000000000000000000000000000, "USD", "EURO");
    console.log(user4.takeUserPreference()); // Should return -10000000000000000000000000000
}

testTakeUserPreference();
testCreateMoneyPlan();
testDisplayTotalCost();
