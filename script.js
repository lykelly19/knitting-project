$(document).ready(function(){

    
    function createGrid(totalRows, totalCols) {

        // $("#canvas").text("Canvas Start");
    
        for(let i=0; i<totalRows; i++) {
            
            // create a new div for every row
            newRow = $("<div></div>").addClass("test-row");
            $("#canvas").append(newRow);
    
            for(let j=0; j<totalCols; j++) {
    
                newRow.append(
                    $("<p></p>")
                        .addClass("test")
                );
            }
            
        }
    }
    
    createGrid(25, 20);
});