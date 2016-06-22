"use strict";

const Log = require( 'debug' )( 'app:lib:reveal:tmpl' );

const attrs = ( attr ) => Object.keys( attr ).map( ( a ) => `${ a }="${ attr[a].trim() }"` ).join( ' ' );

const htmlContent = ( html ) => html ? `<div class="fragment-html">${ html }</div>` : '';

const fragment = ( f ) => {
	f.attr.class = `___fragment ${ f.attr.class || '' }`;
	if ( f.content.img )
		f.attr.style = `${f.attr.style || ''} background-image: url(${ f.content.img }); background-position: center; background-size: contain; background-origin: content-box; background-repeat: no-repeat;`;

	return `
<div ${ attrs( f.attr ) }>
	${ htmlContent( f.content.html ) }
</div>
`
};

const slide = ( s ) => {
	s.attr.class = `slide-view ${ s.attr.class || '' }`;
	return `
<section ${ attrs(s.attr) }>
    <span>${ s.title }</span>
    <div class="slide-fragments">
        ${ s.fragments.map( fragment ).join(' ') }
    </div>
</section>
`
};

const head = ( params ) => `
<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>${ params.title }</title>

    <link rel="stylesheet"
        href="../reveal/css/reveal.css">
    <link rel="stylesheet"
        href="../reveal/css/theme/${ params.reveal.theme }.css">
    <link rel="stylesheet"
        href="../css/deck.css">

    <!-- Printing and PDF exports -->
    <script>
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = window.location.search.match(/print-pdf/gi) ? '../reveal/css/print/pdf.css' : '../reveal/css/print/paper.css';
        document.getElementsByTagName('head')[0].appendChild(link);
    </script>
</head>
`;

const body = ( params ) => `
<body>
    <div class="reveal">
        <div class="slides">
            ${ params.slides.map( slide ).join(' ') }
        </div>
    </div>

    <script src="../reveal/lib/js/head.min.js"></script>
    <script src="../reveal/js/reveal.js"></script>

    <script>
        Reveal.initialize(${
            JSON.stringify( Object.assign(
                {},
                params.reveal.config,
                params.reveal.init
            ) )
        });
		Reveal.addEventListener( 'slidechanged', function( event ) {

		} );
    </script>
</body>
`;

module.exports = ( params ) => `
<!doctype html>
<html>
    ${ head( params ) }
    ${ body( params ) }
</html>
`;
