//jshint esversion: 6
var denominations = [
  {name: 'ONE HUNDRED', value: 100.00},
  {name: 'TWENTY', value: 20.00},
  {name: 'TEN', value: 10.00},
  {name: 'FIVE', value: 5.00},
  {name: 'ONE', value: 1.00},
  {name: 'QUARTER', value: 0.25},
  {name: 'DIME', value: 0.10},
  {name: 'NICKEL', value: 0.05},
  {name: 'PENNY', value: 0.01}
];
function checkCashRegister(price, cash, cid) {
  //calculate change to return
  var change = cash - price;
  
  //calculate cash in the cid
  var totalCid = cid.reduce((acc, next) => acc + next[1], 0.0); //next[1] grabs the value from the key, value pair in the denominations array
   
  
  //basic change returns
  if(totalCid < change){
    return "Insufficient Funds";
  } else if(totalCid  === change){
    return "Closed";
  }
  
  //reverse the cid array because our denominations object is in descending order and cid is basically in ascending order
  cid = cid.reverse();
  
  var result = denominations.reduce(function(acc, next, index){
    if(change >= next.value){
      var currentValue = 0.0;
      while(change >= next.value && cid[index][1] >= next.value){
        currentValue += next.value;
        change -= next.value;
        change = Math.round(change * 100) / 100;  /*if we just round it we'll get a whole number which would be innaccurate, so we are multiplying the change by 100 so that we get a whole number and after that we divide the rounded number by 100 so that we get a more accurate decimal again i.e., rounding to decimal points*/
        cid[index][1] -= next.value; //after providing change, deduct the amount from the cid
      }
      acc.push([next.name, currentValue]);
      return acc;
    } else {
      return acc;
    }
  }, []);
  
  return result.length > 0 && change === 0 ? result :"Insufficient Funds";
}


checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

