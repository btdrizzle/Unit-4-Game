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
    
    for (var i = 0; i < 8; i++) {
        var champDiv = $("<div>");
        champDiv.addClass("tile d-inline-block border border-dark bg-dark m-2 text-white");
        champDiv.append($("<h4>").text(champions[i]["name"]));
        champDiv.append($("<img>", {"src": champions[i]["image"]})).addClass("img-fluid");
        champDiv.append($("<p>").addClass("lead hp-text")
                      .text("HP: " + champions[i]["HP"])
                    );
        $('#choose').append(champDiv); 
    }

    











});