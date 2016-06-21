( function ( ctx ) {

	ctx.hidePopup = function hidePopup( ev ) {
		if ( ev.target.className.indexOf( 'popup' ) > -1 ) ev.target.style.display = 'none';
	};

	Promise.all( ctx._vm.init ).then( function () {
		console.log( "INITED" );
		console.log( ctx._vm.deck );

		ctx.ko.applyBindings( ctx._vm );
	} ).catch( function ( e ) {
		console.log( "INIT ERR:", e );
	} );

} )( window );
