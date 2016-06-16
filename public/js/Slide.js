( function ( ctx ) {
	"use strict";

	function Slide( data ) {
		if ( !( this instanceof Slide ) ) return new Slide( data );
		SObject.call( this, data || Slide.default );
	};

	Object.defineProperty( Slide, 'default', {
		enumerable: true,
		get: function () {
			return {
				attr: {},
				fragments: [],
				title: ''
			};
		}
	} );

	Object.defineProperty( Slide, 'layouts', {
		enumerable: true,
		get: function () {
			return {
				single: 1,
				"one-v-one": 2,
				"one-h-one": 2,
				"two-v-one": 3,
				"one-v-two": 3,
				"two-h-one": 3,
				"one-h-two": 3,
				four: 4
			};
		}
	} );

	Slide.prototype = Object.create( SObject.prototype, {} );
	Slide.prototype.constructor = Slide;

	Slide.prototype.toJS = function toJS() {
		var r = SObject.prototype.toJS.call( this );
		r.fragments = r.fragments.map( function ( s ) {
			return s.toJS();
		} );
		return r;
	};

	Slide.prototype.setLayout = function setLayout( name ) {
		var attr = this.data.attr();
		var fragments;
		if ( !Slide.layouts[ name ] ) return;
		attr.class = name;
		fragments = new Array( Slide.layouts[ name ] ).fill( ctx.Fragment() );
		this.data.attr( attr );
		this.data.fragments( fragments );
	};

	delete Slide.prototype.save;

	ctx.Slide = Slide;

} )( window );
