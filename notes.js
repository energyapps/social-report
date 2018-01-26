yt color: #FF0000
fb: #3B5998
ig: #E4405F
tw: #1DA1F2
li: #0077B5
podcasts: #9933CC




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