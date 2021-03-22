/*
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.
*/

function telephoneCheck(str) {
  let rule0 = /\s|-|\(|\)/g;
  let rule1 = /\d{3}-\d{3}-\d{4}/;
  let rule2 = /\(\d{3}\)\d{3}-\d{4}/;
  let rule3 = /\(\d{3}\)\s\d{3}-\d{4}/;
  let rule4 = /\d{3}\s\d{3}\s\d{4}/;
  let rule5 = /\d{10}/;

  let nakedStr = str.replace(rule0, "");

  if (/\(|\d/.test(str[0]) === false) {
    return false;
  }

  if (nakedStr.length === 11 && nakedStr[0] !== "1") {
    return false;
  }

  if (nakedStr.length !== 10 && nakedStr.length !== 11) {
    return false;
  }

  if (str[0] === "(" && str[4] !== ")") {
    return false;
  }

  if (str[1] === "(" && str[5] !== ")") {
    return false;
  }

  if (
    rule1.test(str) ||
    rule2.test(str) ||
    rule3.test(str) ||
    rule4.test(str) ||
    rule5.test(str)
  ) {
    return true;
  }

  return false;
}

telephoneCheck("555-555-5555");
