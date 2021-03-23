/*
Convert the given number into a roman numeral.

All roman numerals(https://www.mathsisfun.com/roman-numerals.html) answers should be provided in upper-case.
*/

function convertToRoman(num) {
  let decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let romanNumeral = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let romanNumber = "";
  for (let i = 0; i < decimalValue.length; i++) {
    while (num >= decimalValue[i]) {
      num -= decimalValue[i];
      romanNumber += romanNumeral[i];
    }
  }
  return romanNumber;
}

convertToRoman(36);
