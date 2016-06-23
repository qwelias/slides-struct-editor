( function ( ctx ) {
	"use strict";

	function Deck( data ) {
		if ( !( this instanceof Deck ) ) return new Deck( data );

		this.activeSlideI = ko.observable( 0 );

		ctx.SObject.call( this, data || Deck.default, Deck.modelname );
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

	Deck.prototype = Object.create( ctx.SObject.prototype, {} );
	Deck.prototype.constructor = Deck;

	Deck.prototype.addSlide = function addSlide( data ) {
		this.data.slides.push( ctx.Slide( data ) );
	};

	Deck.prototype.getSlide = function getSlide( i ) {
		if ( i === null || i === undefined ) i = this.activeSlideI();
		return this.data.slides()[ i ];
	};

	Deck.prototype.getContentsHTML = function getContentsHTML() {
		var slides = this.data.slides();
		return "<div class='deck-contents'><div>" +
		slides.map( function ( s ) {
			return s.getContentsHTML();
		} ).join( "</div><div>" ) +
		"</div></div>";
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
		var r = ctx.SObject.prototype.toJS.call( this );
		r.slides = r.slides.map( function ( s ) {
			return s.toJS();
		} );
		return r;
	};

	Deck.prototype.save = function save() {
		return ctx.SObject.prototype.save.call( this ).then( function () {
			console.log( 'saved' );
		}.bind( this ) ).catch( function ( e ) {
			console.log( e.stack || e );
		} );
	};

	Deck.prototype.open = function open() {
		return this.save().then( function () {
			var win = ctx.open( '/decks/' + this._id + '.html', '_blank' );
			if ( win ) win.focus();
			else alert( 'Please allow popups for this site' );
		}.bind( this ) );
	};

	Deck.load = function load( id ) {
		return ctx.Server.get( '/api/' + Deck.modelname + "/" + id ).then( function ( data ) {
			var deck = data.result;
			deck.slides = deck.slides.map( function ( s ) {
				s.fragments = s.fragments.map( function ( f ) {
					return ctx.Fragment( f );
				} );
				return ctx.Slide( s );
			} );
			return Deck( deck );
		} );
	};

	ctx.Deck = Deck;

	ctx._vm.init.push( Deck.load( "576bccb6ceacb6e11d238973" ).then( function ( deck ) {
		ctx._vm.deck = ko.observable( deck );
	} ).catch( function ( e ) {
		ctx._vm.deck = ko.observable( Deck() );
	} ) )

} )( window );
