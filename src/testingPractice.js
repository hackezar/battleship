export  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reverseString(string) {
    let newString = "";
    for (let i=string.length - 1; i>=0; i--) 
        newString = newString.concat(string.charAt(i));
    return newString;
}
