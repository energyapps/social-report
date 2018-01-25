$(document).ready ( function() {
	/** COUNTERS: IMPRESSIONS
	*** uses countup.js
	**/
	// find all elements with counter class
	var counterList = document.querySelectorAll( '.counter' );

	// loop through all target objects in array
	jQuery.each( counterList, function( i, val ) {
        // get target element id
        counterID = val.id;
        // console.log(counterID);
        // get target element counter parameters
		var cParams = document.getElementById( counterID );

		// declare the function for the count
	    var animatedNumb = new CountUp( counterID , cParams.dataset.startval, cParams.dataset.endval, 0, cParams.dataset.duration );
	    //execute the function and output message to console
	    if ( !animatedNumb.error ) { // function ok
	        animatedNumb.start( /* console.log( "the number has been logged for " + counterID )*/ );
	    } else { // function error
	        console.error( animatedNumb.error );
	        // console.log( isNaN(settings.startVal) );
	    }
    });

    // init ScrollMagic controller
	var controller = new ScrollMagic.Controller({
		loglevel: 3, // console log
		globalSceneOptions: { // default scene settings
			triggerHook: 'onCenter',
			offset: 20,
			reverse: true
		} 
	});

	// find all elements with counter class
	var sectionList = document.querySelectorAll( '.section' );

	// loop through all target objects in array
	jQuery.each( sectionList, function( s, val ) {
        // get target element id
        sectionID = val.id;
        // console.log(sectionID);
        // get target element counter parameters
		var sParams = document.getElementById( sectionID );
		var index = $(sParams).index();
		var pin = '#' + sectionID;
		var b = '#' + $(sParams).data("brand");
		var t = $(sParams).eq(index - 1 * index).offset().top;
		var h = $(sParams).height();

		/*if ( $(sParams).height() > $(window).height() ) {
			h = $(sParams).height();
		} else {
			h = 0;
			// $(sParams).css({display:"none"});
		}*/
		console.log ( "INDEX: " + index +  " PIN: " + pin + " brand: " + b + " offset: " + t + " height: " + h );
		// declare the function for the scroll trigger
		if ( t < $(window).scrollTop() < h + $(window).scrollTop() ) {
			var sectionID = new ScrollMagic.Scene({
				triggerElement: b,
				duration: h,
				// offset: 0
				offset: h + 60
			})
			.setPin( b, {
				pushFollowers: true
			})		
			.setClassToggle( b, "show" ) // add class toggle
			.addIndicators() // add trigger indicators (requires plugin)
			.addTo(controller);
		} else {
			controller.removeScene(sectionID);
		}
    });
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