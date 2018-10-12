let rp = require('request-promise-native');

/** Returns a promise */
const getFakeMembers = count => new Promise((resolves, rejects) => {

	// NERO WOLFE: The "dot m-e" domain is Montenegro, Archie...
	const api_url = `https://api.randomuser.me/?nat=US&results=${count}`

	let bBrowser = false
	if( bBrowser ){
		// SCOTTIE: How quaint!  Using XMLHttpRequest() rather than fetch API...!
		const request = new XMLHttpRequest()
		request.open('GET', api_url );
		request.onload = () => 
			( request.status === 200 )?
				resolves(JSON.parse(request.response).results) :
				rejects(Error(request.statusText))
	
		request.onerror = (err) => rejects(err)
	
		request.send()
	}
	else{
		var options = {
		    method: 'GET',
		    uri: api_url,
		    resolveWithFullResponse: true
		};

		console.log(`Doing request-promise on "${api_url}"...`);
		rp(options)
		.then( (response) => {
			console.log("GET succeeded with status", response.statusCode);	
			//console.log("response = ", response);
			//console.log("response.body = ", response.body);
			//console.log("JSON.parse(response.body) = ", JSON.parse(response.body));
			//console.log("response.body.results = ", response.body.results);
			//resolves(JSON.parse(request.response).results) :
			//resolves(["Moe", "Larry", "Shemp"])
			resolves(JSON.parse(response.body).results)		
		})
		.catch( (err) => {
			console.log("GET failed with err", err );
       	 	// failed...
			rejects(Error(err))
	    });
	}

})

module.exports = getFakeMembers;
