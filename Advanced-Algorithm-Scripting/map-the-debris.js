function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var newArr = [];
  var getOrbPeriod = function(obj){
    var a = 2 * Math.PI * Math.sqrt((Math.pow(earthRadius + obj.avgAlt, 3))/GM);
    var orbPeriod = Math.round(a);
    delete obj.avgAlt;
    obj.orbitalPeriod = orbPeriod;
    return obj;
  };
  
  for(var elem in arr){
    newArr.push(getOrbPeriod(arr[elem]));
  }
  return newArr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);

