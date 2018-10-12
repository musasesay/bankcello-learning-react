//import { createClockTime, appendAMPM, civilianHours, removeDate } from './timeFuncs'; 
const { createClockTime, appendAMPM, civilianHours, removeDate } = require('./timeFuncs'); 

// A more elegant approach to composition
// The spread operator turns function arguments into an array called `fns`
// A function is then returned that expects one argument, `arg`.
// When this function is invoked, the `fns` array is piped starting with the
// argument we want to send through the function.  
// The argument becomes the initial value for `reduce()` and then
// each iteration of the reduced callback returns...
const compose = (...fns) =>
      (arg) =>
      fns.reduce(
        //(composed, f) => f(composed),
        (composed, f) => {
			console.log("SHEMP: reduce() callback: Returning " + f.name + "(" + JSON.stringify(composed) + ")..."); 
			return f(composed)
		},
        arg
)

const oneFunction = compose(
      createClockTime,
      appendAMPM,
      civilianHours,
      removeDate
)

console.log(`SHEMP: Moe, oneFunction(new Date()) = `, oneFunction(new Date()))
