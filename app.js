/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, dice, gamePlaying;
let diceImg = document.querySelector(".dice");
let winningScore;
init();
//Initializing the game with their default values
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    diceImg.style.display = "none";
    document.querySelector(".final-score").value = "";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    let player1 = document.querySelector(".player-0-panel");
    let player2 = document.querySelector(".player-1-panel");
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    player1.classList.remove("winner");
    player2.classList.remove("winner");
    player1.classList.remove("active");
    player1.classList.add("active");
    player2.classList.remove("active");
}

// Toggling the active players
function changeActivePlayer() {
    diceImg.style.display = "none";
    let prevActivePlayer = document.querySelector(
        ".player-" + activePlayer + "-panel"
    );
    prevActivePlayer.classList.remove("active");
    activePlayer = activePlayer ? 0 : 1;
    let currentActivePlayer = document.querySelector(
        ".player-" + activePlayer + "-panel"
    );
    currentActivePlayer.classList.add("active");
}

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // Generating a random number between 1 and 6.
        dice = Math.floor(Math.random() * 6) + 1;
        currentScore += dice;
        let currentPlayer = document.getElementById("current-" + activePlayer);
        currentPlayer.textContent = currentScore;

        //Displaying the result
        diceImg.style.display = "block";
        diceImg.src = "dice-" + dice + ".png";

        if (dice === 1) {
            currentScore = 0;
            scores[activePlayer] = 0;
            currentPlayer.textContent = "0";
            document.getElementById("score-" + activePlayer).textContent = "0";
            changeActivePlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        let input = document.querySelector(".final-score").value;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 30;
        }
        scores[activePlayer] += currentScore;
        document.getElementById("score-" + activePlayer).textContent =
            scores[activePlayer];
        currentScore = 0;
        document.getElementById(
            "current-" + activePlayer
        ).textContent = currentScore;
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            diceImg.style.display = "none";
            let playerPannel = document.querySelector(
                ".player-" + activePlayer + "-panel"
            );
            playerPannel.classList.add("winner");
            playerPannel.classList.remove("active");
            gamePlaying = false;
        } else {
            changeActivePlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);