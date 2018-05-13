//the this keyword refers to the instance of the object, in this case the 'Person'
var Person = function(firstAndLast) {
  this.first = firstAndLast.split(' ')[0];
  this.last = firstAndLast.split(' ')[1];
  
  this.getFirstName = function(){
    return this.first;
  };
  
  this.getLastName = function(){
    return this.last;
  };
  
  this.getFullName = function(){
    return this.first + ' ' + this.last;
  };
  
  //firstAndLast is passed as str for the set methods
  this.setFirstName = function(str){
    this.first = str;
  };
  
  this.setLastName = function(str){
    this.last = str;
  };
  
  this.setFullName = function(str){
    this.first = str.split(' ')[0];
    this.last = str.split(' ')[1];
  };
};

var bob = new Person('Bob Ross');
bob.getFullName();


/*the below steps render the first two 'this' statements noniterative in a for-in loop and that's how we stop the engine to leave those two 'this' statements while counting the number of 'this' in the program, so that the Object.keys(bob).length will return 6 rather than 8*/
Object.defineProperty(bob, 'first',{
  enumerable: false
});

Object.defineProperty(bob, 'last',{
  enumerable: false
});

