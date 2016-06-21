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
					"data-autoslide": '1'
				},
				title: '',
				content: {
					document: '',
					year: '',
					period: '',
					report: '',
					mode: '',
					src: ''
				}
			};
		}
	} );

	Fragment.prototype = Object.create( SObject.prototype, {} );
	Fragment.prototype.constructor = Fragment;

	Fragment.prototype.getBGStyle = function getBGStyle(){
		var src = this.data.content.src();
		if( src ) return 'background-image: url('+src+'); background-position: center; background-size: contain; background-origin: content-box; background-repeat: no-repeat;';
	};

	delete Fragment.prototype.save;

	ctx.Fragment = Fragment;

} )( window );
