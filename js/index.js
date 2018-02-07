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
			 wanted: [ "energy_social"/*, "energy_youtube", "s1_social"*/ ], // specifying sheets to load
			 parseNumbers: true/*,
			 postProcess: function(element) {
				// convert string date to Date date
				element["launch_date"] = Date.parse(element["launch_date"]);
			 }*/
			 // , debug: true
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
		var logo = "#" + $( sParams ).data( 'brand' );
		var handleCont = "#" + $( sParams ).data( 'brand' ) + "-handle";
		console.log( handleCont );

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

		// create new scroll scene for platform info divs
		var handleScene = new ScrollMagic.Scene( {
			triggerElement: sParams,
			duration: h
		})
		.setPin( logo, {
			pushFollowers: true
		})
		.setClassToggle( handleCont, "show" ) // add class toggle
		// .addIndicators() // add trigger indicators (requires plugin)
		.addTo( controller );

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
			// .addIndicators( { name: counterID } )
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
						//console.log( "REVERSE" );
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
			var animatedPer = new CountUp( percentID , $( pParams ).data( 'startval' ), $( pParams ).data( 'endval' ), 0, $( pParams ).data( 'duration' ), options );
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
	function showInfo( data ) {
		console.log( "Spreadsheet data is loaded." );

		// assign DOE social stats to a variable
		var doeStats = data.energy_social.elements;
		//console.log( doeStats );

		// establish current date and get year
		var today = new Date();
		var currYear = today.getFullYear();
		var prevYear = currYear - 1;
		// create variables for followers
		var oldFoll = "followers_" + ( prevYear - 1 );
		var newFoll = "followers_" + ( prevYear );
		// create arrays for platform content
		var follNum = [];
		var platformInfo = [];

		// loop through data and push followers to new array
		for ( var i = 0; i < doeStats.length; i++ ) {
			// create new object from each array entry
			var follObj = new Object();
			var infoObj = new Object();

			// populate array for followers
			follObj[oldFoll] = doeStats[i][oldFoll];
			follObj[newFoll] = doeStats[i][newFoll];
			follNum.push( follObj );

			// populate array for platform info
			infoObj["handle"] = doeStats[i]["handle"];
			infoObj["url"] = doeStats[i]["url"];
			infoObj[newFoll] = doeStats[i][newFoll];
			platformInfo.push( infoObj );
		}

		// loop through all the doe stats
		$( doeStats ).each( function( key, media ) {
			// console.log( media );


			/*<div class="platform-info">
					<h3 id="facebook-handle" class='handle'><a id="facebook-url" href=""></a></h3>
					<h4 class="total-followers"></h4>
				</div>*/

			// create variables for the platform information div IDs
			// var service = media.platform +  "-handle";
			var url = media.platform +  "-url";
				url = document.getElementById( url );
			// var handle = document.getElementById( service );

			/* POPULATE PLATFORM INFORMATION INTO CORRESPONDING DIVS */
			$( url ).text( platformInfo[key]["handle"] );
			$( url ).attr( "href", platformInfo[key]["url"] );
			// console.log( url );

			// create a variable for the follower div IDs
			var mp = "followers-" + media.platform;
			// find all containers for each svg
			var doeContainer = document.getElementById( mp );

			/* CREATE SVG SHAPES AND TEXT INSIDE FOLLOWERS DIV */
			if ( doeContainer != null ) {
				// separate follower array's keys and values
				var sKeys = d3.keys( follNum[key] );
				var sVals = d3.values( follNum[key] );

				// calculate difference in followers over target years
				var diff =  parseInt( sVals[1] ) / parseInt( sVals[0] );
				// console.log( sVals, diff );

				//create svg container
				var svg = d3.select( doeContainer ).append( "svg" )
					.data( [sVals] )
					.attr( "id", mp );

				// get dimensions of svg
				var bounds = svg.node().getBoundingClientRect(),
					width = bounds.width,
					height = bounds.height;
				// console.log(width, height);

				// create individual svg components
				var followers = svg.selectAll( "g" )
					.data( function( d ) { return d; } )
					.enter().append( "g" )
					.attr( "class", function( d, i ) {
						if ( i == 0 ) {
							return "past";
						} else {
							return "latest";
						}
					})
					.append( "circle" );

				followers.attr( "cx", function( d, i ) {
						return ( i * 120 ) + 150;
					})
				   .attr( "cy", function( d, i ) {
						return parseInt( ( ( height * i ) / 3) + height/3 );
					})
				   .attr( "r", function( d, i ) {
				   		//console.log( this );
						if ( i == 0 ) {
							return 60;
						} else {
							return parseInt( 60 * diff );
						}
				   });

				var yearTextNew = svg.select( ".latest" ).append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 270 )
					.attr( "dy", height * .70 )
					.text( prevYear );

				var yearTextOld = svg.select( ".past" ).append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 150 )
					.attr( "dy", height * .36 )
					.text( prevYear - 1 );

				var followers = svg.append( "text" )
					.attr( "class", "info" )
					.attr( "y", "60" )
					.attr( "dx", "50" )
					.append( "tspan" ).attr( "class", "number" ).text( sVals[1] + "+" )
					.attr( "x", 0 );

				svg.select( ".info" ).append( "tspan" ).attr( "class", "suffix" ).text( "total followers" )
					.attr( "x", 50 )
					.attr( "dy", 30 );
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