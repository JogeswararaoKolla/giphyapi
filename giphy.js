// Constructing a queryURL using the animal name
const queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=7OHP8NfBNgbjOC2wjH9oUyAKyNDA51lH&q=";
const apiKey = "&limit=10&rating=G";
let topicsLower = ["cat", "tiger", "hamster", "bird"];

function createButtons() {
    console.log("called first");
    // Code for creating Buttons it will clear first 
    $("#buttonItems").empty();
    topicsLower.forEach(function (element, index, array) {
        const buttonElement = $("<button>");
        buttonElement.attr({ id: element, class: "ButtonItemsList" });
        buttonElement.text(element);
        $("#buttonItems").append(buttonElement);
    });
}

// This block of code is called for adding New Button to the page
function createButtonsAppend(){
     const elementBtnAppend=topicsLower.pop();
     console.log("called Second");
     console.log(elementBtnAppend);
    $("#buttonItems").append($("<button>").attr({
        id: elementBtnAppend, 
        class: "ButtonItemsList"
    }).text(elementBtnAppend));
}

$(document).ready(function () {

    createButtons();

    $("#addGifsbtn").click(function (event) {
        event.preventDefault();
        // Onclick on addGifsbtn get the value from addGifs and push to Global Array
        //Check for input text string is not blank
        if ($("#addGifs").val().trim().length) {
            let elementGif = $("#addGifs").val().trim();
            elementGif = elementGif.toLowerCase();
            if (topicsLower.indexOf(elementGif) != -1) {
                alert("Duplicate button!!");
                console.log(elementGif);
            }
            else {
                topicsLower.push(elementGif);
                console.log(topicsLower);
            }
        }
        else {
            alert("Input text Blank!!");
        }
        createButtonsAppend();
        // Set Input text to blank after the button Creation
        $("#addGifs").val("");
    });

    $(document).on('click', '.ButtonItemsList', function (event) {
        event.preventDefault();
        $("#Images").empty();
        $.ajax({
            url: queryURL + $(this).attr('id') + apiKey,
            method: 'GET'
        }).then(function (resObj) {
            console.log(queryURL + $(this).attr('id') + apiKey);
            console.log(resObj);
            let resObjResult = resObj.data;
            for (let i = 0; i < resObjResult.length; i++) {
                console.log(resObjResult[i].images);
                $("#Images").prepend($("<div>").append($("<p>").text("Rating:" + resObjResult[i].rating), $("<img>").attr({
                    src: resObjResult[i].images.fixed_height_still.url,
                    class: "ImagesList",
                    height: '200px',
                    width: '200px',
                    "data-still": resObjResult[i].images.fixed_height_still.url,
                    "data-animate": resObjResult[i].images.fixed_height.url,
                    "data-state": "still"
                })));
            }

        });

    });
    $(document).on('click', ".ImagesList", function (event) {
        event.preventDefault();
        console.log(event);
        console.log($(this).attr("data-state"));
        if ($(this).attr("data-state") == "still") {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr("data-state", "animated");
        }
        else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});
