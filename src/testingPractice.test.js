import { capitalizeFirst, reverseString } from "./testingPractice";

test('Takes a string and returns it with the first character capitalized', () => {
    expect(capitalizeFirst('jack')).toMatch('Jack');
    expect(capitalizeFirst('kiley')).toMatch('Kiley');
});


test('Takes a string and returns it reversed', () => {
    expect(reverseString('peanuts')).toMatch('stunaep');
});
