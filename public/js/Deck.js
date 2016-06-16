( function ( ctx ) {
	"use strict";

	function Deck( data ) {
		if ( !( this instanceof Deck ) ) return new Deck( data );
		this.activeSlideI = ko.observable(0);
		SObject.call( this, data || Deck.default, Deck.modelname );
	};

	Object.defineProperty( Deck, 'default', {
		enumerable: true,
		get: function () {
			return {
				reveal: {
					config: {},
					init: {},
					theme: ''
				},
				title: '',
				slides: [ctx.Slide()]
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
		if(i === null || i === undefined) i = this.activeSlideI();
		return this.data.slides()[i];
	};

	Deck.prototype.removeSlide = function removeSlide( i ) {
		this.data.slides.remove( i );
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
