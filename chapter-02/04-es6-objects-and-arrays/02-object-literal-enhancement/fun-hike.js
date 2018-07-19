console.log(`
  Object literal enhancement is the opposite
  of destructuring.  It is the process of restructuring or
  putting back together.  With object literal enhancement
  we can grab variables from the global scope and turn
  them into an object.
`);

var name = "Tallac";
var elevation = 9738;

var funHikeEs5 = {_name: name, _elevation: elevation};
var funHikeEs6 = {name, elevation};

console.log("funHikeEs5=", funHikeEs5);
console.log("funHikeEs6=", funHikeEs6);

var print = function(){
    console.log(`Mt. ${this.name} is ${this.elevation} feet tall.`);
}

funHikeEs5 = {name: name, elevation: elevation, print: print }

funHikeEs6 = { name, elevation, print }

funHikeEs5.print();
funHikeEs6.print();
