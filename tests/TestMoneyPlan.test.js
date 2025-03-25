
const Money = require('../js/MoneyPlan');
const { describe, test, expect } = require('@jest/globals');

describe('Money', () => {
    test('takeUserPreference should return valid money amount', () => {
        let user1 = new Money("Alice", 100, "USD", "USD"); // correct case
        expect(user1.takeUserPreference()).toBe(100);
    });

    test('takeUserPreference should return error message for invalid money amount', () => {
        let user2 = new Money("Bob", -50, "JPY", "USD"); // incorrect case
        expect(user2.takeUserPreference()).toBe("User has invaild amount of money!");
    });
    test('takeUserPreference should return valid money amount', () => { // bound case
        let user3 = new Money("Jerry",100000000000000000000000000000, "USD", "EURO");
        expect(user3.takeUserPreference()).toBe(100000000000000000000000000000);
    });
    test('takeUserPreference should return error message for invalid money amount', () => {
        let user4 = new Money("Tom",-10000000000000000000000000000, "USD", "EURO");  // edge case
        expect(user4.takeUserPreference()).toBe("User has invaild amount of money!");
    });
    test('createMoneyPlan should convert currency correctly', () => {
        let user1 = new Money("Alice", 100, "USD", "EURO"); // correct case
        expect(user1.createMoneyPlan()).toBeCloseTo(92.00);
    });

    test('createMoneyPlan should return error for invalid currency conversion', () => {
        let user2 = new Money("Jerry", 100, "USD", "INVALID"); // incorrect case
        expect(user2.createMoneyPlan()).toBe("Invalid currency conversion!");
    });

    test('createMoneyPlan should not convert if currencies are the same', () => {
        let user3 = new Money("Bob", 100, "USD", "USD"); // does not change case
        expect(user3.createMoneyPlan()).toBe(100);
    });
    test('createMoneyPlan should handle extremely large positive amounts', () => { // bound case
        let user4 = new Money("Harry", 100000000000000000000000000000, "USD", "EURO");
        expect(user4.createMoneyPlan()).toBe(9.2e+28);
    });
    
    test('createMoneyPlan should return error for extremely large negative amounts', () => { // edge case
        let user5 = new Money("Tom", -10000000000000000000000000000, "USD", "EURO");
        expect(user5.createMoneyPlan()).toBe("User has invaild amount of money!");
    });

    test('displayTotalCost should return formatted total', () => { // correct case
        let user1 = new Money("Alice", 150.75, "USD", "USD");
        expect(user1.displayTotalCost()).toBe("Alice has 150.75 USD");
    });

    test('displayTotalCost should return error for invalid money amount', () => { // incorrect case
        let user2 = new Money("Bob", "Invalid", "USD", "USD");
        expect(user2.displayTotalCost()).toBe("Invalid total cost!");
    });

    test('displayTotalCost should return error for invalid money amount', () => { // bound case
        let user3 = new Money("Jerry",100000000000000000000000000000, "USD", "EURO");
        expect(user3.displayTotalCost()).toBe("Jerry has 1e+29 USD");
    });
    test('displayTotalCost should return error for invalid money amount', () => { // edge case
        let user4 = new Money("Jerry",-100000000000000000000000000000, "USD", "EURO");
        expect(user4.displayTotalCost()).toBe("Invalid total cost!");
    });
});
