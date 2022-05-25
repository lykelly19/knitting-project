var currPixelColor = "white";
const fs = require('fs');

$(document).ready(function(){

    showSavedPalettes();
    showSamplePalettes();


    $('#addColor').on('click', function() {

            // if color block doesn't already exist in recently selected, add new color block
            // if(!$('#recently-selected div').hasClass(pixelColorClass)) {
    
            //     recentlySelectedBlock = $("<div></div>");
            //     recentlySelectedBlock.addClass("recently-selected-block");
    
            //     textBlock = $("<p></p>");
            //     textBlock.text(pixelColor);
    
                newColorBlock = $("<div></div>").addClass("selected-square");
                newColorBlock.css("background-color", currPixelColor);

                console.log(newColorBlock);
                // newColorBlock.addClass(pixelColorClass);
    
                // recentlySelectedBlock.append(newColorBlock);
                // recentlySelectedBlock.append(textBlock);
    
                $("#palette-colors").append(newColorBlock);
            // }
    });



});


// https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename

$("#fileInput").change(function(e) {
    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var reader = new FileReader();

        reader.onload = function (e) {
          $('#display-img').attr('src', e.target.result).width(150).height(200);
        };
    
        reader.readAsDataURL(input.files[0]);
    }
});


$('#colorpicker').on('change', function() {
    // change the grid square's background color to the selected color
    pixelColor = $(this).val()
    pixelColorClass = "color-" + pixelColor.replace("#", "");

    // add to currently selected color
    currPixelColor = pixelColor;

    setCurrentSelection();
});



// https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper

document.getElementById('eyedropper-button').addEventListener('click', () => {

    if (!window.EyeDropper) {
        // resultElement.textContent = 'Your browser does not support the EyeDropper API';
        return;
    }

    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper.open({ signal: abortController.signal }).then(result => {

        let eyeDropperColor = result.sRGBHex;
        currPixelColor = eyeDropperColor;
        setCurrentSelection();

    }).catch(e => {
        // resultElement.textContent = e;
    });

    setTimeout(() => {
        abortController.abort();
    }, 2000);


});



function createSampleColors(colors) {

    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<colors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", colors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    $(pallette).append(paletteDiv);
    $(pallette).append('<button class="add-button">+</button>');

    $("#sample-colors").append(pallette);
}


$("#result, #sample-colors, #saved-palettes").on("click", ".recently-selected-square, .selected-square", function() {

    // convert from rgba to hex
    // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

    // change the grid square's background color to the selected color
    pixelColor = rgba2hex($(this).css("background-color"));
    pixelColorClass = "color-" + pixelColor.replace("#", "");

    console.log(pixelColor);

    // add to currently selected color
    currPixelColor = pixelColor;

    console.log(currPixelColor);

    setCurrentSelection();
});

function setCurrentSelection() {

    $("#currently-selected").empty();
    result = $("<div></div>").addClass("selected-square");
    result.css("background-color", currPixelColor);

    $("#currently-selected").append(result);

    getPaletteColors();
}


function getPaletteColors() {
    console.log("get palette colors");
    paletteColors = $("#palette-colors").children().map(function(){ return $(this).attr('background-color') });

   let color = $("#palette-colors").children().css("background-color");

   console.log(color);
   console.log($("#palette-colors").attr('background-color'));
   
    var colorsArray = [];
    var getChild = $("#palette-colors").children();

   const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`


    getChild.each(function(i,v){
    // push in fruits array, an array of data-fruit
        colorsArray.push((rgba2hex($(v).css('background-color'))));
    })

    return colorsArray;


   // change the grid square's background color to the selected color
   //console.log(rgba2hex(color));
}


$('#savePalette').on('click', function() {

    // need to lower/camel-case?
    var paletteName = $("#paletteName").val();

    var palletteJson = require('./saved-colors.json');

    palletteJson[paletteName] = getPaletteColors();
    
    let data = JSON.stringify(palletteJson);
    fs.writeFileSync('saved-colors.json', data);


    // regenerate palettes
    showSavedPalettes();

});


function showSamplePalettes() {
    // from coolors.co
    var palletteJson = require('./data.json');
    for(let key in palletteJson) {
        createSampleColors(palletteJson[key]);
    }
}

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
    $(pallette).append('<button class="add-button">+</button>');

    $("#saved-palettes").append(pallette);
}


$("#continue-button").on("click", function() {
    
    var gridDataJson = require('./grid-data.json');


    // validate data
    gridDataJson["canvasColumns"] = $("#canvas-columns").val();
    gridDataJson["canvasRows"] = $("#canvas-rows").val();
    gridDataJson["gaugeStitches"] = $("#gauge-stitches").val();
    gridDataJson["gaugeRows"] = $("#gauge-rows").val();



    // selected color palette


    let data = JSON.stringify(gridDataJson);
    fs.writeFileSync('grid-data.json', data);
});


// clicking the plus button
$("#saved-palettes, #sample-colors").on("click", "button", function() {

    colorElements = $(this).prev().children();

    let selectedPaletteColors = [];

    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

    for(let i=0; i<colorElements.length; i++)
        selectedPaletteColors.push(rgba2hex(colorElements[i].style.backgroundColor));


    var gridDataJson = require('./grid-data.json');
    gridDataJson["selectedPaletteColors"] = selectedPaletteColors;

    let data = JSON.stringify(gridDataJson);
    fs.writeFileSync('grid-data.json', data);




    // show selected palette

    // clear any selected palette
    $("#selected-palette").empty();

    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<selectedPaletteColors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", selectedPaletteColors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    paletteNameP = $("<p></p>").text(paletteName);
    $(pallette).append(paletteDiv);
    $("#selected-palette").append(pallette);
});