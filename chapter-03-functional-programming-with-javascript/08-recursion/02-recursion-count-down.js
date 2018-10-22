const countdown1 = (value, fn) => {
	fn(value)

    // Eventually, the value will be zero,
    // and `countdown` will return that
    // value all the way back up the
    // call stack...
	return(value > 0)?
		countdown1(value-1, fn):
		value
    ;
}

const countdown2 = (value, fn, delay=1000) => {
	fn(value)

    // Eventually, the value will be zero,
    // and `countdown` will return that
    // value all the way back up the
    // call stack...
	return(value > 0)?
		setTimeout(()=>countdown2(value-1, fn), delay ) :
		value;
}

const log = value => console.log(value); 

let output1 = countdown1(10, log);
console.log("countdown1: output1=",output1);

console.log("");

output2 = countdown2(10, log);
console.log("countdown2: output2=",output2);
