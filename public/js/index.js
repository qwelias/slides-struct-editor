( function () {

	Promise.all( window._vm.init ).then( function () {
		console.log( "INITED" );
	} ).catch( function ( e ) {
		console.log( "INIT ERR:", e );
	} );

	window.ko.applyBindings( window._vm );

} )();
