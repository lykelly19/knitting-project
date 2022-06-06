 const $gridElement = $('#grid');
 const $inputColumn = $('#inputColumn');
 const $inputRow = $('#inputRow');


// $('#sizePicker').submit( event => {
//   event.preventDefault();

//   let width = $inputColumn.val();
//   let height = $inputRow.val();

//   $gridElement.html(''); //clear


//   createGrid(height, width);
// });

let count = 0

function createGrid(totalRows, totalCols) {

         //iterate through the rows
        for(let i=0; i<totalRows; i++) {
            
            // create a new div for the row & add to grid
            newRow = $(`<div> </div>`).addClass("grid-row");
            // newRow.append(
                // $(`<div>${count}</div>`)
                    //  .addClass("grid-square")                
            //  );
            $("#grid").append(newRow);
            //  count++
            
            // iterate through the columns
            for(let j=0; j<totalCols; j++) {
    
               newRow.append(
                   $("<div></div>")
                        .addClass("grid-square")
                    
                );
           }
        }
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

    createGrid(gridDataJson["canvasRows"], gridDataJson["canvasColumns"]);
    createSelectedPaletteColors(gridDataJson["selectedPaletteColors"]);

    // set initial default pixel color to the first color of the palette
    pixelColor = gridDataJson["selectedPaletteColors"][0];


    $(".grid-square").on("click", function() {

        $(this).toggleClass(pixelColorClass);

        // change the grid square's background color to the selected color
        $(this).css("background-color", pixelColor);
        setColor = pixelColor;

        // if color block doesn't already exist in recently selected, add new color block
        if(!$('#recently-selected div').hasClass(pixelColorClass)) {

            recentlySelectedBlock = $("<div></div>");
            recentlySelectedBlock.addClass("recently-selected-block");

            textBlock = $("<p></p>");
            textBlock.text(pixelColor);

            newColorBlock = $("<div></div>").addClass("recently-selected-square");
            newColorBlock.css("background-color", setColor)
            newColorBlock.addClass(pixelColorClass);

            recentlySelectedBlock.append(newColorBlock);
            recentlySelectedBlock.append(textBlock);

            $("#recently-selected").append(recentlySelectedBlock);

            // add input for changing color
            $("<input></input>").attr({
                type: "color", 
                value: pixelColor,
                class: "recently-selected-picker"
            }
            ).appendTo("#recently-selected");
        }
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


    $(".grid-square").on("click", $(this), function() {
        console.log("h");

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
        console.log("Prev value " + prev);

        prevClass = "color-" + prev.substring(1);
        console.log(prevClass);


        pixelColor = this.value;
        console.log(pixelColor);
        pixelColorClass = "color-" + pixelColor.replace("#", "");


        $(prevClass).css("background-color", pixelColor);
        $(prevClass).css("padding", "100px");

        console.log("New value " + current);


        console.log(pixelColorClass);
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