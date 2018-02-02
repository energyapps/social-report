$(document).ready ( function() {
	console.log( "Page loaded. Jquery is running. Now, do stuff.");

	/* TABLETOP.JS: LOADING DATA */
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

    /* SCROLLMAGIC.JS: CREATE CONTROLLER + SCENES FOR PLATFORM SECTIONS */
    // init ScrollMagic controller
	var controller = new ScrollMagic.Controller( {
		loglevel: 0, // console log level of detail
		globalSceneOptions: { // default scene settings
			triggerHook: 'onCenter',
			offset: 20,
			reverse: true
		}
	});
	// set variable for current scroll position
	var scrollPos = controller.scrollPos();

	// find each social platform section
	var sectionList = document.querySelectorAll( '.section' );

	// loop through all the sections
	jQuery.each( sectionList, function( s, val ) {
        // get target element id
        sectionID = val.id;
        // get counter element parameters
		var sParams = document.getElementById( sectionID );

		var t = $( sParams ).offset().top;
		var h = $( sParams ).height();
		var logo = '#' + $( sParams ).data( 'brand' );

		// create new scroll scene for each section
		var sectionScene = new ScrollMagic.Scene( {
			triggerElement: sParams,
			duration: h
		})
		.setPin( logo, {
			pushFollowers: true
		})
		.setClassToggle( logo, "show" ) // add class toggle
		// .addIndicators() // add trigger indicators (requires plugin)
		.addTo( controller );

		// get brand parameter from logo container
		var logoContainer = document.getElementById( $(sParams).data("brand") );

		// find all elements with counter class
		var counterList = val.querySelectorAll( '.counter' );

		// loop through all counters
		jQuery.each( counterList, function( i, el ) {
	        // get target counter id
	        counterID = el.id;
	        // get target counter element and parameters
			var cParams = document.getElementById( counterID );
			var cHeight = $( cParams ).height();

			// create fade tweens for counters
			var fadeIn = TweenMax.to( cParams, 1.0, { opacity: 1 } );
			var fadeOut = TweenMax.to( cParams, 1.0, { opacity: 0 } );

			// SCENE EVENTS: "change update progress start end enter leave"
			// SCENE STATES: "BEFORE", "DURING" or "AFTER"
			// SCROLL DIRECTIONS: "PAUSED", "FORWARD" or "REVERSE"

			// create new scroll scene for each percent element
			var impressionScene = new ScrollMagic.Scene( {
				triggerElement: sParams,
				triggerHook: 1,
				reverse: true/*,
				duration: cHeight / 2*/
			})
			.setPin( logo, {
				pushFollowers: false
			})
			.setTween( fadeIn )
			.addIndicators( { name: counterID } )
			.addTo( controller );

			// set parameters for new count
			var cStart = cParams.dataset.startval;
			var cEnd = cParams.dataset.endval - 1000000;
			var cUpdate = cParams.dataset.endval;
			var cDuration = cParams.dataset.duration;
			var cOptions = {
				useEasing: true
			};

			// create variable to execute counter function
		    var animatedNumb = new CountUp( counterID , cStart, cEnd, 0, cDuration , cOptions );

		    // create function to start count
		    function counterStart() {
		    	animatedNumb.start( /*console.log( "the number has been logged for " + counterID )*/ );
		    	animatedNumb.update( cUpdate );
		    }
		    // create function to reset count
		    function counterReset( event ) {
		    	impressionScene.on( "end leave", function (event) {
		    		if ( event.scrollDirection == "REVERSE" ) {
		    			console.log( "REVERSE" );
		    			fadeIn.reverse();
		    			animatedNumb.reset();
		    		}
		    	});
		    }

		    // Run counter functions
		    if ( !animatedNumb.error ) { // function ok
		        impressionScene.on( "enter start", counterStart );
		        counterReset;
		    } else { // function error
		        console.error( animatedNumb.error );
		        // console.log( isNaN(settings.startVal) );
		    }
	    });

		// find all elements with percent class
		var percentList = val.querySelectorAll( '.percent' );

		// loop through all percent counters
		jQuery.each( percentList, function( i, pl ) {
	        // get target percent id
	        percentID = pl.id;
			var percentContainer = document.getElementById( percentID );

			// find sibling container and its parameters
			var sibling = $( percentContainer ).parent().prev();
			var pTop = $( sibling ).offset().top;
			var pHeight = $( sibling ).height();
			// get child span
			var pParams = $( percentContainer ).children( 'span' );
			// console.log( scrollPos + "//" + pTop + "//" + pHeight + "==" + (scrollPos-pHeight) );
			var hook = pTop - pHeight;

		    // create new scroll scene for each percent element
			var percentScene = new ScrollMagic.Scene( {
				triggerElement: sibling,
				triggerHook: 0,
				duration: hook,
				offset: pHeight + 60
			})
			.setPin( sibling, {
				pushFollowers: false
			})
			.setClassToggle( percentContainer, "showPercent" ) // add class toggle
			// .addIndicators() // add trigger indicators (requires plugin)
			.addTo( controller );

			// set options for new count
			var options = {
				useEasing: true,
				useGrouping: true,
				suffix: '%'
			};

			// declare the variable for percent count
		    var animatedPer = new CountUp( percentID , $(pParams).data('startval'), $(pParams).data('endval'), 0, $(pParams).data('duration'), options );
		    // create function to start count
		    function percentStart() {
		    	animatedPer.start( /*console.log( "the number has been logged for " + counterID )*/ );
		    }
		    // create function to reset count
		    function percentReset() {
		    	animatedPer.reset();
		    	// percentScene.removePin(true);
		    }

		    // Run counter functions
		    if ( !animatedPer.error ) { // function ok
		        percentScene.on( "enter", percentStart );
		        percentScene.on( "leave", percentReset );
		    } else { // function error
		        console.error( animatedPer.error );
		        // console.log( isNaN(settings.startVal) );
		    }
	    });
		/*// debugging
        function callback ( event ) {
		    console.log("EVENT: " + event.type + ", " + event.progress );
		}
		// add listeners for change update progress start end enter leave
		sectionScene.on("progress start end", callback);*/
    });

    /* D3 data output */
	function showInfo(data) {
	    // console.log( "Spreadsheet data is loaded." );

	    // assign DOE social stats to a variable
	    var doeStats = data.energy_social.elements;
	    // get all column names
	    var allCols = data.energy_social.columnNames;
	    // establish current date and get year
	    var today = new Date();
	    var yyyy = today.getFullYear();
	    // create variable for target year cols
	    var colNames = [];
	    // loop through all column names and extract only target years
	    $( allCols ).each( function( k, col ) {
	    	if ( allCols[k] == "followers_" + ( yyyy - 2 ) || allCols[k] == "followers_" + ( yyyy - 1 ) ) {
	    		colNames.push( allCols[k] );
	    	}
	    });
	    // console.log ( doeStats );

	    // create function to filter stats by target years
		function filterFollowers( obj, filter ) {
		  for (prop in obj) {
		      if ( filter.indexOf(prop) == -1 ) {
		          delete obj[prop];
		      }
		  };
		  return obj;
		};

	    // loop through all the doe stats
	    $( doeStats ).each( function( key, media ) {
			// console.log( media );
	    	// create a variable for the section IDs
	    	var mp = "followers-" + media.platform;
	    	// find all containers for each svg
	    	var doeContainer = document.getElementById( mp );

	    	if ( doeContainer != null ) {
	    		// create svg element
	    		var createSVG = d3.select( doeContainer ).append("svg")
	    			.attr( "id", media.platform );
	    		// filter out target years only
	    		var stats = filterFollowers( media, colNames );
	    		// parse objects into arrays
	    		var sKeys = d3.entries( stats );
	    		// calculate difference in followers over target years
	    		var diff = parseInt( sKeys[1].value ) / parseInt( sKeys[0].value );
	    		// console.log ( diff );

				// circle: OLD followers
				var createCircle = createSVG.append("circle")
					.attr( "cx", 75 )
					.attr( "cy", 75 )
					.attr( "r", 50 )
					.attr( "class", "past" );
				// circle: NEW followers
				var createCircle = createSVG.append("circle")
					.attr( "cx", 200 + diff )
					.attr( "cy", 200 )
					.attr( "r", 50 * diff )
					.attr( "class", "latest" );
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

/* Title scroll function */
$( window ).scroll( function() {
	// fade the title when user scrolls down
	$( '.title' ).css( 'opacity', 1 - $(window).scrollTop() / 100 );
});