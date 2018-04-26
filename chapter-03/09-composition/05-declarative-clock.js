//
// Functions that give us values and manage the console...
//

const oneSecond = () => 1000

const getCurrentTime = () => new Date()

const clear = () => console.clear()

const log = message => console.log(message)
  
//
// Functions for transforming data...for mutating
// the Date object into an object that can be
// used for our clock...all transform data
// without changing the original, treating
// their arguments as immutable objects...
//

/** Takes a date object and returns an object
* for clock time that contains hours, minutes,
* and seconds.
*/
const serializeClockTime = date => 
({
	hours: date.getHours(),
	minutes: date.getMinutes(),
	seconds: date.getSeconds()
})

/** Takes the clock time object and 
* returns an object where hours are converted
* to civilian time.
*
* For example: 1300 becomes 1 o'clock
*/
const civilianHours = clockTime => 
({
	...clockTime,
	hours: ( clockTime.hours > 12 )?
				clockTime.hours-12:
				clockTime.hours
})

/** Takes the clock time object and
* appends time of day, "AM" or
* "PM" to that object as "ampm"
* field.
*/
const appendAMPM = clockTime => 
({
	...clockTime,
	ampm: ( clockTime.hours > 12 )?
				"PM" :
				"AM"
})

//
// Higher Order Functions
//

/** Takes a target function and returns
* a function that will send a time
* to the target.  In this example, the
* target will be console.log().
*/
const display = target => time => target(time)

/** Takes a template string and uses it to return
* clock time formatted based upon the criteria
* from the string. In this example, the template is
* "hh:mm:ss:tt".  From there, `formatClock()` will 
* replace the placeholders with hours, minutes, seconds,
* and time of day.
*/
const formatClock = format => time => 
	format.replace("hh", time.hours)
          .replace("mm", time.minutes)
          .replace("ss", time.seconds)
          .replace("tt", time.ampm)

/** Takes an object's key as an argument
* and conditionally prepends a zero to the value stored
* under that object's key.  It takes in a key to 
* a specific field and prepends values 
* with a zero if the value is less than 10.
*
* Use this function to ensure that a value
* is two digits by left-padding with a
* zero if necessary.
*/
const prependZero = key => clockTime => 
({
	...clockTime,
	[key]: (clockTime[key] < 10 ) ?
		"0" + clockTime[key] :
		clockTime[key]
})


/** Our compose function, to handle composition
* of functions...
*
* A more elegant approach to composition
* The spread operator turns function arguments into an array called `fns`
* A function is then returned that expects one argument, `arg`.
* When this function is invoked, the `fns` array is piped starting with the
* argument we want to send through the function.  
* The argument becomes the initial value for `reduce()` and then
* each iteration of the reduced callback returns...
*/
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

// Compose our functions to build a clock...

/** A single function that will take clock time as an
* argument and transforms it into civilian time by
* using both civilianHours() and appendAMPM().
*/
const convertToCivilianTime = clockTime => 
	compose(
		appendAMPM,
		civilianHours
	)(clockTime)

/** A single function that will take civilian clock time
* and make sure the hours, minutes, and seconds
* display double digits by prepending zeros where
* needed.
*/
const doubleDigits = civilianTime => 
	compose(
		prependZero("hours"),
		prependZero("minutes"),
		prependZero("seconds")
	)(civilianTime)


const startTicking = () => 
	setInterval(
		compose(
			clear,
			getCurrentTime,
			serializeClockTime,
			convertToCivilianTime,
			doubleDigits,
			formatClock("hh:mm:ss tt"),
			display(log)
		),
		oneSecond()
	)

//startTicking();

const tickTock = (my_format) =>
	compose(
		clear,
		getCurrentTime,
		serializeClockTime,
		convertToCivilianTime,
		doubleDigits,
		formatClock(my_format),
		display(log)
	)

const format = "The time is hh:mm:ss tt";

const tickTockClock = tickTock(format);

const startTickingTwo = () => 
	setInterval(
		()=>tickTockClock(),
		oneSecond()
	)

startTickingTwo();
