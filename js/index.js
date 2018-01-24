/* parallax function */ // requires jquery
/*$("section.parallax").css('background', function () {
    var bg = ('url(' + $(this).data("image-src") + ') no-repeat center fixed');
    return bg;
    console.log(bg);
});*/

/* counter function */
window.onload = function() {
	// find all elements with counter class
	var targetList = document.querySelectorAll('.counter');
	// set variable to count objects
	var i = 0;
	do {
		// get target element id
		var targetID = targetList[i].id;
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
		i++;
	}
	while ( i <= targetList.length );
}