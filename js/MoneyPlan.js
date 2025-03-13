

function takeUserPrefence(input, currentCurrency, newCurrency) {
  // Takes in the amount of money the user has and gives it to createMoneyPlan
    if (input >= 0) {
        return createMoneyPlan(input,currentCurrency, newCurrency);
    }else {
        return "User has invaild amount of money!";
    }
}

function createMoneyPlan(userPrefence, currentCurrency, newCurrency) {
    // takes the int value from userPrefence coverts it to the type of curreny that the user will be using based on where they are traveling to.
    var currentCurrencyValue = 0;
    if (currentCurrency == newCurrency) { // checks if the currency type does not change
        return userPrefence;
    }
    switch (newCurrency) { // checks what the newCurrency type is than will convert the userPrefence to the newCurrency type
        case "USD": // currentCurrency to USD
            if (currentCurrency == "EURO") {
                currentCurrencyValue = 1.09;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "JPY") {
                currentCurrencyValue = 0.0067;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RUBLE") {
                currentCurrencyValue = 0.011;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RENMINBI") {
                currentCurrencyValue = 0.14;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "SKW") {
                currentCurrencyValue = 0.00069;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
        case "EURO": // currentCurrency to EURO
            if (currentCurrency == "USD") {
                currentCurrencyValue = 0.92;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "JPY") {
                currentCurrencyValue = 0.0062;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RUBLE") {
                currentCurrencyValue = 0.011;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RENMINBI") {
                currentCurrencyValue = 0.13;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "SKW") {
                currentCurrencyValue = 0.00063;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            case "JPY": // currentCurrency to JPY
            if (currentCurrency == "USD") {
                currentCurrencyValue = 148.34;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "EURO") {
                currentCurrencyValue = 161.98;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RUBLE") {
                currentCurrencyValue = 1.70;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RENMINBI") {
                currentCurrencyValue = 20.42;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "SKW") {
                currentCurrencyValue = 0.10;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            case "RUBLE": // currentCurrency to RUBLE
            if (currentCurrency == "USD") {
                currentCurrencyValue = 87.20;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "EURO") {
                currentCurrencyValue = 95.22;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "JPY") {
                currentCurrencyValue = 0.59;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RENMINBI") {
                currentCurrencyValue = 11.97;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "SKW") {
                currentCurrencyValue = 0.060;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            case "RENMINBI": // currentCurrency to RENMINBI
            if (currentCurrency == "USD") {
                currentCurrencyValue = 7.26;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "EURO") {
                currentCurrencyValue = 7.93;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "JPY") {
                currentCurrencyValue = 0.049;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RUBLE") {
                currentCurrencyValue = 0.084;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "SKW") {
                currentCurrencyValue = 0.0050;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            case "SKW": // currentCurrency to SKW
            if (currentCurrency == "USD") {
                currentCurrencyValue = 1,451.17;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "EURO") {
                currentCurrencyValue = 1,584.87;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "JPY") {
                currentCurrencyValue = 9.78;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RENMINBI") {
                currentCurrencyValue = 199.87;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
            if (currentCurrency == "RUBLE") {
                currentCurrencyValue = 16.70;
                userPrefence = userPrefence * currentCurrencyValue;
                return displayTotalCost(userPrefence);
            }
        default:
            return "User has invaild currency type!";
    }

function displayTotalCost(newTotalCost) {
    // Once the users value is in the correct currency type, this function will display the total cost of the trip.
    return newTotalCost;
}

}