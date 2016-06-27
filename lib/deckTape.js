"use strict";

const Log = require( 'debug' )( 'app:lib:decktape' );
const cp = require( 'child_process' );

module.exports = function toPDF() {
	if ( !this._id ) return;
	return new Promise( ( resolve, reject ) => {
		cp.exec(`docker run --rm -v \`pwd\`:/pwd astefanutti/decktape reveal `)
	} )
};
