$(document).ready(function(){

    pixelColorClass = "clicked";
    pixelColor = "blue";
    prevColor = "white";
    setColor = "white";

    function createGrid(totalRows, totalCols) {
    
        // iterate through the rows
        for(let i=0; i<totalRows; i++) {
            
            // create a new div for the row & add to grid
            newRow = $("<div></div>").addClass("grid-row");
            $("#grid").append(newRow);
    

            // iterate through the columns
            for(let j=0; j<totalCols; j++) {
    
                newRow.append(
                    $("<div></div>")
                        .addClass("grid-square")
                );
            }
        }
    }
    
    createGrid(25, 20);


    $(".grid-square").on("click", function() {
        // $(this).toggleClass(pixelColorClass);

        // change the grid square's background color to the selected color
        $(this).css("background-color", pixelColor);
        setColor = pixelColor;
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

    $('#colorpicker').on('change', function() {
        pixelColor = this.value;
        pixelColorClass = "color-" + pixelColor.replace("#", "");
    });

});


