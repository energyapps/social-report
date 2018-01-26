// This ID is the crazy string in the URL bar in the browser (NOT the one that google gives you when you hit "publish sheet")
// share url: https://docs.google.com/spreadsheets/d/19wQJE6SrUrp3Li_O_507Z2myD7Jpf_XB4r99ajR14TY
var public_spreadsheet_url = '19wQJE6SrUrp3Li_O_507Z2myD7Jpf_XB4r99ajR14TY';

// 1) The function for initializing tabletop
function loadSpreadsheet() {
    /*Tabletop.init( { key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true } )*/
    
    // Multisheet version: 
    // If your spreadsheet actually has multiple sheets, you can load the specific sheets by sheet name
    Tabletop.init( { key: public_spreadsheet_url,
         callback: showInfo,
         wanted: [ "energy_social", "energy_youtube", "s1_social" ],
         parseNumbers: true/*,
         postProcess: function(element) {
            // convert string date to Date date
            element["launch_date"] = Date.parse(element["launch_date"]);
         }*/
     })
}

// 2) Here's the callback function that does stuff with the data.
// You could put your D3 stuff here.
function showInfo(data) {
    console.log( "Spreadsheet data is loaded." );
    // console.log(data.s1_social.elements);
    /*for ( var i = 0; i <= data.length; i++ ) {
        console.log( data[i] );
    }*/
}

// 3) You need to wait until everything loads.
/*$(document).ready( function(){
});*/