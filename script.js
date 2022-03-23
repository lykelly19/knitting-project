$(document).ready(function(){

    // Need to include jQuery UI for sliders

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
        $(this).toggleClass('clicked');
    });
    
});


