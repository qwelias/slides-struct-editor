( function ( ctx ) {
	"use strict";

	ctx.typeOf = function typeOf( v ) {
		if ( Array.isArray( v ) ) return 'array';
		if ( v === null ) return 'null';
		if ( v.constructor && v.constructor.name !== 'Object' ) return v.constructor.name;
		return typeof v;
	};

	function SObject( data, model ) {
		if ( !( this instanceof SObject ) ) return new SObject( data, model );

		this.initial = JSON.parse( JSON.stringify( ko.toJS( data ) ) );

		this.model = model;

		this.data = SObject.fromJS( data );

	};

	SObject.fromJS = function fromJS( o ) {
		var out = {};
		Object.keys( o ).map( function ( k ) {
			if ( typeOf( o[ k ] ) === 'object' ) out[ k ] = fromJS( o[ k ] );
			else if ( typeOf( o[ k ] ) === 'array' ) out[ k ] = ko.observableArray( o[ k ] );
			else if ( typeOf( o[ k ] ) === 'function' ) out[ k ] = o[ k ];
			else return out[ k ] = ko.observable( o[ k ] );
		} );
		return out;
	};

	SObject.prototype.toJS = function toJS() {
		return ko.toJS( this.data );
	};

	SObject.prototype.save = function save() {
		return Server.save( '/api/' + this.model, this.toJS() );
	};

	ctx.SObject = SObject;
} )( window );
