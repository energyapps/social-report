function loadSpreadsheet() {
    if ( mode == "editing") {
        Tabletop.init( { key: public_spreadsheet_url,
            callback: showInfo,
            simpleSheet: true } )
        /*
        //multisheet version:
        Tabletop.init( { key: public_spreadsheet_url,
             callback: showInfo,
             wanted: [ "religion", "parties" ] } )
        */
    } else if ( mode == "production") {
        //buildPresidents(d3target);
        showInfo(bakedData);
    } else {
        console.log("You need to define the 'mode' ('editing' or 'production')");
    }
}
//function showInfo(data, tabletop) {
function showInfo(data) {
    logger("loaded spreadsheet data: ");
    logger(data);


    // =====================================================
    // |  BAKE OUT THE DATA TO REMOVE TABLETOP DEPENDENCY  |
    // =====================================================
    if ( mode == "editing"){
        var numberOfFeatures = data[language].elements.length;
        var dictionary = {};

        var newData = {};
        newData[language] = {};
        newData[language].elements = [];
        for (var i = 0; i < numberOfFeatures; i++){
            if ( data[language].elements[i].featureGroup == "Group"){
                dictionary[data[language].elements[i].feature] = data[language].elements[i].translation;
            }
            //newData[language].elements[i] = {};
            //newData[language].elements[i].feature =      data[language].elements[i].feature;
            //newData[language].elements[i].featureGroup = data[language].elements[i].featureGroup;
        }

        var newDataString = JSON.stringify(newData);

        console.log("----- Paste the data below at the bottom of the .html file when you're ready to publish ---------------\n\n");
        console.log('var mode = "production";\nvar bakedData = ' + newDataString + ";\n\n");
        var dictionaryString = JSON.stringify(dictionary);
        console.log('var dictionary = ' + dictionaryString + ";\n")
    }


}