const $gridElement = $('#grid');
const $inputColumn = $('#inputColumn');
const $inputRow = $('#inputRow');

const fs = require('fs');

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

function createGrid(totalRows, totalCols, gaugeStitches, gaugeRows) {

    let count = 1
//adds numbers to the top and bottom of grid 
    let newRow = $("<div></div>").addClass("grid-rowtop");
    newRow.append($("<div></div>")
    .addClass("grid-box")
    );

    for(let j=0; j < totalCols; j++) {
    if (j - 1 < totalCols ) {    
            newRow.append(
            $(`<div>${j+1}</div>`)
             .addClass("grid-box")            
             )}
            } //<----------------
            
            newRow.append(
               $(`<div></div>`)
                .addClass("grid-box")
            )
            $("#grid").append(newRow);
        // iterate through the rows
            for(let i=0; i<totalRows; i++) {
        
        // create a new div for the row & add to grid
        let newRow = $("<div></div>").addClass("grid-row");
        $("#grid").append(newRow);

        newRow.append(
        $(`<div>${count}</div>`)
         .addClass("grid-box")
        //  .addClass("number-square")             
         );
      
        
        // iterate through the columns
        for(let j=0; j < totalCols; j++) {

            newRow.append(
                $("<div></div>")
                    .addClass("grid-square")
            );
        }
        

        newRow.append(
            $(`<div>${count}</div>`)
             .addClass("grid-box")
            //  .addClass("number-square")             
             );
             count++
    }

    newRow = $("<div></div>").addClass("grid-rowtop");
    newRow.append($("<div></div>")
    .addClass("grid-box")
);
    $("#grid").append(newRow);
    
    for(let j=0; j < totalCols; j++) {
        if (j - 1 < totalCols  ) {    
                newRow.append(
                $(`<div>${j+1}</div>`)
                 .addClass("grid-box")
                //  .addClass("number-square")             
                 )}
                } //<----------------
                
                newRow.append(
                   $(`<div></div>`)
                    .addClass("grid-box")
                )



    // modify CSS of grid square based on ratio
    $(".grid-square").css({"width": gaugeRows});
    $(".grid-square").css({"height": gaugeStitches});
    $(".grid-box").css({"width": gaugeRows});
    $(".grid-box").css({"height": gaugeStitches});


}

function createSelectedPaletteColors(colors) {

    pallette = $("<div></div>").addClass("color-pallette");
    paletteDiv = $("<div></div>").addClass("color-pallette-colors");

    for(let i=0; i<colors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", colors[i]);

        $(paletteDiv).append(newColorBlock);
    }

    $("#sample-colors").append(paletteDiv);    
}


$(document).ready(function(){    

    pixelColorClass = "color-0000ff";
    pixelColor = "#0000ff";
    prevColor = "white";
    setColor = "white";

    var gridDataJson = require('./grid-data.json');

    createGrid(gridDataJson["canvasRows"], gridDataJson["canvasColumns"], gridDataJson["gaugeStitches"], gridDataJson["gaugeRows"]);
    setSavedGridColors();
    createSelectedPaletteColors(gridDataJson["selectedPaletteColors"]);

    // set initial default pixel color to the first color of the palette
    pixelColor = gridDataJson["selectedPaletteColors"][0];


    $(".grid-square").on("click", function() {

        $(this).toggleClass(pixelColorClass);

        // change the grid square's background color to the selected color
        $(this).css("background-color", pixelColor);
        setColor = pixelColor;





        // if color block doesn't already exist in recently selected, add new color block
        // if(!$('#recently-selected div').hasClass(pixelColorClass)) {

        //     recentlySelectedBlock = $("<div></div>");
        //     recentlySelectedBlock.addClass("recently-selected-block");

        //     textBlock = $("<p></p>");
        //     textBlock.text(pixelColor);

        //     newColorBlock = $("<div></div>").addClass("recently-selected-square");
        //     newColorBlock.css("background-color", setColor)
        //     newColorBlock.addClass(pixelColorClass);

        //     recentlySelectedBlock.append(newColorBlock);
        //     recentlySelectedBlock.append(textBlock);

        //     $("#recently-selected").append(recentlySelectedBlock);

        //     // add input for changing color
        //     $("<input></input>").attr({
        //         type: "color", 
        //         value: pixelColor,
        //         class: "recently-selected-picker"
        //     }
        //     ).appendTo("#recently-selected");
        // }
    });

    $('.grid-square').on('mouseenter', function() {

        prevColor = $(this).css("background-color");
        setColor = prevColor;

        // change grid square hover background to the pixelColor
        $(this).css("background-color", pixelColor);

    }).on('mouseleave', function() {
        // change back to initial color on mouseleave / not hovering
        if(setColor != pixelColor)
            $(this).css("background-color", prevColor);
    });

    // change pixel color based on color picker
    $('#colorpicker').on('change', function() {
        pixelColor = this.value;
        pixelColorClass = "color-" + pixelColor.replace("#", "");
    });

    // clear grid when the clear grid button is clicked
    $('#clear-grid').on('click', function() {
        // temporary solution for clearing grid
        $(".grid-square").css("background-color", "white");

        // clear out color blocks from recently added
        $("#recently-selected div").remove();
    });


    $('#change-color').on('click', function() {
        // temporary solution for clearing grid
        $(".grid-square").css("background-color", "white");

        // clear out color blocks from recently added
        $("#recently-selected div").remove();
    });


    // https://www.learningjquery.com/2017/02/jquery-on-method-the-issue-of-dynamically-added-elements
    // working with elements created dynamically
    // delegate event instead of direct element
    // delegates the event from the parent
    $("#recently-selected, #sample-colors").on("click", ".recently-selected-square, .selected-square", function() {

        // convert from rgba to hex
        // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
        const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

        // change the grid square's background color to the selected color
        pixelColor = rgba2hex($(this).css("background-color"));
        pixelColorClass = "color-" + pixelColor.replace("#", "");
    });


    // change pattern color based on color picker
    // $('#recently-selected').on('change', 'input', function() {

    //     console.log(this);
    //     console.log(this.value.substring(1));

    //     pixelColor = this.value;
    //     pixelColorClass = "color-" + pixelColor.replace("#", "");

    //     console.log(pixelColorClass);
    //     // $("grid-square").removeClass("blue");
    //     // $("grid-square").addClass("blue");
    // });

    $(document).on('focusin', 'input', function(){
        console.log("Saving value " + $(this).val());
        $(this).data('val', $(this).val());
    }).on('change','input', function(){
        var prev = $(this).data('val');
        var current = $(this).val();

        prevClass = "color-" + prev.substring(1);

        pixelColor = this.value;
        pixelColorClass = "color-" + pixelColor.replace("#", "");


        $(prevClass).css("background-color", pixelColor);
        $(prevClass).css("padding", "100px");
    });

    $("#export-button").on("click", function() {

        // https://stackoverflow.com/questions/12997123/print-specific-part-of-webpage
        var prtContent = document.getElementById("grid");
        var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        
        WinPrint.document.write('<link rel="stylesheet" type="text/css" href="./styles.css">');
        
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.setTimeout(function(){
          WinPrint.focus();
          WinPrint.print();
          WinPrint.close();
        }, 1000);
    });


    



});




    //createGrid(20, 15);

//    $(".grid-square").on("click", function() {
//         $(this).toggleClass('clicked');
//     });
    


  // Keep canvas centered
 // function windowResized(){
   //   createGrid.position(((windowWidth - width)/2)+95, ((windowHeight - height)/2));
 // }:


// set pixel color to white when erase button is clicked
$('#erase').on('click', function() {
    pixelColor = "#FFFFFF";
});

function saveGridColors() {

    let colorsArr = [];

    $('#grid').children('.grid-row').each(function () {

        colorsArrRow = [];

        $(this).children('.grid-square').each(function() {
            colorsArrRow.push(rgba2hex($(this).css("background-color")));
        });

        colorsArr.push(colorsArrRow);
    });


    var gridDataJson = require('./grid-data.json');
    gridDataJson["gridColorsArr"] = colorsArr;

    let data = JSON.stringify(gridDataJson);
    fs.writeFileSync('grid-data.json', data);
}

function setSavedGridColors() {

    var gridDataJson = require('./grid-data.json');
    let row = 0;

    $('#grid').children('.grid-row').each(function () {

        let col = 0;

        try {
            $(this).children('.grid-square').each(function() {

                $(this).css("background-color", gridDataJson["gridColorsArr"][row][col]);
                col++;
            });
        } catch(error) {

        }

        row++;
    });
}


// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
  

// save the grid colors to the JSON when save button is clicked
$("#save").on("click", function() {
    saveGridColors();
    alert("Grid progress has been saved");
});



$("#ZoomIn").on("click", function() {

    zoomLevel = $("#grid").css("zoom");

    if (zoomLevel == 1) {
        $("#grid").css("zoom", "120%");
    } else if (zoomLevel == 0.8) {
        $("#grid").css("zoom", "100%");
    }
});

$("#ZoomOut").on("click", function() {

    zoomLevel = $("#grid").css("zoom");

    if (zoomLevel == 1) {
        $("#grid").css("zoom", "80%");
    } else if (zoomLevel == 1.2) {
        $("#grid").css("zoom", "100%");
    }
});