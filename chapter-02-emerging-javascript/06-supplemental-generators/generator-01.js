// See https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5

function * generatorFunction() { // Line 1
  console.log('This will be executed first.');
  yield 'Hello, ';   // Line 2
  console.log('I will be printed after the pause');  
  yield 'World!';
}

console.log('* start...')
const generatorObject = generatorFunction(); // Line 3
console.log('* next()...')
console.log(generatorObject.next().value); // Line 4
console.log('* next()...')
console.log(generatorObject.next().value); // Line 5
console.log('* next()...')
console.log(generatorObject.next().value); // Line 6
console.log('* done...')
// This will be executed first.
// Hello, 
// I will be printed after the pause
// World!
// undefined
