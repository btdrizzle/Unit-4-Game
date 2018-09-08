$(document).ready(function() {
    //Object with all properties needed for each character
    var champions = {0: {
                        name: "Ezra",
                        image: "./assets/images/Ezra.jpg",
                        HP: 100,
                        attackBegin: 10,
                        counterAttack: 20},
                    1: {
                        name: "Ahsoka",
                        image: "./assets/images/Ahsoka.jpg",
                        HP: 135,
                        attackBegin: 8,
                        counterAttack: 30},
                    2: {
                        name: "Kanan",
                        image: "./assets/images/Kanan.jpg",
                        HP: 120,
                        attackBegin: 9,
                        counterAttack: 25},
                    3: {
                        name: "Chopper",
                        image: "./assets/images/Chopper.jpg",
                        HP: 75,
                        attackBegin: 50,
                        counterAttack: 5},
                    4: {
                        name: "GA Thrawn",
                        image: "./assets/images/GAThrawn.jpg",
                        HP: 150,
                        attackBegin: 15,
                        counterAttack: 20},
                    5: {
                        name: "Inquisitor",
                        image: "./assets/images/Inquisitor.jpg",
                        HP: 125,
                        attackBegin: 8,
                        counterAttack: 15},
                    6: {
                        name: "Agent Kallus",
                        image: "./assets/images/Kallus.jpg",
                        HP: 100,
                        attackBegin: 11,
                        counterAttack: 17},
                    7: {
                        name: "Tarkin",
                        image: "./assets/images/Tarkin.jpg",
                        HP: 200,
                        attackBegin: 6,
                        counterAttack: 2}
    };
    //Playlist used for background music
    var playlist = ["./assets/audio/Alliance.mp3",
                    "./assets/audio/Glory_of_the_Empire.mp3",
                    "./assets/audio/Yodas_Guidance.mp3",
                    "./assets/audio/Imperial_Inquisition.mp3"];
                    
    //Using this function to play event sounds           
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    }
    //Click Sound
    var clicky = new sound("./assets/audio/heavy_throw_switch.mp3");
    var force = new sound("./assets/audio/Strongwiththeforce.mp3");
    var darkside = new sound("./assets/audio/darkside.mp3");

    //This sound function is for background music

    function bgAudio() {
        var playlist_index;
        playlist_index = 0;
        audio = new Audio();
        audio.src = playlist[0];
        audio.loop = false;
        audio.volume = 0.25;
        audio.play();
        audio.addEventListener('ended', function() {
            switchTrack();
        });
        function switchTrack() {
            if(playlist_index == (playlist.length -1)) {
                playlist_index = 0;
            }
            else {
                playlist_index++;
            }
            audio.src = playlist[playlist_index];
            audio.play();
        }
    }

    $('#audioButton').on('click', function() {
        if(!audio.play) {
            bgAudio();
        }
        else {
            if(audio.pause) {
                audio.play();
            }else{
                audio.pause();
            }
        }
    });

    //This function creates character tiles and gives them attributes and classes
    function makeCharacters() {
        for (let i = 0; i < 8; i++) {
            var champDiv = $("<div>");
            champDiv.addClass("tile d-inline-block border border-dark bg-dark m-2 text-white btn");
            champDiv.append($("<h4>").text(champions[i]["name"]));
            champDiv.append($("<img>", {"src": champions[i]["image"]})).addClass("img-fluid");
            champDiv.append($("<p>").addClass("lead font-weight-bold hp-text")
                        .text("HP: " + champions[i]["HP"])
                        );
    
            for(var k in champions[i]) {
                var dataVar = "data-" + k;
                champDiv.attr(dataVar, champions[i][k]);
            }
            $('#choose').append(champDiv); 
        }
    }
    //Variables needed to make the game work, especially with calculations

    var goodGuy,badGuy,goodHP,badHP,goodAttack,badCounter,goodName,badName,newText,newBadHP,newGoodHP, gameOver; 
    
    //This is what happens when the "Attack" button is clicked and the game is played
    function clickFunction() {
        console.log('asdf')
        $('#adversary').off();
        if(gameOver === true) {
            return;
        }
        else if($('#champion').is(':empty')) {
            clicky.play();
            $("#game-info-text").text("You have not selected a champion!");
        }
        else if($('#adversary').is(':empty')) {
            clicky.play();
            $('#game-end-text').empty();
            $("#game-info-text").text("You have not selected an adversary!");
        }
        else {
            clicky.play();
            $('#game-end-text').empty();
            goodGuy = $('[data-champOrAdversary="champion"]');
            badGuy = $('[data-champOrAdversary="adversary"]');
            goodHP = goodGuy.attr("data-HP");
            badHP = badGuy.attr("data-HP");
            
            goodAttack = goodGuy.attr("data-attackBegin");
            badCounter = badGuy.attr("data-counterAttack");
            goodName = goodGuy.attr("data-name");
            badName = badGuy.attr("data-name");
            

            newBadHP = parseInt(badHP) - parseInt(goodAttack);
            newGoodHP = parseInt(goodHP) - parseInt(badCounter);

            badGuy.attr("data-HP", newBadHP);


            goodGuy.attr("data-HP", newGoodHP);

            goodGuy.find('.lead').text("HP: " + goodGuy.attr("data-HP"));
            badGuy.find('.lead').text("HP: " + badGuy.attr("data-HP"));
            

            newText = (goodName + " dealt " + badName + " an attack worth " + goodAttack + " HP. " + badName + " countered with an attack worth " + badCounter + " HP.");

            $('#game-info-text').text(newText);
            
            goodAttack = parseInt(goodAttack) + parseInt(goodAttack);

            goodGuy.attr("data-attackBegin", goodAttack);

            //Analyzes what happened during the click of "Attack" and makes determinations
            if((newBadHP < 1) && $('#choose').is(':empty')) {
                $('#game-over-text').text("You have won the game!  You are the chosen one who brings balance to the force!");
                force.play();
                gameOver === true;
                playAgainButton();
                
            }
            else if(newBadHP < 1) {
                console.log('win')
                $('#game-end-text').text("You have defeated an enemy!  The force is strong with you!  Select another!");
                $('#adversary').empty();
                if(parseInt(goodGuy.attr("data-HP")) < 1) {
                    $('#game-end-text').empty();
                    $('#game-over-text').text("You have lost the game, padawan!  Click below to play again!  Do or do not, there is no try!");
                    darkside.play();
                    gameOver === true;
                    playAgainButton();
                    
                }
            }
            else if(newGoodHP < 1) {
                $('#game-over-text').text("You have lost the game, padawan!  Click below to play again!  Do or do not, there is no try!");
                darkside.play();
                gameOver === true;
                playAgainButton();
                
            }
        }
    }
    //This cleans the slate for a new game
    function playAgainButton() {
        var playAgainButton = $('<button>');
        playAgainButton.text('Click to play again!');
        playAgainButton.attr("type","button");
        playAgainButton.addClass("btn btn-light");

        $('#game-over-button').append(playAgainButton);
        playAgainButton.on('click', function() {
            clicky.play();
            goodGuy === ""
            badGuy === ""
            goodHP === ""
            badHP === ""
            goodAttack === ""
            badCounter === ""
            goodName === ""
            badName === ""
            newText === ""
            newBadHP === ""
            newGoodHP === ""
            $('#champion').empty();
            $('#adversary').empty();
            $('#choose').empty();
            $('#game-info-text').empty();
            $('#game-end-text').empty();
            $('#game-over-text').empty();
            $('#game-over-button').empty();
            $('#choose-text').text('Choose your champion!');
            gameOver === false;
            makeCharacters();

            // playGame();
        });

    }


    function playGame() {
        gameOver === false;

        makeCharacters();

        //Fills "Champion" first, then "Adversary."  Then only "Adversary" until the next game.
        $("body").on("click", ".tile", function() {
            if( $('#champion').is(':empty')) {
                clicky.play();
                $('#game-info-text').empty();
                $(this).attr("data-champOrAdversary", "champion");

                $('#champion').append($(this));
                $('#choose-text').text("Choose your adversary!");
            }
            else if( $('#adversary').is(':empty')) {
                clicky.play();
                $('#game-info-text').empty();
                $('#game-end-text').empty();
                $(this).attr("data-champOrAdversary", "adversary");                   
                $('#adversary').append($(this));
            }
        });

        //What happens when the "Attack" button is clicked

        $('#attack').on("click", function() {
            clickFunction();
        });

    }
    //Play the game for the first time
    playGame();
});