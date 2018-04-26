//const createClockTime = date => ({date})
const createClockTime = date => {
	let sWho = "createClockTime"
	console.log(`${sWho}(): input: date = ${JSON.stringify(date)}...`)
	let returno = {date}
	console.log(`${sWho}(): returning ${JSON.stringify(returno)}...`)
	return returno
};

//const appendAMPM = ({date}) =>
//({
//	date,
//	ampm: (date.getHours() >= 12) ? "PM" : "AM"
//})

const appendAMPM = ({date}) =>
{
let sWho = "appendAMPM";

console.log(`${sWho}(): input (by destructuring of {date} ): date = ${JSON.stringify(date)}...`)

let returno = {
	date,
	ampm: (date.getHours() >= 12) ? "PM" : "AM"
}

console.log(`${sWho}(): returning ${JSON.stringify(returno)}...`)

return returno

}

const civilianHours = clockTime => {

	let sWho = "civilianHours";

	console.log(`${sWho}(): input: clockTime = ${JSON.stringify(clockTime)}...`)

	const hours = clockTime.date.getHours()

	console.log(`${sWho}(): hours = ${JSON.stringify(hours)}...`)

	let returno = Object.assign( {}, clockTime, {hours: ( (hours > 12) ?  hours - 12 : hours )} );

	// ES6:
	//let returno = {
    //    ...clockTime,
    //    hours: ( (hours > 12) ?  hours - 12 : hours )
	//}

	console.log(`${sWho}(): returning ${JSON.stringify(returno)}...`)

	return returno

}

/** Removes `date` field from `clockTime` object. */
const removeDate = clockTime => {

	  let sWho = "removeDate";

	  console.log(`${sWho}(): INPUT: clockTime = `, clockTime );

      //let newTime = Object.assign({}, clockTime);

	  // ES6 - use spread operator...
      let newTime = {...clockTime}

      delete newTime.date

	  console.log(`${sWho}(): OUTPUT: returning newTime = `, newTime );
      return newTime
}

//export { createClockTime,  appendAMPM, civilianHours, removeDate } 
module.exports = { createClockTime,  appendAMPM, civilianHours, removeDate } 
