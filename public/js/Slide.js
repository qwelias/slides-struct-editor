( function ( ctx ) {
	"use strict";

	function Slide( data ) {
		if ( !( this instanceof Slide ) ) return new Slide( data );

		this.activeFragment = ko.observable();

		SObject.call( this, data || Slide.default );

		this.data.attr.class.subscribe( Slide.prototype.setLayout.bind( this ) );
	};

	Object.defineProperty( Slide, 'default', {
		enumerable: true,
		get: function () {
			return {
				attr: {
					class: 'single',
					"data-autoslide": '0',
					"data-transition": 'default'
				},
				fragments: [ ctx.Fragment() ],
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
		var old = this.data.fragments();
		var fragments = new Array( Slide.layouts[ name ] || 1 ).fill( 0 ).map( function ( f, i ) {
			return old[ i ] || ctx.Fragment();
		} );
		this.data.fragments( fragments );
	};

	Slide.prototype.openConfig = function openConfig( fragment ) {
		this.activeFragment( fragment );
		ctx.$( '#fragment-config' ).show();
	};

	delete Slide.prototype.save;

	ctx.Slide = Slide;

} )( window );
