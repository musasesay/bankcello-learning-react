const template = "hh:mm:ss tt"

const clockTime = template.replace("hh", "03")
	.replace("mm", "33")
   	.replace("ss", "33")
   	.replace("tt", "PM")

console.log(`clockTime="${clockTime}"`)
console.log("Let off some steam, Bennett!")
