// Global Variable:
let scores, roundScore, currentPlayer, gamePlaying, prevRollOne, prevRollTwo, totalDice;

initHandler();

// Event listeners:
document.querySelector('.btn-new').addEventListener('click', initHandler);
document.querySelector('.btn-roll').addEventListener('click', rollHandler);
document.querySelector('.btn-hold').addEventListener('click', holdHandler);

// Initializer:
function initHandler() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-one').style.display = 'none';
    document.getElementById('dice-two').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

// Change player:
function playerHandler() {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').innerText = '0';
    document.getElementById('current-1').innerText = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-one').style.display = 'none';
    document.getElementById('dice-two').style.display = 'none';
}

// Roll the dice management:
function rollHandler() {
    if (gamePlaying) {
        const diceOne = Math.floor(Math.random() * 6) + 1;
        const diceTwo = Math.floor(Math.random() * 6) + 1;
        let diceDOMOne = document.getElementById('dice-one');
        let diceDOMTwo = document.getElementById('dice-two');

        diceDOMOne.style.display = 'block';
        diceDOMTwo.style.display = 'block';
        diceDOMOne.setAttribute('src', `assets/img/dice-${diceOne}.png`);
        diceDOMTwo.setAttribute('src', `assets/img/dice-${diceTwo}.png`);

        if (diceOne !== 1 && diceTwo !== 1) {
            totalDice = diceOne + diceTwo;
            roundScore += totalDice;
            document.getElementById(`current-${currentPlayer}`).textContent = roundScore;
        } else if (prevRollOne === 6 && diceOne === 6 && prevRollTwo === 6 && diceTwo === 6) {
            scores[currentPlayer] = 0;
            document.getElementById(`score-${currentPlayer}`).textContent = '0';
            playerHandler();
        } else playerHandler();
        prevRollOne = diceOne;
        prevRollTwo = diceTwo;
    }
}

// Save current Score:
function holdHandler() {
    if (gamePlaying) {
        scores[currentPlayer] += roundScore;
        document.getElementById(`score-${currentPlayer}`).textContent = scores[currentPlayer];
        const input = document.querySelector('.final-score').value;
        let winningScore;

        if (input) {
            winningScore = input
        } else {
            winningScore = 100
        }

        if (scores[currentPlayer] >= winningScore) {
            document.getElementById('dice-one').style.display = 'none';
            document.getElementById('dice-two').style.display = 'none';
            document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else playerHandler()

    }
}
