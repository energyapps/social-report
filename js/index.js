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
			 wanted: [ "energy_social", "energy_youtube", "s1_social", "totals" ], // specifying sheets to load
			 parseNumbers: true/*,
			 postProcess: function( element ) {
				// format date string
				element["launch_date"] = Date.parse( element["launch_date"] );
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
			triggerHook: "onCenter",
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
		radius = 100, // follower circles: default radius
		duration = 1000, // follower circles: animation time in ms
		scrollPos = controller.scrollPos(); // current scroll position

	/*set universal functions*/
	// callback function
	function callback ( event ) {
		if ( event.type == "progress" ) {
			console.log( event.type, event.progress );
		} else if ( event.type == "update" ) {
			console.log( event.target, event.startPos, event.endPos );
		}
	}

	// loop through all the sections
	jQuery.each( sectionList, function( s, val ) {
		// get target element id
		sectionID = val.id;
		// get counter element parameters
		var sParams = document.getElementById( sectionID );

		var t = $( sParams ).offset().top,
			h = $( sParams ).height(),
			brandCont = "#" + $( sParams ).data( "brand" ) + "-profile" /*$( sParams ).children( ".logo-container" )*/,
			logo = "#" + $( sParams ).data( "brand" ),
			handleCont = "#" + $( sParams ).data( "brand" ) + "-handle";

		// check for IDs with sec prefix
		if ( sectionID.includes( secPrefix ) ) {
			var brandCont = "#" + secPrefix + "-" + $( sParams ).data( "brand" ) + "-profile",
				logo = "#" + secPrefix + "-" + $( sParams ).data( "brand" ),
				handleCont = "#" + secPrefix + "-" + $( sParams ).data( "brand" ) + "-handle";
		};

		// create new scroll scene for each section
		var sectionScene = new ScrollMagic.Scene( {
			triggerHook: 1,
			triggerElement: sParams,
			duration: h
			/*offset: t,*/
			})
			.setClassToggle( brandCont, "show" ) // add class toggle
			.setPin( brandCont, {
				pushFollowers: false,
				spacerClass: "pin-spacer"
			})
			// .addIndicators( { name: brandCont } )
			.addTo( controller );

		// find all elements with counter class
		var counterList = val.querySelectorAll( ".counter" );

		// loop through all counters
		jQuery.each( counterList, function( i, el ) {
			// get target counter id
			counterID = el.id;

			if ( counterID.indexOf( secPrefix ) ) {
				// get target counter element and parameters
				var cParams = document.getElementById( counterID );
				var cHeight = $( cParams ).height();

				// get container element height
				var hCont = $( cParams ).parents( ".impressions-container" ).height();

				// set parameters for new count
				var cStart = 0 /*cParams.dataset.startval*/;
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
				var countUpFwd = new CountUp( counterID , cStart, cEnd, 0, cDuration , cOptions ), // forward
					countUpBkd = new CountUp( counterID , cEnd , cStart, 0, cDuration , cOptions ); // backward

				// create fade tween for counters
				var countTween = TweenMax.to( cParams, 1.0, { opacity: 1 } );
					TweenMax.set( cParams, { opacity: 0.02 } );
					countTween.pause(); // pause tween until triggered by scene (below)

				// create new scroll scene for each percent element
				var impressionScene = new ScrollMagic.Scene( {
					triggerElement: sParams,
					offset: -140,
					// reverse: true,
					duration: hCont + 280
					})
					.setTween( countTween )
					// .addIndicators( { name: counterID } )
					.addTo( controller );

				// PLAY SCENE BACKWARDS ON LEAVE
				impressionScene.on( "leave", function( event ) {
					if ( event.scrollDirection == "FORWARD" ) {
						// console.log( event.scrollDirection, counterID );
						// delay tween and play backwards (fade out)
						countTween.delay( 3 );
						countTween.reverse();
					}
					// Run backwards count
					if ( !countUpBkd.error ) { // function ok
						countUpBkd.start( callOnComplete );
						countUpFwd.reset();
					} else { // function error
						console.error( "there's an error with the impression tween", countUpBkd.error );
						// console.log( isNaN( cStart ), isNaN( cEnd ) );
					}
				});

				impressionScene.on( "enter", function( event ) {
					// tween forwards (fade in)
					countTween.play();
					// Run forward count
					if ( !countUpFwd.error ) { // function ok
						countUpBkd.reset();
						countUpFwd.start( callOnComplete );
						countUpFwd.update( cUpdate );
					} else { // function error
						console.error( "there's an error with the impression tween", countUpFwd.error );
						// console.log( isNaN( cStart ), isNaN( cEnd ) );
					}
				});
			}
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
			if ( percentID.includes( secPrefix ) ) { // if a secretary account
				// console.log( percentID );
				var secPercentID = pl.id;
				var percentContainer = document.getElementById( secPercentID );
				animPercentID = secPercentID;
			} else { // if main account
				var percentContainer = document.getElementById( percentID );
				animPercentID = percentID;
			};

			// find sibling container and its parameters
			var sibling = $( percentContainer ).parent().prev(),
				pTop = $( sibling ).offset().top,
				pHeight = $( sibling ).height(),
				dur = pTop - pHeight;
			// get child span containing number
			var pParams = $( percentContainer ).children( "span" );
			// set data variables from span data
			var startingAt = $( pParams ).data( "startval" ),
				endingAt = $( pParams ).data( "endval" ),
				lastingFor = $( pParams ).data( "duration" );

			// PREFIX: evaluate direction of animation
			function plusminus () {
				if ( endingAt > startingAt ) { // if increase
					// add up arrow
					return "<span class='percentPrefix up'>\u25b2</span>";
				} else if ( startingAt > endingAt ) { // if decrease
					// add down arrow
					return "<span class='percentPrefix down'>\u25bc</span>";
				} else { // if equal
					// no arrow
					return "";
				}
			}

			// create new scroll scene for each percent element
			var percentScene = new ScrollMagic.Scene( {
				triggerElement: sibling,
				triggerHook: 0,
				duration: dur/*,
				offset: pHeight + 60*/
				})
				.setPin( sibling, {
					pushFollowers: false
				})
				.setClassToggle( percentContainer, "showPercent" ) // add class toggle
				.addTo( controller );
				// execute callback function for debugging scene
				// percentScene.on( "progress start end", callback ); // add listeners for change

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
				animatedPer.start( /*console.log( "the percent has been logged for " + counterID )*/ );
			}
			// create function to reset count
			function percentReset() {
				animatedPer.reset();
			}

			// Run counter functions
			if ( !animatedPer.error ) { // function ok
				percentScene.on( "enter", percentStart ); // play on enter
				percentScene.on( "leave", percentReset ); // reset on exit
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

		// get current date and extract year
		var today = new Date(),
			currYear = today.getFullYear(),
			prevYear = currYear - 1;

		// create variables for followers column name
		var oldFoll = "followers_" + ( prevYear - 1 ),
			newFoll = "followers_" + ( prevYear );

		// create arrays for platform content
		var follNum = [], // followers ([old year][new year])
			percentChange = [], // percent difference in followers
			platformInfo = []; // handles + urls

		// loop through data and push followers to new array
		for ( var i = 0; i < doeStats.length; i++ ) {
			// create new object from each array entry
			var follObj = new Object(), // for followers
				changeObj = new Object(), // for difference
				infoObj = new Object(); // for account info

			// populate array for followers
			follObj[oldFoll] = doeStats[i][oldFoll]; // equate old followers
			follObj[newFoll] = doeStats[i][newFoll]; // equate new followers
			follNum.push( follObj ); // push to new followers-only array

			// populate array for percent change
			changeObj["difference"] = doeStats[i]["difference"]; // equate difference
			percentChange.push( changeObj ); // push to new difference-only array

			// populate array for platform info
			infoObj["handle"] = doeStats[i]["handle"]; // equate account handle
			infoObj["url"] = doeStats[i]["url"]; // equate profile url
			platformInfo.push( infoObj ); // push to new account-only array
		}

		// loop through all DOE stats
		$( doeStats ).each( function( key, media ) {
			/**
			*** OUTPUT ACCOUNT INFORMATION ***
			**/
			// create variables for the platform information div IDs
			var url = media.platform +  "-url";
				url = document.getElementById( url );

			/* POPULATE + ANIMATE CORRESPONDING DIVS */
			$( url ).text( platformInfo[key]["handle"] );
			$( url ).attr( "href", platformInfo[key]["url"] );

			/**
			*** OUTPUT FOLLOWER DATA ***
			**/
			// create a variable for the follower div IDs
			var mp = "followers-" + media.platform;

			// find containers for svgs
			var doeContainer = document.getElementById( mp ),
				containerParent = $( doeContainer ).parents( ".follower-container" ); // find parent div by class

			// function for calculating circle area with default radius
			function circArea( radius ) {
				return Math.round( Math.pow( radius, 2 ) * Math.PI );
			};
			// function for calculating new radius
			function newRadius ( v ) {
				return Math.round ( Math.sqrt( ( circArea( radius ) + ( v * circArea( radius ) ) ) / Math.PI ) );
			};

			/* CREATE SVG SHAPES AND TEXT INSIDE FOLLOWERS DIV */
			if ( doeContainer != null ) {
				// separate follower array's keys and values and parse percent change values
				var sKeys = d3.keys( follNum[key] ),
					sVals = d3.values( follNum[key] ),
					sChange = d3.values( percentChange[key] );

				//create svg element in container
				var svg = d3.select( doeContainer ).append( "svg" )
					.data( [sVals] ) // pass data
					.attr( "id", mp + "-svg" ); // assign id

				// get dimensions of svg element (set by css)
				var bounds = svg.node().getBoundingClientRect(),
					width = bounds.width,
					height = bounds.height,
					top = bounds.top;

				// create svg groups
				var followers = svg.selectAll( "g" )
					.data( function( d ) { return d; } )
					.enter().append( "g" )
					.attr( "class", function( d, i ) { // add classes to separate groups (old vs new)
						if ( i == 0 ) {
							return "past"; // old
						} else {
							return "latest"; // new
						}
					})
					.append( "circle" );  // add circles to each group (static)

				/* SVG: circle shape elements */
				// create a variable for each group
				var pastData = svg.select( ".past" ), // old data
					latestData = svg.select( ".latest" ), // new data
					latestCircle = latestData.select( "circle" ); // circle inside new data group

				// set parameters for old data circle
				pastData.select( "circle" )
					.attr( "cx", 50 )
					.attr( "cy", ( height / 2 ) + 10 )
					.attr( "r", radius ); // use default setting

				// set initial parameters for new data circle
				latestCircle.attr( "cx", width / 2.75 )
					.attr( "cy",  (height / 2) + 10 )
					.attr( "r", radius ) // start with same size as pastData
					.style( "fill", "#396900" ); // start with same color as pastData

				// function to reset parameters for new data circle
				function _circleReset() {
					latestCircle.transition( "playForward" ) // create a transition with a name
						.attr( "r", radius ) // start with same size as pastData
						.style( "fill", "#396900" ) // start with same color as pastData
						.style( "stroke", "none" ) // add stroke
				}

				// function to set animation parameters for new data circle
				function _circlePlay() {
					latestCircle.transition( "playForward" ) // create a transition with a name
						.attr( "r", function() {
							return newRadius ( sChange ); // calculate new radius based on change in followers + update
							}
						)
						.style( "fill", "#61AD00" ) // change color
						.style( "stroke", "white" ) // add stroke
						// .delay( 200 ) // delay the start of the transition
						.ease( d3.easeLinear )
						.duration( function() {
							return ( sChange * duration ) + duration; // calculate duration based on change in followers
						});
				}
				/* Circle animation */
				// create new scroll scene for each percent element
				var circleScene = new ScrollMagic.Scene( {
					triggerElement: doeContainer,
					offset: -height / 2,
					duration: height * 2
				})
				// .addIndicators( { name: "#circles-" + media.platform } )
				.addTo( controller );

				// Tween scene on enter
				circleScene.on( "enter", function( event ) {
					// console.log( event.type, mp, "show" );
					_circlePlay();
					$( doeContainer ).show();
				});

				// Tween scene on leave
				circleScene.on( "leave", function( event ) {
					// reset latest circle to start
					_circleReset();
					// hide the svg
					if ( event.state == "AFTER" ) {
						$( doeContainer ).hide();
					}
				});

				/* SVG: text elements */
				// add text over "past" circle
				pastData.append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", 50 )
					.attr( "dy", height / 2 + 20 )
					.text( prevYear - 1 );

				// add text over "latest" circle
				latestData.append( "text" )
					.attr( "class", "years" )
					.attr( "text-anchor", "middle" )
					.attr( "dx", width / 2.75 )
					.attr( "dy", height / 2 + 20 )
					.text( prevYear );

				// Add text element with total number of followers
				var addText = svg.append( "text" )
					.attr( "id", "totals-" + media.platform )
					.attr( "class", "info" )
					.attr( "dy", 20 )
					.attr( "dx", 50 )
					.append( "tspan" ).attr( "class", "context" ).text( "more than" ) // first line
					.attr( "x", 0 );

				// second line
				svg.select( ".info" ).append( "tspan" ).attr( "class", "number" ).text( d3.format( ",.0d" )( sVals[1] ) ) // format number to an integer grouped by thousands with zero decimals
					.attr( "x", 50 )
					.attr( "dy", 40 );

				// third line
				svg.select( ".info" ).append( "tspan" ).attr( "class", "context" ).text( "total followers" )
					.attr( "x", 50 )
					.attr( "dy", 30 );

				/* ANIMATE THE TEXT ELEMENT */
				// create variable for each text element
				var textEl = document.getElementById( "totals-" + media.platform );

				// create tween for text animation
				var textTween = TweenMax.to( textEl, 0.5, { opacity: 1 } );
					TweenMax.set( textEl, { opacity: 0.75 } );
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

		// create arrays for platform content
		var s1FollNum = [], // followers
			s1PlatformInfo = []; // account info

		// loop through data and push followers to new array
		for ( var i = 0; i < s1Stats.length; i++ ) {
			// create new object from each array entry
			var s1FollObj = new Object(); // followers
			var s1InfoObj = new Object(); // account info

			// populate array for followers
			s1FollObj[oldFoll] = s1Stats[i][oldFoll]; // equate old followers
			s1FollObj[newFoll] = s1Stats[i][newFoll]; // equate new followers
			s1FollNum.push( s1FollObj ); // push to new followers-only array

			// populate array for platform info
			s1InfoObj["handle"] = s1Stats[i]["handle"]; // equate account name
			s1InfoObj["url"] = s1Stats[i]["url"]; // equate profile url
			s1PlatformInfo.push( s1InfoObj ); // push to new account-only array
		}

		// loop through all the Secretary's stats
		$( s1Stats ).each( function( key, media ) {
			/**
			*** OUTPUT SECRETARY'S ACCOUNT INFORMATION ***
			**/
			// create variables for the platform information div IDs
			var url = media.platform +  "-url";
				// check for IDs with sec prefix
				if ( sectionID.includes( secPrefix ) ) {
					url = secPrefix + "-" + url;
				}
				url = document.getElementById( url ); // get anchor links

			/* POPULATE + ANIMATE CORRESPONDING DIVS */
			$( url ).text( s1PlatformInfo[key]["handle"] )
					.attr( "href", s1PlatformInfo[key]["url"] );

			/**
			*** OUTPUT SECRETARY'S FOLLOWER DATA ***
			**/
			// create a variable for the follower div IDs
			var sp = "sec-followers-" + media.platform
				s1Container = document.getElementById( sp ); // find all containers for each svg

			// create a variable for the impressions div IDs
			var secImpID = "sec-impressions-" + media.platform
				secImpContainer = document.getElementById( secImpID ); // find all containers for each counter

			var secT = $( secImpContainer ).offset().top,
				secH = $( secImpContainer ).height()

			// find all elements with counter class
			var secCounterList = secImpContainer.querySelectorAll( ".counter" );

			// separate follower array's keys and values and parse percent change values
			var secKeys = d3.keys( s1FollNum[key] ),
				secVals = d3.values( s1FollNum[key] );

			// set parameters for new count
			var secStart = secVals[0] /*cParams.dataset.startval*/,
				secEnd = secVals[1],
				// cUpdate = cParams.dataset.endval,
				secDuration = 1,
				secOptions = {
					useEasing: true
				};

			// loop through all counters
			jQuery.each( secCounterList, function( i, el ) {
				// get target counter id
				counterID = el.id;

				// get target counter element and parameters
				var secImpParams = document.getElementById( counterID );
					secImpParams.style.opacity = 1; // set opacity to 1 (.counter class default = 0)

				// get container element height
				var hCont = $( secImpParams ).parents( ".impressions-container" ).height();

				// callback function to find out if counting is done
				var complete = false;
				function callOnComplete() {
					complete = true;
					// console.log ( "Done counting", complete );
				}
				// create SECRETARY'S counter functions
				var secCountUpFwd = new CountUp( counterID , secStart, secEnd, 0, secDuration, secOptions ), // forward
					secCountUpBkd = new CountUp( counterID , secEnd , secStart, 0, secDuration * 5  , secOptions ); // backward

				// create new scroll scene for each percent element
				var secFollScene = new ScrollMagic.Scene( {
					triggerElement: secImpContainer,
					offset: -200,
					duration: hCont + 200
					})
					// .addIndicators( { name: counterID } )
					.addTo( controller );

				// PLAY SCENE BACKWARDS ON LEAVE
				secFollScene.on( "leave", function( event ) {
					// Run backwards count
					if ( !secCountUpBkd.error ) { // function ok
						secCountUpBkd.start( callOnComplete );
						secCountUpFwd.reset();
					} else { // function error
						console.error( "there's an error with the impression tween", secCountUpBkd.error );
						// console.log( isNaN( secStart ), isNaN( secEnd ) );
					}
				});

				secFollScene.on( "enter", function( event ) {
					// Run forward count
					if ( !secCountUpFwd.error ) { // function ok
						secCountUpBkd.reset();
						secCountUpFwd.start( callOnComplete );
					} else { // function error
						console.error( "there's an error with the impression tween", secCountUpFwd.error );
					}
				});
			});
		});

	/* CONCLUSION: TOTAL IMPRESSIONS */
		// load data from totals
		var totalSheet = data.totals.elements;

		// create variables for each content section
		var impressionTotal = document.getElementById( "total-impressions" ),
			followersTotal = document.getElementById( "total-followers" );

		// loop through data
		for ( var i = 0; i < totalSheet.length; i++ ) {
			var totalImps = d3.format( ",.0d" )( d3.values( totalSheet[i] )[0] ),
				s1NewFollows = d3.format( ",.0d" )( d3.values( totalSheet[i] )[1] );
			console.log(  );
			$( "#total-impressions > .total-number:first-child" ).text( totalImps );
			$( "#total-followers > .total-number:first-child" ).text( s1NewFollows );
		}
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
	$( ".title" ).css( 'opacity', 1 - $( window ).scrollTop() / 100 );
});