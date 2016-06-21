( function ( ctx ) {
	"use strict";

	function Deck( data ) {
		if ( !( this instanceof Deck ) ) return new Deck( data );

		this.activeSlideI = ko.observable( 0 );

		SObject.call( this, data || Deck.default, Deck.modelname );
	};

	Object.defineProperty( Deck, 'default', {
		enumerable: true,
		get: function () {
			return {
				reveal: {
					config: {
						transition: 'default',
						loop: false,
						controls: true,
						autoSlide: 0
					},
					// init: {},
					theme: ''
				},
				title: '',
				slides: [ ctx.Slide() ]
			};
		}
	} );

	Object.defineProperty( Deck, 'options', {
		enumerable: true,
		get: function () {
			return {
				transition: [ "none", "fade", "slide", "convex", "concave", "zoom", "default" ],
				theme: [ "black", "white", "league", "beige", "sky", "night", "serif", "simple", "solarized" ]
			};
		}
	} );

	Deck.modelname = 'deck';

	Deck.prototype = Object.create( SObject.prototype, {} );
	Deck.prototype.constructor = Deck;

	Deck.prototype.addSlide = function addSlide( data ) {
		this.data.slides.push( ctx.Slide( data ) );
	};

	Deck.prototype.getSlide = function getSlide( i ) {
		if ( i === null || i === undefined ) i = this.activeSlideI();
		return this.data.slides()[ i ];
	};

	Deck.prototype.removeSlide = function removeSlide( i ) {
		this.data.slides.splice( i, 1 );
		var l = this.data.slides().length;
		var i = this.activeSlideI();
		if ( i >= l ) this.activeSlideI( l - 1 );
	};

	Deck.prototype.moveSlide = function moveSlide( i, up ) {
		var slides = this.data.slides;
		var s = slides.splice( i, 1 )[ 0 ];
		slides.splice( i + ( up ? -1 : 1 ), 0, s );
	};

	Deck.prototype.toJS = function toJS() {
		var r = SObject.prototype.toJS.call( this );
		r.slides = r.slides.map( function ( s ) {
			return s.toJS();
		} );
		return r;
	};

	Deck.prototype.save = function save() {
		return SObject.prototype.save.call( this ).then( function () {
			console.log( 'saved' );
		}.bind( this ) ).catch( function ( e ) {
			console.log( e.stack || e );
		} );
	};

	ctx.Deck = Deck;

} )( window );
