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
				content: ''
			};
		}
	} );

	Fragment.prototype = Object.create( SObject.prototype, {} );
	Fragment.prototype.constructor = Fragment;

	delete Fragment.prototype.save;

	ctx.Fragment = Fragment;

} )( window );
