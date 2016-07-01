( function ( ctx ) {

	ctx.hidePopup = function hidePopup( ev ) {
		if ( ev.target.className == 'popup' ) ev.target.style.display = 'none';
	};

	Promise.all( ctx._vm.init ).then( function () {
		console.log( "INITED" );
		ctx.ko.applyBindings( ctx._vm );
	} ).catch( function ( e ) {
		console.log( "INIT ERR:", e );
	} );

} )( window );
