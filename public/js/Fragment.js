( function ( ctx ) {
	"use strict";

	function Fragment( data ) {
		if ( !( this instanceof Fragment ) ) return new Fragment( data );

		SObject.call( this, data || Fragment.default );
	};

	Object.defineProperty( Fragment, 'default', {
		enumerable: true,
		get: function () {
			return {
				attr: {
					"data-autoslide": 0
				},
				title: '',
				content: {
					generate: {
						document: '',
						year: '',
						period: '',
						report: '',
						mode: ''
					},
					img: '',
					html: '',
					markdown: ''
				}
			};
		}
	} );

	Fragment.prototype = Object.create( SObject.prototype, {} );
	Fragment.prototype.constructor = Fragment;

	Fragment.prototype.getBGStyle = function getBGStyle() {
		var src = this.data.content.img();
		if ( src ) return 'background-image: url(' + src + '); background-position: center; background-size: contain; background-origin: content-box; background-repeat: no-repeat;';
	};

	Fragment.prototype.getContentsHTML = function getContentsHTML() {
		var title = this.data.title() || this.data.content.generate.document();
		if( title ) return "<li>" + title + "</li>";
		return '';
	};

	delete Fragment.prototype.save;

	ctx.Fragment = Fragment;

} )( window );
