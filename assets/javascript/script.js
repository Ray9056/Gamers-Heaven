//Initial array of games	
$(document).ready(function() {

    var gameGif = ["World Of Warcraft", "Fortnite", "Call of Duty", "God Of War", "League of Legends", 
    "Assassin's Creed", "Minecraft", "Devil May Cry 5", "Super Smash Bros.", "Overwatch", "Grand Theft Auto", 
    "The Legend of Zelda", "Mortal Kombat", "Minecraft", "Borderlands 3", "Grand Theft Auto V"];	
  
    //  create gameGif array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < gameGif.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('gamer');
              a.attr('data-name', gameGif[i]);
              a.text(gameGif[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.gamer', function() {
  
      //new variable will log the text data from each button
      var gamersHeaven = $(this).html(); 
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gamersHeaven + "&api_key=dc6zaTOxFJmzC&limit=10";
  
      // Creating an AJAX call for the specific game button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //empties the div before adding more gifs
          $('#games-view').empty();
          for ( var j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#games-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each game
          var rating = results[j].rating;

          var displayRated= $('<p>').text("Rating: " + rating);
          $('#games-view').prepend(displayRated);
    } // end for loop
  
  }); // done
  
      //function to stop and animate gifs
      function playGif() { 
                  var state = $(this).attr('data-state');

                  if (state == 'still'){
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                  }

            } //end of on click function
  
        }); //end of document on click 
  
        //adding new button to array
          $(document).on('click', '#add-game', function(){
              if ($('#game-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              var games = $('#game-input').val().trim();
              gameGif.push(games);
              $('#game-input').val('');
              renderButtons();
              return false;
  
              }
  
          });
                        
  
          }); // end click function
  
  