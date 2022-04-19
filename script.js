 const $gridElement = $('#grid');
 const $inputColumn = $('#inputColumn');
 const $inputRow = $('#inputRow');

  //Need to include jQuery UI for sliders

  
$('#sizePicker').submit( event => {
  event.preventDefault();

  let width = $inputColumn.val();
  let height = $inputRow.val();

  $gridElement.html(''); //clear


  createGrid(height, width);
});

    function createGrid(totalRows, totalCols) {
    console.log(totalCols);
    console.log(totalRows);
         //iterate through the rows
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
                console.log(newRow);

           }
        }
    }
    
    //createGrid(20, 15);

   $(".grid-square").on("click", function() {
        $(this).toggleClass('clicked');
    });
    


  // Keep canvas centered
 // function windowResized(){
   //   createGrid.position(((windowWidth - width)/2)+95, ((windowHeight - height)/2));
 // }: