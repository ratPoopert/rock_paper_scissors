// Global variables
let computerScore = 0;
let matchNumber = 1;
let playerScore = 0;
let roundNumber = 1;

// HTML elements
const $computerScore = document.getElementById('computer-score');
const $gameInfo = document.getElementById('game-info');
const $matchCounter = document.getElementById('match-counter');
const $matchResult = document.getElementById('match-result');
const $paperButton = document.getElementById('paper-button');
const $playerButtons = document.getElementById('player-buttons');
const $playerScore = document.getElementById('player-score');
const $playerUI = document.getElementById('player-ui');
const $resetButton = document.getElementById('reset-button');
const $rockButton = document.getElementById('rock-button');
const $roundCounter = document.getElementById('round-counter');
const $roundResult = document.getElementById('round-result');
const $scissorsButton = document.getElementById('scissors-button');

// Event listeners
$paperButton.addEventListener('click', handleClick);
$rockButton.addEventListener('click', handleClick);
$scissorsButton.addEventListener('click', handleClick);

$resetButton.addEventListener('click', () => {
    computerScore = 0;
    playerScore = 0;
    roundNumber = 1;
    $gameInfo.hidden = true;
    $resetButton.hidden = true;
    $matchResult.hidden = true;
    $playerUI.hidden = false;
});

function handleClick (e) {

    const playerChoice = e.target.value;
    const computerChoice = getComputerChoice();
    const roundWinner = getRoundWinner(computerChoice, playerChoice);

    switch (roundWinner) {
        case 'computer' :
            ++computerScore;
            break;
        case 'player' :
            ++playerScore;
            break;
    }

    const roundResult = getRoundResult(computerChoice, playerChoice, roundWinner);
    $matchCounter.textContent = `Match number: ${matchNumber}`;
    $roundCounter.textContent = `Round number: ${roundNumber}`;
    $playerScore.textContent = `Player score: ${playerScore}`;
    $computerScore.textContent = `Computer score: ${computerScore}`;
    $roundResult.textContent = roundResult;

    $gameInfo.hidden = false;

    if (playerScore === 5 || computerScore === 5) {
        const matchWinner = getMatchWinner(computerScore, playerScore);
        const matchResult = getMatchResult(matchWinner);
        $matchResult.textContent = matchResult;
        $matchResult.hidden = false;
        $playerUI.hidden = true;
        $roundResult.hidden = true;
        $resetButton.hidden = false;
        ++matchNumber;
        roundNumber = 0;
    }
    ++roundNumber;
}

function getMatchResult(matchWinner) {
    let matchResult;
    if (matchWinner === "computer") {
        matchResult = "The computer won this match!";
    } else {
        matchResult = "You won this match!";
    }
    return matchResult;
}

function getMatchWinner(computerScore, playerScore) {
    let matchWinner;
    if (computerScore > playerScore) {
        matchWinner = "computer";
    } else {
        matchWinner = "player";
    }
    return matchWinner;
}

function getRoundResult(computerChoice, playerChoice, roundWinner) {
    const roundResult = [];

    if (roundWinner === 'tie') {
        roundResult.push(`You and the computer both chose ${computerChoice}`);
        roundResult.push('This round is a tie!');
    } else {
        roundResult.push(`You chose ${playerChoice}. The computer chose ${computerChoice}.`);
        if (roundWinner === 'computer') {
            roundResult.push(`${computerChoice} beats ${playerChoice}.`);
            roundResult.push(`The computer won this round!`);
        } else {
            roundResult.push(`${playerChoice} beats ${computerChoice}.`);
            roundResult.push(`You won this round!`);
        }
    }
    return roundResult.join("\n");
}

function getComputerChoice() {
    let random = Math.floor( (Math.random() * 3) + 1);
    let computerChoice;
    switch (random) {
        case 1 :
            computerChoice = "Rock";
            break;
        case 2 :
            computerChoice = "Paper";
            break;
        case 3 :
            computerChoice = "Scissors";
            break;
    }
    return computerChoice;
}

function getRoundWinner(computerChoice, playerChoice) {
    let winner;
    if (computerChoice === playerChoice) {
        winner = "tie"
    } else if ((computerChoice === 'Rock' && playerChoice === 'Paper')
            || (computerChoice === 'Paper' && playerChoice === 'Scissors')
            || (computerChoice === 'Scissors' && playerChoice === 'Rock')) {
        winner = "player"
    } else {
        winner = "computer"
    }
    
    return winner;
}

