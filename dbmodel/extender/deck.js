"use strict";

const deckBuilder = require( '../../lib/reveal' );
const deckTape = require( '../../lib/deckTape' );
const MW = require( '../../lib/mw' );
const fs = require( 'fs' );
const Log = require( 'debug' )( 'app:model:extender:deck' );

const useSchema = ( schema ) => {
	schema.post( 'save', ( doc ) => deckBuilder( doc.toObject() ).catch( ( e ) => Log( e.stack || e ) ) );

	schema.method( 'toPDF', deckTape );
};

const useModel = ( model ) => {

};

const useRouter = ( router, modelname ) => {
	router.get( '/pdf/:id',
		MW.find( modelname ),
		( req, res ) => {
			req.locals[ modelname ].toPDF().then( ( path ) => {
				fs.readFile( path, ( e, data ) => {
					res.contentType( "application/pdf" );
					res.send( data );
				} );
			} ).catch( ( e ) => {
				Log( e.stack || e );
				res.status( 500 ).end();
			} );
		}
	);
};

module.exports = {
	useSchema,
	useModel,
	useRouter
};
