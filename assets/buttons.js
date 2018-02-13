//variables for buttons on page
var teams = ["Bulls", "Lakers", "Celtics", "Heat", "Pistons", "Cavaliers", "76ers", "Knicks", "Warriors"];

function alertTeamName() {
    var teamName = $(this).attr("data-name");

}

function createButtons() {

    $("#team-buttons").empty();

    // Looping through the array of teams

    for (var i = 0; i < teams.length; i++) {

        var a = $("<button>");

        a.addClass("team");
        // Adding a data-attribute
        a.attr("data-name", teams[i]);
        // a.attr("data-state", "still");
        a.text(teams[i]);
        // Adding the button to the HTML
        $("#team-buttons").append(a);
    }
    addGiphys()
}

$("#addTeam").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var team = $("#choice-input").val().trim();

    // Adding the movie from the textbox to our array
    teams.push(team);
    $("#choice-input").val()
    // Calling renderButtons which handles the processing of our movie array
    createButtons();

});

$(document).on("click", ".team", alertTeamName);
$(document).on("click", ".bballGiphs", controlGiphs);

createButtons();

function addGiphys() {

    $(".team").on("click", function (event) {

        event.preventDefault();

        var team = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&apikey=6CM6VNSiKBTp6aeVJFDDWXxJvphW4P3b&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data
    

            for (var j = 0; j < results.length; j++) {
                var teamsDiv = $("<div class='item'>");
                var rating = results[j].rating;
                var p = $("<p>").text("Rating: " + rating);
                var teamsImage = $("<img>");
                var animate = results[j].images.fixed_height.url;
                var static = results[j].images.fixed_height_still.url;
                teamsImage.addClass("bballGiphs");
                teamsImage.attr("data-animate", animate);
                teamsImage.attr("src", static);
                teamsImage.attr("data-still", static);
                teamsImage.attr("data-state", "still");
                teamsDiv.prepend(p);
                teamsDiv.prepend(teamsImage);
                $("#gifs-appear-here").prepend(teamsDiv);
            }
        });
    });
}
    
function controlGiphs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "data-animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "data-still");
    }
    console.log("this: " + this);
};
