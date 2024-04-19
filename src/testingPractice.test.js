import { capitalizeFirst, reverseString, calculator, caesarCipher, analyzeArray } from "./testingPractice";

test('Takes a string and returns it with the first character capitalized', () => {
    expect(capitalizeFirst('jack')).toMatch('Jack');
    expect(capitalizeFirst('kiley')).toMatch('Kiley');
});


test('Takes a string and returns it reversed', () => {
    expect(reverseString('peanuts')).toMatch('stunaep');
});

test('Calculator with +, -, *, / that takes two numbers and returns correct calculation', () => {
    expect(calculator(5, '+', 6)).toBe(11);
    expect(calculator(9, '-', 2)).toBe(7);
    expect(calculator(5, '*', 5)).toBe(25);
    expect(calculator(50, '/', 5)).toBe(10);
});

test('caesarCipher function that takes a string and a shift factor and returns it with each character shifted.', () => {
    expect(caesarCipher('a', 2)).toBe('c');
    expect(caesarCipher('z', 2)).toBe('b');
    expect(caesarCipher('jack', 3)).toBe('mdfn');
    expect(caesarCipher('jack halcisak!?', 3)).toBe('mdfn kdoflvdn!?');
    expect(caesarCipher('Dont Overthink Shit!', 13)).toBe('Qbag Bireguvax Fuvg!');
});

test('Analyze array function that takes an array of numbers and returns and returns an object with the following properties: average, min, max, length', () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({average: 4, min: 1, max: 8, length: 6});
})