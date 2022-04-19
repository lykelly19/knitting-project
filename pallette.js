$(document).ready(function(){


    // from coolors.co

    var palletteJson = require('./data.json');

    for(var key in palletteJson) {
        createSampleColors(palletteJson[key]);
    }



    $('#addColor').on('click', function() {

        // pallette of 10 colors

    });



});


// https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename

$("input").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var file = e.originalEvent.srcElement.files[i];

        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onloadend = function() {
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
        $("input").after(img);
    }
});



// https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper

document.getElementById('start-button').addEventListener('click', () => {
    const resultElement = document.getElementById('result');

    eyeDropperResult = $("<div></div>").addClass("selected-square");


    if (!window.EyeDropper) {
        // resultElement.textContent = 'Your browser does not support the EyeDropper API';
        return;
    }

    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper.open({ signal: abortController.signal }).then(result => {

        eyeDropperResult.css("background-color", result.sRGBHex);

        // resultElement.textContent = result.sRGBHex;
        // resultElement.style.backgroundColor = ;
    }).catch(e => {
        // resultElement.textContent = e;
    });

    setTimeout(() => {
        abortController.abort();
    }, 2000);


    // console.log();

    $("#result").append(eyeDropperResult);

});



function createSampleColors(colors) {

    pallette = $("<div></div>").addClass("color-pallette");

    for(let i=0; i<colors.length; i++) {

        newColorBlock = $("<div></div>").addClass("selected-square");
        newColorBlock.css("background-color", colors[i]);

        $(pallette).append(newColorBlock);
    }

    $(pallette).append("<button>Select Pallette</button>");

    $("#sample-colors").append(pallette);
}