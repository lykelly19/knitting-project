const fs = require('fs');

$(document).ready(function(){ 

    var gridDataJson = require('./grid-data.json');

    selectedPaletteColors = gridDataJson["selectedPaletteColors"];
    generateSelectedPalette(selectedPaletteColors);

    showSavedPalettes();
    showSamplePalettes();
});



function showSavedPalettes() {

    $("#saved-palettes").empty();

    // read in JSON
    var paletteJson = require('./saved-colors.json');
    
    // read in each array of the JSON
    for(let key in paletteJson) {
        // generate all palettes
        createSavedColors(paletteJson[key], key);
    }
}



function showSamplePalettes() {
    // from coolors.co
    var palletteJson = require('./data.json');
    for(let key in palletteJson) {
        createSampleColors(palletteJson[key]);
    }
}


function createSampleColors(colors) {

    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<colors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", colors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    $(pallette).append(paletteDiv);
    $(pallette).append('<button class="add-button">Swap</button>');

    $("#sample-colors").append(pallette);
}



function createSavedColors(colors, paletteName) {
    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<colors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", colors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    paletteNameP = $("<p></p>").text(paletteName);
    $(pallette).append(paletteNameP);
    $(pallette).append(paletteDiv);
    $(pallette).append('<button class="add-button">Swap</button>');

    $("#saved-palettes").append(pallette);
}


function generateSelectedPalette(selectedPaletteColors) {
    // clear any selected palette
    $("#selected-palette").empty();

    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<selectedPaletteColors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", selectedPaletteColors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    $(pallette).append(paletteDiv);
    $("#selected-palette").append(pallette);
}





// clicking the plus button
$("#saved-palettes, #sample-colors").on("click", "button", function() {

    colorElements = $(this).prev().children();

    newSelectedPaletteColors = [];

    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

    for(let i=0; i<colorElements.length; i++)
        newSelectedPaletteColors.push(rgba2hex(colorElements[i].style.backgroundColor));

    var gridDataJson = require('./grid-data.json');

    // update grid colors
    for(let i=0; i<gridDataJson["gridColorsArr"].length; i++) {
        for(let j=0; j<gridDataJson["gridColorsArr"][0].length; j++) {

            index = selectedPaletteColors.indexOf(gridDataJson["gridColorsArr"][i][j]);
            
            // if found in selectedPaletteColors array, update color in JSON
            if(index != -1)
                gridDataJson["gridColorsArr"][i][j] = newSelectedPaletteColors[index];
        }
    }


    // update color palette
    gridDataJson["selectedPaletteColors"] = newSelectedPaletteColors;

    let data = JSON.stringify(gridDataJson);
    fs.writeFileSync('grid-data.json', data);

    // navigate to grid page
    window.location.href = "./index.html";

});