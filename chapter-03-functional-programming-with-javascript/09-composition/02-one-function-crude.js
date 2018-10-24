//import { createClockTime, appendAMPM, civilianHours, removeDate } from './timeFuncs'; 
const { createClockTime, appendAMPM, civilianHours, removeDate } = require('./timeFuncs'); 

// Not the best way to compose all of these into one function
// But then again, if you look at https://redux.js.org/api/compose,
// they say...
//   "All compose does is let you write deeply nested function
//   transformations without the rightward drift of the code.
//   Don't give it too much credit!"
const oneFunction = date =>
	removeDate(
          civilianHours(
              appendAMPM(
                  createClockTime(date)
              )
          )
   	)

console.log(`SHEMP: Moe, widhout usin' compose(), oneFunction(new Date()) = `, oneFunction(new Date()))
