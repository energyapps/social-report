yt color: #FF0000
fb: #3B5998
ig: #E4405F
tw: #1DA1F2
li: #0077B5
podcasts: #9933CC


/*
ANIMATION FOR CIRCLES!!!
 */

var duration   = 500,
    transition = 200;

drawDonutChart(
  '#donut',
  $('#donut').data('donut'),
  290,
  290,
  ".35em"
);

function drawDonutChart( element, percent, width, height, text_y ) {
  width = typeof width !== 'undefined' ? width : 290;
  height = typeof height !== 'undefined' ? height : 290;
  text_y = typeof text_y !== 'undefined' ? text_y : "-.10em";

  var dataset = {
        lower: calcPercent( 0 ),
        upper: calcPercent( percent )
      },
      radius = Math.min( width, height ) / 2,
      pie = d3.layout.pie().sort( null ),
      format = d3.format( ".0%" );

  var arc = d3.svg.arc()
        .innerRadius( radius - radius ) // creates a piece of the pie without any donut hole
        .outerRadius( radius );

  var svg = d3.select( element ).append( "svg" )
        .attr( "width", width )
        .attr( "height", height )
        .append( "g")
        .attr( "transform", "translate(" + width / 2 + "," + height / 2 + ")" ); //animation?

  var path = svg.selectAll( "path" )
        .data( pie( dataset.lower ) )
        .enter().append( "path" )
        .attr( "class", function( d, i ) { return "color" + i } )
        .attr( "d", arc )
        .each( function( d ) { this._current = d; } ); // store the initial values

  var text = svg.append( "text" )
        .attr( "text-anchor", "middle" )
        // .att( "alignment-baseline", "middle" )
        .attr( "dy", text_y );

  if ( typeof( percent ) === "string" ) {
    text.text( percent );
  } else {
    var progress = 0;
    var timeout = setTimeout( function () {
      clearTimeout( timeout );
      path = path.data( pie( dataset.upper ) ); // update the data
      path.transition().duration( duration ).attrTween( "d", function (a) {
        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        var i  = d3.interpolate( this._current, a );
        var i2 = d3.interpolate( progress, percent )
        this._current = i(0);
        return function(t) {
          text.text( format( i2(t) / 100 ) );
          return arc( i(t) );
        };
      }); // redraw the arcs
    }, 200);
  }
};

function calcPercent( percent ) {
  return [percent, 100-percent];
};



/*.on( "update", function( scene ){
			console.log( "SCROLL DIRECTION: " + scene.target.controller().info( "scrollDirection" ) );
		})
		.on( "enter leave", function( scene ){
			console.log( "STATE: " + scene.type == "enter" ? "inside" : "outside" );
		})
		.on( "start end", function( scene ){
			console.log( "LAST HIT: " + scene.type == "start" ? "top" : "bottom" );
		})*/
		/*.on( "progress", function( scene ){
			// $( "#progress" ).text( scene.progress.toFixed(3) );
		});*/

// get a scene's trigger position
		var triggerPosition = sectionScene.triggerPosition();
		// get the current scroll offset for the start and end of the scene.
		var offset = sectionScene.scrollOffset();
		var duration = sectionScene.duration();
		var end = offset + duration;

		// output
		console.log( "SCROLL POS:", scrollPos );
		console.log( sectionID, "TRIGGER POS:", triggerPosition, "TOP:", t, "HEIGHT:", h );
		console.log( "OFFSET:", offset, "DURATION:", duration );
		console.log( "END: ", end );

console.log( $(logoContainer).offset().top, $(sParams).offset().top);

// var sections = document.getElementsByTagName( 'section' );
// var brandIcon = document.getElementById( 'social-brand' );
// /*var icons = $( function() {
//     $( brandIcon ).each( function() {
//         icons[icons.length] = $( brandIcon ).children( 'img' ).attr( 'id' );
//     });
// });*/

// var icons = $( function() {
//     $( brandIcon ).each( function() {
//         icons[icons.length] = $( brandIcon ).children( 'img' ).attr( 'id' );
//     });
// });
// console.log ( icons );

// // loop through all target objects in array
// jQuery.each( sections, function( a, name ) {
//        // get target element id
//        var brandID = name.id;

//        // get target section parameters
// 	var thisBrand = document.getElementById( brandID );
// 	var s = $( thisBrand ); // set variable for section array
// 	var l = s.offset(); // get section location params
// 	var b = s.data( "brand" ); // get section data

// 	// detect window scroll
// 	$( window) .scroll( function() {
// 		// set variable for current window top
// 	    var height = $( window ).scrollTop();
// 	    // compare top of element with current window top
// 	    if( height > l.top ) {
// 	        // console.log( s.data("brand") );
// 	        // $( '#social-brand' ).css( { backgroundImage: "url(https://unpkg.com/simple-icons@latest/icons/" + brandID + ".svg)" } );
// 			// $( this ).toggleClass( "show" );
// 	    }
// 	});
//    });


/** BRAND LOGOS
*** execute scrollmagic.js scene on load
**/
/*window.onLoad = function() {
	// create a scene
	var scene1 = new ScrollMagic.Scene({
		triggerElement: $( '#section-1' ),
		triggerHook: 'onLeave', // start this scene when element in view
	    // duration: 100,    // the scene should last for a scroll distance of 100px
	    // offset: 300        // start this scene after scrolling for 50px
	    reverse: true
	})
	.setClassToggle( $( '.brand' ), "show" ) // add class toggle
	// .setPin( "#section-1" ) // pins the element for the the scene's duration
	// .addIndicators({name: "first scene", parent: "#indicators"})
	.addTo( controller ); // assign the scene to the controller

	console.log ( scene1 );
}*/