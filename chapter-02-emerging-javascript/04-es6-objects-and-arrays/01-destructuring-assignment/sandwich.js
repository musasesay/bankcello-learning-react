console.log(`
   The destructuring assignment allows you to locally
   scope fields within an object and to declare which
   values will be used.

   The code pulls \`bread\` and \`meat\` out of the object
   and creates local variables for them.
`);

var sandwich = {
    bread: "dutch crunch",
    meat: "tuna",
    cheese: "swiss",
    toppings: ["lettuce", "tomato", "mustard"]
}

console.log("sandwich=", sandwich);

var breadEs5 = sandwich.bread;
var meatEs5 = sandwich.meat;

console.log("breadEs5=", breadEs5);
console.log("meatEs5=", meatEs5);

var {breadEs6, meatEs6} = sandwich

console.log("breadEs6=", breadEs6);
console.log("meatEs6=", meatEs6);

var {bread, meat} = sandwich

console.log("bread=", bread);
console.log("meat=", meat);

console.log(`
  Also, as with any local variables, they
  they can be changed...
`);

bread = "garlic";
meat = "turkey";

console.log(`bread=${bread}`);
console.log(`meat=${meat}`);

console.log(`sandwich.bread=${sandwich.bread}, sandwich.meat=${sandwich.meat}...`);
