/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {
  let denom = [
    { name: "ONE HUNDRED", val: 100.0 },
    { name: "TWENTY", val: 20.0 },
    { name: "TEN", val: 10.0 },
    { name: "FIVE", val: 5.0 },
    { name: "ONE", val: 1.0 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 },
  ];
  let rest = cash - price;
  rest = Math.round((rest + Number.EPSILON) * 100) / 100;
  let change = [];

  // total cash in drawer
  let sumInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    sumInDrawer += cid[i][1];
  }

  if (rest > sumInDrawer) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (cash - price === sumInDrawer) {
    return { status: "CLOSED", change: cid };
  }

  let cur = 0;

  while (rest > 0 && cur != denom.length - 1) {
    while (rest - denom[cur].val < 0) {
      cur++;
    }

    let name = denom[cur].name;
    let value = denom[cur].val;

    let valueCid = cid.filter((val) => {
      return val[0] === name;
    });

    let curInCid = valueCid[0][1];
    let nr = 0;

    while (curInCid > 0 && rest >= value) {
      curInCid -= value;
      rest -= value;
      rest = Math.round((rest + Number.EPSILON) * 100) / 100;
      nr++;
    }

    let newArr = [valueCid[0][0], value * nr];
    change.push(newArr);

    cur++;
  }

  if (cur === denom.length - 1) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
