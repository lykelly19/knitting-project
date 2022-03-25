$(document).ready(function(){

    pixelColorClass = "color-0000ff";
    pixelColor = "#0000ff";
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
    $("#recently-selected").on("click", ".recently-selected-square", function() {

        // convert from rgba to hex
        // https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
        const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

        // change the grid square's background color to the selected color
        pixelColor = rgba2hex($(this).css("background-color"));
        pixelColorClass = "color-" + pixelColor.replace("#", "");
    });
    
});



