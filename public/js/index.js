( function (ctx) {

	Promise.all( ctx._vm.init ).then( function () {
		console.log( "INITED" );
	} ).catch( function ( e ) {
		console.log( "INIT ERR:", e );
	} );

	ctx._vm.deck = ctx.Deck();

	ctx.ko.applyBindings( ctx._vm );

} )(window);
