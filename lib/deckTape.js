"use strict";

const Log = require( 'debug' )( 'app:lib:decktape' );
const cp = require( 'child_process' );
const path = require( 'path' );
const mkdirp = require( 'mkdirp' );
const rimraf = require( 'rimraf' );
const config = require( '../config' );

rimraf.sync( path.resolve( config.root, 'temp' ) );
mkdirp.sync( path.resolve( config.root, 'temp' ) );

module.exports = function toPDF() {
	let id = this._id;
	if ( !id ) return;
	let cwd = path.resolve( config.root );
	let inp = path.join( '/cwd', 'public', 'decks', `${ id }.html` );
	let pdf = path.join( 'temp', `${ id }.pdf` );
	let outp = path.resolve( '/cwd', pdf );
	let command = `docker run --rm -v ${ cwd }:/cwd astefanutti/decktape reveal ${ inp } ${ outp }`;
	return new Promise( ( resolve, reject ) => {
		Log( command );
		cp.exec( command, ( e, stdo, stde ) => {
			Log( e, stdo, stde );
			if ( e || stde ) return reject( e || stde );
			return resolve( path.resolve( config.root, pdf ), stdo );
		} );
	} )
};
