/**
 * @file 
 **/

const { Readable } = require('stream'); 

const myStreamableThing = new Readable({
	// We have to implement a custom `read` function, the other methods like `push` and `pipe` are provided by `Readable`
  read() {}
});

myStreamableThing.push('Strea');
myStreamableThing.push('ms are ');
myStreamableThing.push('easy!');

// Signal we're done
myStreamableThing.push(null);

//myStreamableThing.pipe(process.stdout);

exports.myStreamableThing = myStreamableThing
