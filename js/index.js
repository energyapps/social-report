$(document).ready ( function() {
	/** COUNTERS: IMPRESSIONS
	*** uses countup.js
	**/
	// find all elements with counter class
	var targetList = document.querySelectorAll( '.counter' );

	// loop through all target objects in array
	jQuery.each( targetList, function( i, val ) {
        // get target element id
        targetID = val.id;
        // console.log(targetID);
        // get target element counter parameters
		var params = document.getElementById( targetID );

		// declare the function for the count
	    var animatedNumb = new CountUp( targetID , params.dataset.startval, params.dataset.endval, 0, params.dataset.duration );
	    //execute the function and output message to console
	    if ( !animatedNumb.error ) { // function ok
	        animatedNumb.start( /* console.log( "the number has been logged for " + targetID )*/ );
	    } else { // function error
	        console.error( animatedNumb.error );
	        // console.log( isNaN(settings.startVal) );
	    }
    });

    // init ScrollMagic controller
	var controller = new ScrollMagic.Controller({
		loglevel: 0, // console log
		globalSceneOptions: {duration: 1000} // default scene settings
	});

	// set tween for logos
	// var logo = document.getElementById( "facebook" );
	// var tween = TweenLite.from( logo, 0.75, {scale: 0.2, opacity: 0.3 } );

	// build ScrollMagic scenes
	var scene = new ScrollMagic.Scene({
			triggerElement: "#section-1",
			triggerHook: 'onLeave',
			// offset: 200,
			// duration: ,
			loglevel: 2
		})
		.setPin("#facebook")
		.setClassToggle( $( '#facebook.brand' ), "show" ) // add class toggle
		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);
});

/* Parallax function */ // requires jquery
$( 'section.parallax' ).css( 'background', function () {
    var bg = ( 'url(' + $( this ).data( 'image-src' ) + ') no-repeat center fixed' );
    return bg;
});

/* Scroll functions */
$( window ).scroll( function(){
	// fade the title when user scrolls down
	$( '.title' ).css( 'opacity', 1 - $(window).scrollTop() / 100 );
});