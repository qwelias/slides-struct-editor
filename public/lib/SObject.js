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

		this._id = data._id || null;

		delete data._id;
		delete data.__v;

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
		var r = ko.toJS( this.data );
		if ( this._id ) r._id = this._id;
		return r;
	};

	SObject.prototype.save = function save() {
		return Server.save( '/api/' + this.model, this.toJS() ).then( function ( data ) {
			if ( !this._id ) this._id = data.result._id;
		}.bind( this ) );
	};

	ctx.SObject = SObject;
} )( window );
