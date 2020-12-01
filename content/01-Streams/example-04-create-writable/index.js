/**
 * @file Example of creating a custom writable stream
 **/

const { Writable } = require('stream'); 

const myWritableThing = new Writable({
	// Normally we'd be writing to a file, into memory, or pushing to data to another location. For this example we'll just store the data here
	data: '',

	// We have to implement a custom `write` function, the other methods like `end` are provided by `Writable`
	write(data) {
		this.data += data
	}
});


exports.myWritableThing = myWritableThing
