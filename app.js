/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, dice;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
let diceImg = document.querySelector('.dice');
diceImg.style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function changeActivePlayer() {
    let prevActivePlayer = document.querySelector('.player-' + activePlayer + '-panel');
    prevActivePlayer.classList.remove('active');
    activePlayer = activePlayer ? 0 : 1;
    let currentActivePlayer = document.querySelector('.player-' + activePlayer + '-panel');
    currentActivePlayer.classList.add('active');
}

document.querySelector(".btn-roll").addEventListener('click', function() {
    // Generating a random number between 1 and 6.
    dice = Math.floor(Math.random() * 6) + 1;
    //Displaying the result
    diceImg.style.display = 'block';
    diceImg.src = 'dice-' + dice + '.png';
    let playerScore = document.querySelector('#current-' + activePlayer);
    playerScore.textContent = dice.toString();
    let val = document.querySelector('#score-' + activePlayer);
    val.textContent = parseInt(val.textContent) + dice;
    if (dice === 1) {
        val.textContent = '0';
        changeActivePlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    changeActivePlayer();
});