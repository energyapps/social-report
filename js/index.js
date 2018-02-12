$( document ).ready ( function() {
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
			/*offset: 20,*/
			reverse: true
		}
	});
	// SCENE EVENTS: "change update progress start end enter leave"
	// SCENE STATES: "BEFORE", "DURING" or "AFTER"
	// SCROLL DIRECTIONS: "PAUSED", "FORWARD" or "REVERSE"

	// find each social platform section
	var sectionList = document.querySelectorAll( ".section" );

	// set universal variables
	var secPrefix = "sec", // Secretary's prefix
		radius = 60, // follower circles: default radius
		duration = 1000, // follower circles: animation time in ms
		transition = 200; // follower circles: transition time in ms

	// loop through all the sections
	jQuery.each( sectionList, function( s, val ) {
		// get target element id
		sectionID = val.id;
		// get counter element parameters
		var sParams = document.getElementById( sectionID );

		var t = $( sParams ).offset().top;
		var h = $( sParams ).height();
		var logo = "#" + $( sParams ).data( "brand" );
		var handleCont = "#" + $( sParams ).data( "brand" ) + "-handle";
		// check for IDs with sec prefix
		if ( sectionID.includes( secPrefix ) ) {
			var logo = "#" + secPrefix + "-" + $( sParams ).data( "brand" );
			var handleCont = "#" + secPrefix + "-" + $( sParams ).data( "brand" ) + "-handle";
		};

		// create new scroll scene for each section
		var sectionScene = new ScrollMagic.Scene( {
			triggerElement: sParams,
			duration: h
		})
		.setClassToggle( logo, "show" ) // add class toggle
		// .setTween( logoTween )
		// .addIndicators( { name: logo } )
		.addTo( controller );

		// create new scroll scene for platform info divs
		var handleScene = new ScrollMagic.Scene( {
			/*offset: -20,*/
			triggerElement: sParams,
			duration: h
		})
		.setClassToggle( handleCont, "show" ) // add class toggle
		// .setTween( handleTween )
		// .addIndicators( { name: handleCont } )
		.addTo( controller );

		// find all elements with counter class
		var counterList = val.querySelectorAll( ".counter" );

		// loop through all counters
		jQuery.each( counterList, function( i, el ) {
			// get target counter id
			counterID = el.id;
			// get target counter element and parameters
			var cParams = document.getElementById( counterID );
			var cHeight = $( cParams ).height();

			// get container element height
			var hCont = $( cParams ).parents( ".impressions-container" ).height();

			// set parameters for new count
			var cStart = cParams.dataset.startval;
			var cEnd = cParams.dataset.endval - 1000000;
			var cUpdate = cParams.dataset.endval;
			var cDuration = cParams.dataset.duration;
			var cOptions = {
				useEasing: true
			};

			// callback function to find out if counting is done
			var complete = false;
			function callOnComplete() {
				complete = true;
				// console.log ( "Done counting", complete );
			}
			// create counter functions
			var countUpFwd = new CountUp( counterID , cStart, cEnd, 0, cDuration , cOptions ); // forward
			var countUpBkd = new CountUp( counterID , cEnd , cStart, 0, cDuration , cOptions ); // backward

			// create fade tween for counters
			var countTween = TweenMax.to( cParams, 1.0, { opacity: 1 } );
				TweenMax.set( cParams, { opacity: 0 } );
				countTween.pause(); // pause tween until triggered by scene (below)

			// create new scroll scene for each percent element
			var impressionScene = new ScrollMagic.Scene( {
				triggerElement: sParams,
				triggerHook: 0,
				reverse: true,
				duration: hCont + 150
			})
			.setPin( logo, {
				pushFollowers: false
			})
			.setTween( countTween )
			// .addIndicators( { name: counterID } )
			.addTo( controller );

			// tween scene forwards and backward
			impressionScene.on( "enter start leave end", function( event ) {
				// reverse if not inside the scene
				if ( impressionScene.state() != "DURING" ) {
					// play tween to fade counter out
					countTween.delay( 1 );
					countTween.reverse();
					// Run backwards count
					if ( !countUpBkd.error ) { // function ok
						countUpBkd.start( callOnComplete );
						countUpFwd.reset();
					} else { // function error
						console.error( "there's an error", countUpBkd.error );
						// console.log( isNaN( cStart ), isNaN( cEnd ) );
					}
				} else { // play fowards otherwise
					// play tween to fade counter
					countTween.play();
					// Run forward count
					if ( !countUpFwd.error ) { // function ok
						countUpBkd.reset();
						countUpFwd.start( callOnComplete );
						countUpFwd.update( cUpdate );
					} else { // function error
						console.error( "there's an error", countUpFwd.error );
						// console.log( isNaN( cStart ), isNaN( cEnd ) );
					}
				}
			});
		});

		// find all elements with percent class
		var percentList = val.querySelectorAll( ".percent" );

		// loop through all percent counters
		jQuery.each( percentList, function( i, pl ) {
			// get target percent id
			var percentID = pl.id;
			// console.log( percentID ); // confirming that both doe AND sec sections are found
			var animPercentID;

			// check for IDs with sec prefix
			if ( percentID.includes( secPrefix ) ) {
				// console.log( percentID );
				var secPercentID = pl.id;
				var percentContainer = document.getElementById( secPercentID );
				animPercentID = secPercentID;
			} else {
				var percentContainer = document.getElementById( percentID );
				animPercentID = percentID;
			};

			// find sibling container and its parameters
			var sibling = $( percentContainer ).parent().prev();
			var pTop = $( sibling ).offset().top;
			var pHeight = $( sibling ).height();
			var hook = pTop - pHeight;
			// get child span
			var pParams = $( percentContainer ).children( "span" );
			// set data variables from span data
			var startingAt = $( pParams ).data( "startval" );
			var endingAt = $( pParams ).data( "endval" );
			var lastingFor = $( pParams ).data( "duration" );

			// PREFIX: evaluate direction of animation
			function plusminus () {
				if ( endingAt > startingAt ) {
					return "<span class='percentPrefix up'>\u25b2</span>";
				} else if ( startingAt > endingAt ) {
					return "<span class='percentPrefix down'>\u25bc</span>";
				} else {
					return "";
				}
			}

			// create new scroll scene for each percent element
			var percentScene = new ScrollMagic.Scene( {
				triggerElement: sibling,
				triggerHook: 0,
				duration: hook/*,
				offset: pHeight + 60*/
			})
			.setPin( sibling, {
				pushFollowers: false
			})
			.setClassToggle( percentContainer, "showPercent" ) // add class toggle
			.addTo( controller );

			/*// ScrollMagic debugging function
			function callback ( event ) {
				console.log( pl, event.type, event.progress );
			}
			// execute debug function for this scene
			percentScene.on( "progress start end", callback ); // add listeners for change*/

			// set options for new count
			var options = {
				// delay: 1,
				useEasing: true,
				useGrouping: true,
				prefix: plusminus(),
				suffix: "%"
			};

			// declare the variable for percent count
			var animatedPer = new CountUp( animPercentID , startingAt, endingAt, 0, lastingFor, options );
			// create function to start count
			function percentStart() {
				animatedPer.start( /*console.log( "the number has been logged for " + counterID )*/ );
			}
			// create function to reset count
			function percentReset() {
				animatedPer.reset();
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
	});

	/* D3 data output */
	function showInfo( data ) {
		console.log( "Spreadsheet data is loaded." );

	/* DEPARTMENT-WIDE ACCOUNTS (SECRETARY ACCOUNTS BELOW THIS) */
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
		var follNum = [], // followers ([old year][new year])
			percentChange = [], // difference in followers
			platformInfo = []; // handles + urls

		// loop through data and push followers to new array
		for ( var i = 0; i < doeStats.length; i++ ) {
			// create new object from each array entry
			var follObj = new Object(),
				changeObj = new Object(),
				infoObj = new Object();

			// populate array for followers
			follObj[oldFoll] = doeStats[i][oldFoll];
			follObj[newFoll] = doeStats[i][newFoll];
			follNum.push( follObj );

			// populate array for percent change
			changeObj["difference"] = doeStats[i]["difference"];
			percentChange.push( changeObj );

			// populate array for platform info
			infoObj["handle"] = doeStats[i]["handle"];
			infoObj["url"] = doeStats[i]["url"];
			// infoObj[newFoll] = doeStats[i][newFoll];
			platformInfo.push( infoObj );
		}
		// console.log( percentChange );

		// loop through all DOE stats
		$( doeStats ).each( function( key, media ) {
			// console.log( media );
			/**
			*** ACCOUNT INFORMATION ***
			**/
			// create variables for the platform information div IDs
			var url = media.platform +  "-url";
				url = document.getElementById( url );

			/* POPULATE + ANIMATE CORRESPONDING DIVS */
			$( url ).text( platformInfo[key]["handle"] );
			$( url ).attr( "href", platformInfo[key]["url"] );

			/**
			*** FOLLOWER DATA ***
			**/
			// create a variable for the follower div IDs
			var mp = "followers-" + media.platform;
			// find all containers for each svg
			var doeContainer = document.getElementById( mp );

			/* FUNCTION FOR DRAWING ANIMATED CIRCLES */
			function drawAnimCircle( element, percent, width, height, text_y ) {
				// set defaults values for parameters
				percent = typeof percent !== 'undefined' ? percent : 100;
				width = typeof width !== 'undefined' ? width : 290;
				height = typeof height !== 'undefined' ? height : 290;
				text_y = typeof text_y !== 'undefined' ? text_y : "15%";
			}

			/* CREATE SVG SHAPES AND TEXT INSIDE FOLLOWERS DIV */
			if ( doeContainer != null ) {
				// separate follower array's keys and values and parse percent change values
				var sKeys = d3.keys( follNum[key] ),
					sVals = d3.values( follNum[key] ),
					sChange = d3.values( percentChange[key] );

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
					.attr( "class", function( d, i ) { // add classes to each separate "g" element
						if ( i == 0 ) {
							return "past";
						} else {
							return "latest";
						}
					})
					.append( "circle" );  // function for old circle (static)

				followers.attr( "cx", function( d, i ) {
						while ( i < 2 ) {
							return ( i * 150 ) + 150;
						}
					})
				   .attr( "cy", function( d, i ) {
						while ( i < 2 ) {
							return parseInt( ( ( height * i )/3 ) + height * 0.4 );
						}
					})
				   .attr( "r", function( d, i ) {
				   		// console.log(this);
						while ( i < 2 ) {
							return ( i * ( sChange * radius) ) + radius;
						}
				   });

				var yearTextNew = svg.select( ".latest" ).append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 300 )
					.attr( "dy", height * 0.76 )
					.text( prevYear );

				var yearTextOld = svg.select( ".past" ).append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 150 )
					.attr( "dy", height * .42 )
					.text( prevYear - 1 );

				var addText = svg.append( "text" )
					.attr( "id", "totals-" + media.platform )
					.attr( "class", "info" )
					.attr( "dy", 30 )
					.attr( "dx", 50 )
					.append( "tspan" ).attr( "class", "context" ).text( "more than" )
					.attr( "x", 0 );

				svg.select( ".info" ).append( "tspan" ).attr( "class", "number" ).text( d3.format( ",.0d" )( sVals[1] ) ) // format number to an integer grouped by thousands with zero decimals
					.attr( "x", 50 )
					.attr( "dy", 40 );

				svg.select( ".info" ).append( "tspan" ).attr( "class", "context" ).text( "total followers" )
					.attr( "x", 50 )
					.attr( "dy", 30 );

				/* Text animation */
				// create variable for each text element
				var textEl = document.getElementById( "totals-" + media.platform );

				var textTween = TweenMax.to( textEl, 0.5, { opacity: 1, zIndex: 10 } );
					TweenMax.set( textEl, { opacity: .1, zIndex: 0 } );
					textTween.pause(); // pause tween until triggered by scene (below)

				// create new scroll scene for each percent element
				var textScene = new ScrollMagic.Scene( {
					triggerElement: doeContainer,
					triggerHook: 0,
					duration: height + ( textEl.getBoundingClientRect().height * 1.25 )/*,
					loglevel: 3*/
				})
				.setTween( textTween )
				// .addIndicators( { name: "#totals-" + media.platform } )
				.addTo( controller );

				// tween scene forwards and backward
				textScene.on( "enter start leave end", function( event ) {
					// reverse if not inside the scene
					if ( textScene.state() != "DURING" ) {
						textTween.delay( 2 );
						textTween.reverse();
					} else { // play fowards otherwise
						textTween.delay( 0 );
						textTween.play();
					}
				});
			}
		});

	/* SECRETARY'S ACCOUNTS */
		// assign S1 social stats to a variable
		var s1Stats = data.s1_social.elements;
		// console.log( s1Stats );

		// create arrays for platform content
		var s1FollNum = [];
		var s1PlatformInfo = [];

		// loop through data and push followers to new array
		for ( var i = 0; i < s1Stats.length; i++ ) {
			// create new object from each array entry
			var s1FollObj = new Object();
			var s1InfoObj = new Object();

			// populate array for followers
			s1FollObj[oldFoll] = s1Stats[i][oldFoll];
			s1FollObj[newFoll] = s1Stats[i][newFoll];
			s1FollNum.push( s1FollObj );

			// populate array for platform info
			s1InfoObj["handle"] = s1Stats[i]["handle"];
			s1InfoObj["url"] = s1Stats[i]["url"];
			// s1InfoObj[newFoll] = s1Stats[i][newFoll];
			s1PlatformInfo.push( s1InfoObj );
		}

		//console.log( s1FollNum, s1PlatformInfo );

		// loop through all the doe stats
		$( s1Stats ).each( function( key, media ) {
			// console.log( media );
			/**
			*** ACCOUNT INFORMATION ***
			**/
			// create variables for the platform information div IDs
			// var service = media.platform +  "-handle";
			var url = media.platform +  "-url";
				// check for IDs with sec prefix
				if ( sectionID.includes( secPrefix ) ) {
					url = secPrefix + "-" + url;
				}
				url = document.getElementById( url );

			/* POPULATE + ANIMATE CORRESPONDING DIVS */
			$( url ).text( s1PlatformInfo[key]["handle"] );
			$( url ).attr( "href", s1PlatformInfo[key]["url"] );

			/**
			*** FOLLOWER DATA ***
			**/
			// create a variable for the follower div IDs
			var mp = "sec-followers-" + media.platform;
			// find all containers for each svg
			var s1Container = document.getElementById( mp );

			/* CREATE SVG SHAPES AND TEXT INSIDE FOLLOWERS DIV */
			if ( s1Container != null ) {
				// separate follower array's keys and values
				var s1Keys = d3.keys( s1FollNum[key] );
				var s1Vals = d3.values( s1FollNum[key] );

				// calculate difference in followers over target years
				var diff =  parseInt( s1Vals[1] ) / parseInt( s1Vals[0] );
				// console.log( s1Vals, diff );

				//create svg container
				var svg = d3.select( s1Container ).append( "svg" )
					.data( [s1Vals] )
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
						return ( i * 150 ) + 150;
					})
				   .attr( "cy", function( d, i ) {
						return parseInt( ( ( height * i )/3 ) + height*.4 );
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
					.attr( "dx", 300 )
					.attr( "dy", height * .76 )
					.text( prevYear );

				var yearTextOld = svg.select( ".past" ).append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 150 )
					.attr( "dy", height * .42 )
					.text( prevYear - 1 );

				var addText = svg.append( "text" )
					.attr( "id", "totals-" + media.platform )
					.attr( "class", "info" )
					.attr( "y", 60 )
					.attr( "dx", 50 )
					.append( "tspan" ).attr( "class", "number" ).text( s1Vals[1] + "+" )
					.attr( "x", 0 );

				svg.select( ".info" ).append( "tspan" ).attr( "class", "suffix" ).text( "total followers" )
					.attr( "x", 50 )
					.attr( "dy", 30 );

				/* Text animation */
				// create variable for each text element
				var textEl = document.getElementById( "totals-" + media.platform );

				var textTween = TweenMax.to( textEl, 0.5, { opacity: 1, zIndex: 10 } );
					TweenMax.set( textEl, { opacity: 0, zIndex: 0 } );
					textTween.pause(); // pause tween until triggered by scene (below)

				// create new scroll scene for each percent element
				var textScene = new ScrollMagic.Scene( {
					triggerElement: s1Container,
					triggerHook: 0,
					duration: height + ( textEl.getBoundingClientRect().height * 1.25 )/*,
					loglevel: 3*/
				})
				.setTween( textTween )
				// .addIndicators( { name: "#totals-" + media.platform } )
				.addTo( controller );

				// tween scene forwards and backward
				textScene.on( "enter start leave end", function( event ) {
					// reverse if not inside the scene
					if ( textScene.state() != "DURING" ) {
						textTween.delay( 2 );
						textTween.reverse();
					} else { // play fowards otherwise
						textTween.delay( 0 );
						textTween.play();
					}
				});
			}
		});
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