var teams = ["Bulls", "Lakers", "Celtics", "Heat", "Pistons", "Cavaliers", "76ers", "Knicks", "Warriors"];

function alertTeamName() {
    var teamName = $(this).attr("data-name");
    alert(teamName)
  }

function createButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#team-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < teams.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("team");
        // Adding a data-attribute
        a.attr("data-name", teams[i]);
        // Providing the initial button text
        a.text(teams[i]);
        // Adding the button to the HTML
        $("#team-buttons").append(a);
    }
}

$("#addTeam").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var team = $("#choice-input").val().trim();

    // Adding the movie from the textbox to our array
    teams.push(team);

    // Calling renderButtons which handles the processing of our movie array
    createButtons();

  });

  $(document).on("click", ".team", alertTeamName);

  // Calling the renderButtons function to display the intial buttons
  createButtons();