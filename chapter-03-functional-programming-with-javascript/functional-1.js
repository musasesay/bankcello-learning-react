const insideFn = logger => logger("Functions can be sent to other functions as arguments");

insideFn(message => console.log(message))

const myLogger = message => console.log("myLogger says: \"" + message + "\"")

insideFn(myLogger)
