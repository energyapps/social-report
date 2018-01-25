$(document).ready ( function() {
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
	var counterList = document.querySelectorAll( '.counter' );
	// find each social platform section
	var sectionList = document.querySelectorAll( '.section' );

	// loop through all the sections
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

		// console.log ( "INDEX: " + index +  " PIN: " + pin + " TRIGGER: " + b + " OFFSET: " + t + " HEIGHT: " + h );
		// console.log ( controller.info() );
		// declare the function for the scroll trigger
		// if ( t < $(window).scrollTop() < h + $(window).scrollTop() ) {
			// create scroll scene
			var sectionScene = new ScrollMagic.Scene({
				triggerElement: b,
				duration: h,
				// offset: 0
				offset: h + 60
			})
			.setPin( b, {
				pushFollowers: false
			})		
			.setClassToggle( b, "show" ) // add class toggle
			.addIndicators() // add trigger indicators (requires plugin)
			.addTo(controller);

			// loop through all counters
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
			        animatedNumb.start( /*console.log( "the number has been logged for " + counterID )*/ );
			    } else { // function error
			        console.error( animatedNumb.error );
			        // console.log( isNaN(settings.startVal) );
			    }
		    });
		// } else {
		// 	controller.removeScene(sectionScene);
		// }
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