const factorial = (value, fn) => {

	fn(value)

	if(value == 0){
        return 1;
    }
    else{
        return value*factorial(value-1, fn);
    }

}

const log = value => console.log("factorial: ", value); 

let output = factorial(4, log);
console.log("output = ", output);
