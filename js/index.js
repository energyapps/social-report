/*
	index.js

	Only used for the countUp demo page, not a dependency
*/

/* COUNTER ANIMATIONS */
window.onload = function() {
    // count all the elements with counters
    var totalCount = document.querySelectorAll("h1.counter");
    // check that there are elements with counters
    if ( totalCount ) { // if counter elements exist
        // set an index variable
        var i = 0; 
        
        // loop through all the counters
        do {
            // set variables from the element id
            var targetID = totalCount[i].id;
            var thisTarget = document.getElementById( targetID );
            
            // pass all parameters to count function
            var animatedNumb = new CountUp( targetID, thisTarget.dataset.startval, thisTarget.dataset.endval, thisTarget.dataset.decimal, thisTarget.dataset.duration );
            // output log when function runs
            if ( !animatedNumb.error ) { // function ok
                animatedNumb.start(
                    console.log( "the number has been logged for " + targetID )
                );
            } else { // function error
                console.error( animatedNumb.error );
                // console.log( isNaN(settings.startVal) );
            }
            i++;
        }
        while ( i <= totalCount.length );
    };
};