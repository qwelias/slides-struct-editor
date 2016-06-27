"use strict";

const deckBuilder = require( '../../lib/reveal' );
const deckTape = require( '../../lib/deckTape' );
const Log = require( 'debug' )( 'app:model:extender:deck' );

const useSchema = ( schema ) => {
	schema.post( 'save', ( doc ) => deckBuilder( doc.toObject() ).catch( ( e ) => Log( e.stack || e ) ) );

	schema.method( 'toPDF', deckTape );
};

const useModel = ( model ) => {

};

const useRouter = ( router ) => {

};

module.exports = {
	useSchema,
	useModel,
	useRouter
};
