"use strict";

const fs = require( 'fs' );
const config = require( '../../config' );
const path = require( 'path' );
const mkdirp = require( 'mkdirp' );
const tmpl = require( './tmpl' );
const Log = require( 'debug' )( 'app:lib:reveal' );

const decksFolder = path.resolve( config.root, 'public', 'decks' );

mkdirp( decksFolder );

const build = ( deck ) => {
	const html = tmpl( deck );
	return new Promise( ( resolve, reject ) => {
		fs.writeFile(
            path.resolve( decksFolder, `${ deck._id }.html` ),
            html,
            ( err, res ) => err ? reject( err ) : resolve( res )
        );
	} );
};

module.exports = build;
