export  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reverseString(string) {
    let newString = "";
    for (let i=string.length - 1; i>=0; i--) 
        newString = newString.concat(string.charAt(i));
    return newString;
}

export function calculator(num1, operator, num2) {
    if (operator == '+')
        return num1 + num2;
    else if (operator == '-')
        return num1 - num2;
    else if (operator == '*')
        return num1 * num2;
    else if (operator == '/')
        return num1 / num2;
    else
        return console.log('Operator Error: Not a working operator');
}

export function caesarCipher(string, shift) {
    let alphabet = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
        5: 'e',
        6: 'f',
        7: 'g',
        8: 'h',
        9: 'i',
        10: 'j',
        11: 'k',
        12: 'l',
        13: 'm',
        14: 'n',
        15: 'o',
        16: 'p',
        17: 'q',
        18: 'r',
        19: 's',
        20: 't',
        21: 'u',
        22: 'v',
        23: 'w',
        24: 'x',
        25: 'y',
        26: 'z',
    }
    let upper;
    let temp;
    let newStr = "";
    
    for (let i=0; i<string.length; i++) {
        // preserve case
        if (string.charAt(i) === string.charAt(i).toUpperCase())
            upper = true;
        if (string.charAt(i) === string.charAt(i).toLowerCase())
            upper = false;
        switch (string.charAt(i).toLowerCase()) {
            case 'a':
                temp = 1;
                break;
            case 'b':
                temp = 2;
                break;
            case 'c':
                temp = 3;
                break;
            case 'd':
                temp = 4;
                break;
            case 'e':
                temp = 5;
                break;
            case 'f':
                temp = 6;
                break;
            case 'g':
                temp = 7;
                break;
            case 'h':
                temp = 8;
                break;
            case 'i':
                temp = 9;
                break;
            case 'j':
                temp = 10;
                break;
            case 'k':
                temp = 11;
                break;
            case 'l':
                temp = 12;
                break;
            case 'm':
                temp = 13;
                break;
            case 'n':
                temp = 14;
                break;
            case 'o':
                temp = 15;
                break;
            case 'p':
                temp = 16;
                break;
            case 'q':
                temp = 17;
                break;
            case 'r':
                temp = 18;
                break;
            case 's':
                temp = 19;
                break;
            case 't':
                temp = 20;
                break;
            case 'u':
                temp = 21;
                break;
            case 'v':
                temp = 22;
                break;
            case 'w':
                temp = 23;
                break;
            case 'x':
                temp = 24;
                break;
            case 'y':
                temp = 25;
                break;
            case 'z':
                temp = 26;
                break;
        }
        temp += shift;
        if (temp > 26)
            temp -= 26;
        temp = alphabet[temp];
        if (temp == undefined)
            newStr += string.charAt(i);
        else {
            if (upper == true)
                newStr += temp.toUpperCase();
            else
                newStr += temp;
        }
    }
    return newStr;
}

export function analyzeArray(array) {
    let average, length;
    let sum = 0;
    let total = 0;
    let min = array[0];
    let max = array[0];
    for (let i=0; i<array.length; i++) {
    // Average + Length
        sum+=array[i];
        total = i + 1;

    // Min
        if (min > array[i])
            min = array[i];
    // Max
        if (max < array[i])
            max = array[i];
    }
    average = sum/total;
    length = total;
    let obj = {
        average: average,
        min: min,
        max: max,
        length: length
    };
    return obj;
}
