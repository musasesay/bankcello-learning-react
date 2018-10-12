const getFakeMembers = require('../../chapter-02/05-promises/getFakeMembers.js');

console.log("TIM CURRY: Currying...");

const userLogs = (userName) => (message) =>
	console.log(`${userName}: ${message}`)

const log = userLogs("shadrach-27")

const numMembers = 5

log(`attempt to load ${numMembers} fake members...`)

getFakeMembers(numMembers).then(
	members => {
		log(`successfully loaded ${members.length} members`)
		members.forEach( (member, index)=> {
			console.log("===============================\n", 
			`member[${index}] = `, member, "\n",
			"==========================")
		} )
		log("Let off some steam, Bennett!")
	},
	error => log("encountered an error loading members")
)
