// Functions can also be returned
// from other functions, just
// like variables...
var createWhisper = function(logger){
    let count=0
    return function(message){
        count++
        logger(`whisper #${count}: ${message}\n`)
    }
}

var createWhisperArrow = logger => {
    let count=0
    return message => logger(`arrow whisper #${++count}: ${message}\n`)
}

const whisper = createWhisper(message=>console.log(message))

const whisperArrow = createWhisperArrow(message=>console.log(message))

whisper('Functions can be returned from other functions')

whisper('`createWhisper()` is a function that takes a `logger` function and uses it to creates and return a function with the `logger` function hermetically sealed in it due to a `closure`...')

whisper('We also have -- just to be fancy -- a count variable sealed into the createWhisper closure...avoiding Global Namespace Pollution, my hippies...')

whisper('`whisper` invokes that returned function')

let messages = ['BANKCELLO: Count the number of arrows in a function...',
'BANKCELLO(CONTINUED): If there is more than one arrow, it\'s a higher order function.',
'BANKCELLO: We can say that JavaScript is a functional language because its functions are first-class citizens.  This means that functions are data.  They can be saved, retrieved, or flow through your applications just like variables.'
]

messages.forEach( message => whisperArrow(message) )
