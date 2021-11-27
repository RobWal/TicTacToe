//DECLARING GLOBAL VARIABLES
let currentPlayer = 'playerOne';
let totalClicks = 0;
let totalSquares = 0;
let wasGameWon = false;
let playerOne = {
    id: 'First-Player',
    username: 'First-Player',
    color: 'rgb(179, 255, 153)',
    score: 0,
};
let playerTwo = {
    id: 'Second-Player',
    username: 'Second-Player',
    color: 'rgb(255, 221, 153)',
    score: 0,
};
let moveLogArray = [];

//LINKING JS TO HTML
const body = document.querySelector('body');
const square = document.getElementsByClassName('square');
const square11 = document.getElementById('1,1');
const square21 = document.getElementById('2,1');
const square31 = document.getElementById('3,1');
const square12 = document.getElementById('1,2');
const square22 = document.getElementById('2,2');
const square32 = document.getElementById('3,2');
const square13 = document.getElementById('1,3');
const square23 = document.getElementById('2,3');
const square33 = document.getElementById('3,3');
const playerOneTag = document.getElementById('playerOne');
const playerTwoTag = document.getElementById('playerTwo');
const messageBox = document.getElementById('messageBox');
const moveLogButton = document.getElementById('moveLog');
const restartGameButton = document.getElementById('restartGame');
const restartScoreButton = document.getElementById('restartScore');
const bestOfButton = document.getElementById('bestOf');
const bestOfHint = document.getElementById('bestOfHint');
const bestOfGrey = document.getElementById('bestOfGrey');
const changeNameButton = document.getElementById('changeName');
const nameChangeGrey = document.getElementById('nameChangeGrey');
const nameChangeError = document.getElementById('nameChangeError');
const submitNamesButton = document.getElementById('submitNameChanges');
const toggleTipsButton = document.getElementById('toggleTips');
const moveLogPrint = document.getElementById('moveLogPrint');
playerOneNameInput = document.getElementById('playerOneNameInput');
playerTwoNameInput = document.getElementById('playerTwoNameInput');
bestOfAccouncer = document.getElementById('bestOfAnnouncer');
bestOfScore = document.getElementById('bestOfScore');

playerOneTag.innerText = `${playerOne.username}:  ${playerOne.score}`;
playerTwoTag.innerText = `${playerTwo.username}:  ${playerTwo.score}`;

//UNDERLINES CURRENT PLAYER
function underlineCurrent() {
    if (currentPlayer === 'playerOne') {
        playerOneTag.style.textDecoration = 'underline';
        playerTwoTag.style.textDecoration = 'none';
    } else {
        playerTwoTag.style.textDecoration = 'underline';
        playerOneTag.style.textDecoration = 'none';
    }
}
underlineCurrent();

//ALTERS CLICKED SQUARE, CHECKS FOR A WIN
const playerChooses = (event) => {
    let notYetClicked = !event.target.classList.contains('clicked');
    if (notYetClicked) {
        logMoveLog(event);
        event.target.classList.add('clicked');
        if (`${currentPlayer}` === 'playerOne') {
            event.target.innerText = 'X';
            event.target.style.backgroundColor = `${playerOne.color}`;
            event.target.classList.add(`${playerOne.id}`);
        } else {
            event.target.innerText = 'O';
            event.target.style.backgroundColor = `${playerTwo.color}`;
            event.target.classList.add(`${playerTwo.id}`);
        }
        //GAME CANNOT BE WON BEFORE 5TH MOVE - PREVENT POINTLESS CHECKS
        if (!(totalClicks < 4)) {
            checkRowsAndColumns(event);
            checkDiagonals(event);
        }
        if (currentPlayer === 'playerOne') {
            currentPlayer = 'playerTwo';
        } else {
            currentPlayer = 'playerOne';
        }
        underlineCurrent();
        totalClicks++;
        //IF ALL BOXES CLICKED W/O WINNER
        if (totalClicks === 9 && wasGameWon === false) {
            messageBox.innerText = "It's a draw!";
        }
    }
};

//ADDING EVENT LISTENERS TO SQUARES/BUTTONS
for (let value of square) {
    totalSquares++;
    value.addEventListener('click', playerChooses);
}

//CHECK FOR A WIN IN SAME ROW/COLUMN
//rowOrColumn = 1 TARGETS ROWS, =2 TARGETS COLUMNS
const checkRowsAndColumns = (event) => {
    let squarePlayerID = event.target.classList[4];
    let rowOrColumn = 1;
    while (rowOrColumn < 3) {
        let winCheck = 0;
        for (let value of square) {
            if (
                value.classList.contains(event.target.classList[rowOrColumn]) &&
                value.classList.contains(squarePlayerID)
            ) {
                winCheck++;
            }
        }
        if (winCheck === 3) {
            scoreAdder(event);
            if (rowOrColumn === 1) {
                if (currentPlayer === 'playerOne') {
                    messageBox.innerText = `${playerOne.username} won with three in the same row!`;
                } else {
                    messageBox.innerText = `${playerTwo.username} won with three in the same row!`;
                }
            } else {
                if (currentPlayer === 'playerOne') {
                    messageBox.innerText = `${playerOne.username} won with three in the same column!`;
                } else {
                    messageBox.innerText = `${playerTwo.username} won with three in the same column!`;
                }
            }
            stopClicking();
        }
        rowOrColumn++;
    }
};

//CHECKS FOR DIAGONAL WIN
const checkDiagonals = (event) => {
    let squarePlayerID = event.target.classList[4];
    if (
        (event.target.id === '1,1' &&
            square33.classList[4] === squarePlayerID &&
            square22.classList[4] === squarePlayerID) ||
        (event.target.id === '3,1' &&
            square13.classList[4] === squarePlayerID &&
            square22.classList[4] === squarePlayerID) ||
        (event.target.id === '1,3' &&
            square31.classList[4] === squarePlayerID &&
            square22.classList[4] === squarePlayerID) ||
        (event.target.id === '3,3' &&
            square11.classList[4] === squarePlayerID &&
            square22.classList[4] === squarePlayerID) ||
        (event.target.id === '2,2' &&
            square11.classList[4] === squarePlayerID &&
            square33.classList[4] === squarePlayerID) ||
        (event.target.id === '2,2' &&
            square31.classList[4] === squarePlayerID &&
            square13.classList[4] === squarePlayerID)
    ) {
        if (currentPlayer === 'playerOne') {
            messageBox.innerText = `${playerOne.username} won diagonally!`;
        } else {
            messageBox.innerText = `${playerTwo.username} won diagonally!`;
        }
        scoreAdder(event);
        stopClicking();
    }
};

//ADDS 'CLICKED' CLASS TO SQUARES WITHOUT IT, ACTS AS CLICKABLE STOPPER
const stopClicking = () => {
    for (let value of square) {
        if (!value.classList.contains('clicked')) {
            value.classList.add('clicked');
        }
    }
    wasGameWon = true;
};

const scoreAdder = (event) => {
    if (playerOne.id === event.target.classList[4]) {
        playerOne.score++;
        playerOneTag.innerText = `${playerOne.username}:  ${playerOne.score}`;
    } else {
        playerTwo.score++;
        playerTwoTag.innerText = `${playerTwo.username}:  ${playerTwo.score}`;
    }
};

//LOG MOVELOG FUNCTIONALITY
const logMoveLog = (event) => {
    let element = document.createElement('p');
    if (currentPlayer === 'playerOne') {
        element.innerText = `${totalClicks + 1}: ${
            playerOne.username
        } clicked cell ${event.target.id}`;
    } else {
        element.innerText = `${totalClicks + 1}: ${
            playerTwo.username
        } clicked cell ${event.target.id}`;
    }
    moveLogPrint.appendChild(element);
};

//MOVE LOG BUTTON FUNCTIONALITY
const showMoveLog = () => {
    moveLogPrint.classList.toggle('hidden');
    if (
        moveLogButton.style.backgroundColor === '' ||
        moveLogButton.style.backgroundColor === 'rgba(95, 140, 255, 0.63)'
    ) {
        moveLogButton.style.backgroundColor = '#0040e2a1';
    } else {
        moveLogButton.style.backgroundColor = 'rgba(95, 140, 255, 0.63)';
    }
};
moveLogButton.addEventListener('click', showMoveLog);

//RESTART THE GAME, RESET VARIABLES
const restartGame = () => {
    for (let value of square) {
        value.innerText = '';
        value.style.backgroundColor = 'white';
        value.classList.remove('clicked');
        value.classList.remove(`${playerOne.id}`);
        value.classList.remove(`${playerTwo.id}`);
    }
    moveLogPrint.innerHTML = '';
    messageBox.innerText = '';
    moveLogArray = [];
    totalClicks = 0;
    currentPlayer = 'playerOne';
    underlineCurrent();
    wasGameWon = false;
};
restartGameButton.addEventListener('click', restartGame);

const restartScore = () => {
    playerOne.score = 0;
    playerOneTag.innerText = `${playerOne.username}:  ${playerOne.score}`;
    playerTwo.score = 0;
    playerTwoTag.innerText = `${playerTwo.username}:  ${playerTwo.score}`;
};
restartScoreButton.addEventListener('click', restartScore);

const bestOf = () => {
    bestOfGrey.style.opacity = '1';
    bestOfGrey.style.pointerEvents = 'all';
};
bestOfButton.addEventListener('click', bestOf);

const hideBestOf = (event) => {
    if (
        event.target.id === 'bestOfGrey' ||
        event.target.classList.contains('bestOfChoice')
    ) {
        bestOfGrey.style.opacity = '0';
        bestOfGrey.style.pointerEvents = 'none';
    }
};
bestOfGrey.addEventListener('click', hideBestOf);

const bestOfChoice = (event) => {
    restartScore();
    restartGame();
    hideBestOf(event);
    let competitionLength = event.path[0].innerText;
    console.log(competitionLength);
    restartGameButton.style.pointerEvents = 'none';
    restartGameButton.style.backgroundColor = 'rgb(121, 121, 121)';
    restartScoreButton.style.pointerEvents = 'none';
    restartScoreButton.style.backgroundColor = 'rgb(121, 121, 121)';
    changeNameButton.style.pointerEvents = 'none';
    changeNameButton.style.backgroundColor = 'rgb(121, 121, 121)';
    bestOfButton.style.pointerEvents = 'none';
    bestOfButton.style.backgroundColor = 'rgb(121, 121, 121)';
    bestOfAccouncer.innerText = `You have begun a best of ${event.path[0].innerText}`;
    bestOfScore.innerText = `The current scores are      ${playerOne.username}:  ${playerOne.score}, ${playerTwo.username}:  ${playerTwo.score} `;
    for (let i = 0; i < competitionLength; i++) {
        console.log(i);
    }
};

document.getElementById('bestOfOne').addEventListener('click', bestOfChoice);
document.getElementById('bestOfThree').addEventListener('click', bestOfChoice);
document.getElementById('bestOfFive').addEventListener('click', bestOfChoice);
document.getElementById('bestOfSeven').addEventListener('click', bestOfChoice);
document.getElementById('bestOfNine').addEventListener('click', bestOfChoice);

const showBestOfHint = () => {
    if (!bestOfButton.classList.contains('noTips')) {
        bestOfHint.style.opacity = '1';
        bestOfHint.style.pointerEvents = 'all';
    }
};
bestOfButton.addEventListener('mouseover', showBestOfHint);

const hideBestOfHint = () => {
    bestOfHint.style.opacity = '0';
    bestOfHint.style.pointerEvents = 'none';
};
bestOfHint.addEventListener('click', hideBestOfHint);

//FUNCTION CALLED BY 'CHANGE NAME' BUTTON, CREATES FORM TO ALTER NAMES
const changeName = () => {
    nameChangeGrey.style.opacity = '1';
    nameChangeGrey.style.pointerEvents = 'all';
};
changeNameButton.addEventListener('click', changeName);

//TOGGLED WHEN SUBMITTING / CLICKING GREY SPACE
const exitNameChange = (event) => {
    if (event.target.id === 'nameChangeGrey') {
        nameChangeGrey.style.opacity = '0';
        nameChangeGrey.style.pointerEvents = 'none';
    }
};
nameChangeGrey.addEventListener('click', exitNameChange);

//IMPLEMENTS CHANGES FROM CHANGENAME() FORM
const submitNameChange = () => {
    if (playerOneNameInput.value === '' && playerTwoNameInput.value === '') {
        nameChangeGrey.style.opacity = '0';
        nameChangeGrey.style.pointerEvents = 'none';
    } else if (
        playerOneNameInput.value.length > 15 ||
        playerTwoNameInput.value.length > 15
    ) {
        nameChangeError.innerText = 'Name length cannot exceed 15 characters';
    } else {
        if (!(playerOneNameInput.value === '')) {
            playerOne.username = playerOneNameInput.value;
            playerOneTag.innerText = `${playerOne.username}:  ${playerOne.score}`;
            playerOneNameInput.value = '';
            nameChangeGrey.style.opacity = '0';
            nameChangeGrey.style.pointerEvents = 'none';
            nameChangeError.innerText = '';
        }
        if (!(playerTwoNameInput.value === '')) {
            playerTwo.username = playerTwoNameInput.value;
            playerTwoTag.innerText = `${playerTwo.username}:  ${playerTwo.score}`;
            playerTwoNameInput.value = '';
            nameChangeGrey.style.opacity = '0';
            nameChangeGrey.style.pointerEvents = 'none';
            nameChangeError.innerText = '';
        }
    }
};
submitNamesButton.addEventListener('click', submitNameChange);

const toggleTips = () => {
    if (bestOfButton.classList.contains('noTips')) {
        bestOfButton.classList.remove('noTips');
        toggleTipsButton.style.backgroundColor = 'rgba(95, 140, 255, 0.63)';
    } else {
        bestOfButton.classList.add('noTips');
        toggleTipsButton.style.backgroundColor = '#0040e2a1';
    }
};
toggleTipsButton.addEventListener('click', toggleTips);

bestOfButton.style.pointerEvents = 'none';
bestOfButton.style.backgroundColor = 'rgb(121, 121, 121)';
toggleTipsButton.style.pointerEvents = 'none';
toggleTipsButton.style.backgroundColor = 'rgb(121, 121, 121)';
