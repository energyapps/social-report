$(document).ready ( function() {
	console.log( "Page loaded. Jquery is running. Now, do stuff.");

    // Google sheets ID
	// share url: https://docs.google.com/spreadsheets/d/19wQJE6SrUrp3Li_O_507Z2myD7Jpf_XB4r99ajR14TY
	var public_spreadsheet_url = '19wQJE6SrUrp3Li_O_507Z2myD7Jpf_XB4r99ajR14TY';

	// function for initializing tabletop
	function loadSpreadsheet() {
		// Multisheet version: 
	    Tabletop.init( { key: public_spreadsheet_url,
	         callback: showInfo,
	         wanted: [ "energy_social", "energy_youtube", "s1_social" ], // specifying sheets to load
	         parseNumbers: true/*,
	         postProcess: function(element) {
	            // convert string date to Date date
	            element["launch_date"] = Date.parse(element["launch_date"]);
	         }*/
	     })
	}

    // load spreadsheet data
    loadSpreadsheet();

    // init ScrollMagic controller
	var controller = new ScrollMagic.Controller({
		loglevel: 0, // console log level of detail
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
		// var pin = '#' + sectionID;
		var b = '#' + $(sParams).data("brand");
		var t = $(sParams).eq(index - 1 * index).offset().top;
		var h = $(sParams).height();
		// console.log ( "INDEX: " + index + " TRIGGER: " + b + " OFFSET: " + t + " HEIGHT: " + h );

		// create new scroll scene for each section
		var sectionScene = new ScrollMagic.Scene({
			triggerElement: b,
			duration: h,
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
	        // get target counter id
	        counterID = val.id;
	        // get target counter parameters
			var cParams = document.getElementById( counterID );

			// set variable for parent ID
			var parent = $( cParams ).parentsUntil( $("#content"), ".section" );
			var parentTop = $( parent ).offset().top;
			// console.log ( "ELEMENT TOP: " + parentTop + " WINDOW TOP: " + $(window).scrollTop() );
			/// USE SCROLLMAGIC HERE TO CONTINUOUSLY GET WINDOW SCROLL LOCATION

			// if ( $(window).scrollTop() == parentTop ) {
				// declare the function for the count
			    var animatedNumb = new CountUp( counterID , cParams.dataset.startval, cParams.dataset.endval, 0, cParams.dataset.duration );
			    //execute the function and output message to console
			    if ( !animatedNumb.error ) { // function ok
			        animatedNumb.start( /*console.log( "the number has been logged for " + counterID )*/ );
			    } else { // function error
			        console.error( animatedNumb.error );
			        // console.log( isNaN(settings.startVal) );
			    }
			// }
	    });
		
		// } else {
		// 	controller.removeScene(sectionScene);
		// }
    });

    /* D3 data output */
	function showInfo(data) {
	    console.log( "Spreadsheet data is loaded." );

	    // assign DOE social stats to a variable
	    var doeStats = data.energy_social.elements;
	    // establish current date and year
	    var today = new Date();
	    var yyyy = today.getFullYear();   	
			
	    // loop through all the doe stats
	    $(doeStats).each( function( key, media ){
	    	var mp = "followers-" + media.platform;
	    	var year = parseInt( media.followers_2016.match(/\d+/) ); // 123456
	    	console.log (year);
	    	// find all containers for each svg
	    	var doeContainer = document.getElementById( mp );

	    	if ( doeContainer != null ) {
	    		// create svg element
	    		var createSVG = d3.select( doeContainer ).append("svg")
					.attr( "width", 200 )
					.attr( "height", 200 );
				// create circles within svg
				var createCircle = createSVG.append("circle")
					.attr("cx", 25)
					.attr("cy", 25)
					.attr("r", 25)
					.style("fill", "rgba(97, 173, 0, 0.25)" );
	    		// console.log( doeContainers );
	    	}
	    });

	    /* use for secretary account launch date
	    var launch = media.launch_date;	    	
			console.log ( launch );
			*/
	}
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