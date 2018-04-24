const getFakeMembers = require('./getFakeMembers.js');

let numRequesting = 5;

console.log("numRequesting = ", numRequesting);

getFakeMembers(numRequesting)
.then(
	members => {
		console.log("Got from getFakeMembers(): ", members)
		console.log("Let off some steam, Bennett!")
	},
	err => console.error(
		new Error(`Cannot load members from randomuser.me: "${err}"`)
	)
)
.catch( (err) => {
	console.log("Caught error from getFakeMembers(): ", err );
});
