//import { createClockTime, appendAMPM, civilianHours, removeDate } from './timeFuncs'; 
const { createClockTime, appendAMPM, civilianHours, removeDate } = require('./timeFuncs'); 

// Not the best way to compose all of these into one function
const oneFunction = date =>
	removeDate(
          civilianHours(
              appendAMPM(
                  createClockTime(date)
              )
          )
   	)

console.log(`SHEMP: Moe, oneFunction(new Date()) = `, oneFunction(new Date()))
