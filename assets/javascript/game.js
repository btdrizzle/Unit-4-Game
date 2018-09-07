$(document).ready(function() {
    var champions = {0: {
                        name: "Ezra",
                        isRebel: true,
                        image: "./assets/images/Ezra.jpg",
                        HP: 100,
                        attackBegin: 10,
                        counterAttack: 20},
                    1: {
                        name: "Ahsoka",
                        isRebel: true,
                        image: "./assets/images/Ahsoka.jpg",
                        HP: 135,
                        attackBegin: 8,
                        counterAttack: 30},
                    2: {
                        name: "Kanan",
                        isRebel: true,
                        image: "./assets/images/Kanan.jpg",
                        HP: 120,
                        attackBegin: 9,
                        counterAttack: 25},
                    3: {
                        name: "Chopper",
                        isRebel: true,
                        image: "./assets/images/Chopper.jpg",
                        HP: 75,
                        attackBegin: 50,
                        counterAttack: 5},
                    4: {
                        name: "GA Thrawn",
                        isRebel: false,
                        image: "./assets/images/GAThrawn.jpg",
                        HP: 150,
                        attackBegin: 15,
                        counterAttack: 20},
                    5: {
                        name: "Inquisitor",
                        isRebel: false,
                        image: "./assets/images/Inquisitor.jpg",
                        HP: 125,
                        attackBegin: 8,
                        counterAttack: 15},
                    6: {
                        name: "Agent Kallus",
                        isRebel: false,
                        image: "./assets/images/Kallus.jpg",
                        HP: 100,
                        attackBegin: 11,
                        counterAttack: 17},
                    7: {
                        name: "Tarkin",
                        isRebel: false,
                        image: "./assets/images/Tarkin.jpg",
                        HP: 200,
                        attackBegin: 6,
                        counterAttack: 2}
    };
    var playlist = ["../assets/audio/Alliance.mp3",
                    "../assets/audio/Glory_of_the_empire.mp3",
                    "../assets/audio/Yodas_guidance.mp3",
                    "../assets/audio/Imperial_Inquisition.mp3"];

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
    bgAudio();
    function bgAudio () {
        var playlist_index;
        playlist_index = 0;
        audio = new Audio();
        audio.src = playlist[0];
        audio.loop = false;
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
    bgAudio();


    var click = new sound("../assets/audio/heavy_throw_switch.mp3");
    
    playGame();
    function playGame() {


        for (var i = 0; i < 8; i++) {
            var champDiv = $("<div>");
            champDiv.addClass("tile d-inline-block border border-dark bg-dark m-2 text-white");
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

        $(".tile").on("click", function() {
            if( $('#champion').is(':empty')) {
                click.play();
                $('#game-info-text').empty();
                $(this).attr("data-champOrAdversary", "champion");

                $('#champion').append($(this));
                $('#choose-text').text("Choose your adversary!");
            }
            else if( $('#adversary').is(':empty')) {
                click.play();
                $('#game-info-text').empty();
                $(this).attr("data-champOrAdversary", "adversary");                   
                $('#adversary').append($(this));
            }
        });
        $('#attack').on("click", function() {
            if( $('#champion').is(':empty')) {
                $("#game-info-text").text("You have not selected a champion!");
            }
            else if( ($('#champion').is(':empty') === false) && $('#adversary').is(':empty')) {
                $("#game-info-text").text("You have not selected an adversary!");
            }
            else {
                clickFunction();
            }
        });
        function playAgainButton() {
            var playAgainButton = $('<button>');
            playAgainButton.text('Click to play again!');

            $('#game-over-button').append(playAgainButton);
            playAgainButton.on('click', function() {
                $('#champion').empty();
                $('#adversary').empty();
                $('#choose').empty();
                $('#game-info-text').empty();
                $('#game-end-text').empty();
                $('#game-over-text').empty();
                $('#game-over-button').empty();
                $('#choose-text').text('Choose your champion!');
                playGame();
            });

        }

        var goodGuy,badGuy,goodHP,badHP,goodAttack,badCounter,goodName,badName,newText,newBadHP,newGoodHP, gameOver;
        
        function clickFunction() {
            if(gameOver === true) {
                return
            }
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
            
            whatHappensNow();
            function whatHappensNow() {
                if(parseInt(badGuy.attr("data-HP")) < 1) {
                    $('#game-end-text').text("You have defeated an enemy!  The force is strong with you!  Select another!");
                    $('#adversary').empty();
                }
                if(parseInt(goodGuy.attr("data-HP")) < 1) {
                    $('#game-over-text').text("You have lost the game, padawan!  Click below to play again!  Do or do not, there is no try!");
                    gameOver === true;
                    playAgainButton();
                    return
                }
                if((parseInt(badGuy.attr("data-HP")) < 1) && $('#choose').is(':empty')) {
                    $('#game-over-text').text("You have won the game!  You are the chosen one who brings balance to the force!");
                    gameOver === true;
                    playAgainButton();
                    return
                }
                
            }
        }
    }


    












});