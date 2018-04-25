const deepPick = (fields, object={}, iteration=1) => {

	let sWho = `deepPick[${iteration}]`;

	console.log(`${sWho}: fields =`, fields);
	console.log(`${sWho}: object =`, object);
	console.log(`${sWho}: iteration = ${iteration}`);

	const [first, ...remaining] = fields.split(".")

	console.log(`${sWho}: first = '${first}'`)
	console.log(`${sWho}: remaining.length = ${remaining.length}`)
	console.log(`${sWho}: remaining.join(\".\") = ${remaining.join(".")}` )
	console.log(`${sWho}: object[first] = object['${first}'] = `, object[first] );

	//return (remaining.length != 0) ?
	//	deepPick(remaining.join("."), object[first]):
	//	object[first]
	if( remaining.length != 0 ){
		iteration++;
		console.log(`${sWho}: return deepPick(remaining.join(\".\")=${remaining.join(".")}, object[first] = object[${first}] = `, object[first], `, iteration = ${iteration} )...`); 
		return deepPick(remaining.join("."), object[first], iteration);
	}
	else {
		console.log(`${sWho}: finito!  return object[first] = object['${first}'] = `, object[first] )
		return object[first];
	}
}

var danielle = {
	type: "person",
	data: {
		gender: "female",
		info: {
			id: 22,
			fullname: {
				first: "Danielle",
				last: "Daniels"
			}
		}
	}
}

console.log(`danielle = `, JSON.stringify(danielle, null, '  '));

console.log();

["type", "data.info.fullname.first", "data.info", "rata", "data.info.bullname", "data.sinfo", "data.info.fullname.diddle"].forEach(
	value => {
		console.log(`deepPick("${value}", danielle)...`);
		let output = deepPick(value, danielle)
		console.log(`*** OUTPUT: deepPick("${value}", danielle) = `, output )
	}
);

console.log("Let off some steam, Bennett!");
