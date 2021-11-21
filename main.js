//DECLARING GLOBAL VARIABLES
let currentPlayer = 'playerOne';
let totalClicks = 0;
let totalSquares = 0;
let wasGameWon = false;
let playerOne = {
    id: 'First-Player',
    color: 'rgb(179, 255, 153)',
    score: 0,
};
let playerTwo = {
    id: 'Second-Player',
    color: 'rgb(255, 221, 153)',
    score: 0,
};

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
const restartButton = document.getElementById('restartGame');
restartButton.addEventListener('click', restartGame);
const changeNameButton = document.getElementById('changeName');
changeNameButton.addEventListener('click', changeName);
const nameChangeGrey = document.getElementById('nameChangeGrey');
nameChangeGrey.addEventListener('click', exitNameChange);

playerOneTag.innerText =
    playerTwo.innerText = `${playerOne.id}:  ${playerOne.score}`;
playerTwoTag.innerText =
    playerTwo.innerText = `${playerTwo.id}:  ${playerTwo.score}`;

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

//ADDING EVENT LISTENERS TO SQUARES/BUTTONS
for (let value of square) {
    totalSquares++;
    value.addEventListener('click', playerChooses);
}

//ALTERS CLICKED SQUARE, CHECKS FOR A WIN
function playerChooses(event) {
    if (!event.target.classList.contains('clicked')) {
        event.target.classList.add('clicked');
        if (`${currentPlayer}` === 'playerOne') {
            event.target.style.backgroundColor = `${playerOne.color}`;
            event.target.classList.add(`${playerOne.id}`);
        } else {
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
}

//CHECK FOR A WIN IN SAME ROW/COLUMN
//rowOrColumn = 1 TARGETS ROWS, =2 TARGETS COLUMNS
function checkRowsAndColumns(event) {
    let rowOrColumn = 1;
    while (rowOrColumn < 3) {
        let winCheck = 0;
        for (let value of square) {
            if (
                value.classList.contains(event.target.classList[rowOrColumn]) &&
                value.classList.contains(event.target.classList[4])
            ) {
                winCheck++;
            }
        }
        if (winCheck === 3) {
            scoreAdder(event);
            if (rowOrColumn === 1) {
                messageBox.innerText = `${event.target.classList[4]} won with three in the same row!`;
            } else {
                messageBox.innerText = `${event.target.classList[4]} won with three in the same column!`;
            }
            stopClicking();
        }
        rowOrColumn++;
    }
}

//CHECKS FOR DIAGONAL WIN
function checkDiagonals(event) {
    if (
        (event.target.id === '1,1' &&
            square33.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]) ||
        (event.target.id === '3,1' &&
            square13.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]) ||
        (event.target.id === '1,3' &&
            square31.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]) ||
        (event.target.id === '3,3' &&
            square11.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]) ||
        (event.target.id === '2,2' &&
            square11.classList[4] === event.target.classList[4] &&
            square33.classList[4] === event.target.classList[4]) ||
        (event.target.id === '2,2' &&
            square31.classList[4] === event.target.classList[4] &&
            square13.classList[4] === event.target.classList[4])
    ) {
        messageBox.innerText = `${event.target.classList[4]} won diagonally!`;
        scoreAdder(event);
        stopClicking();
    }
}

//ADDS 'CLICKED' CLASS TO SQUARES WITHOUT IT, ACTS AS CLICKABLE STOPPER
function stopClicking() {
    for (let value of square) {
        if (!value.classList.contains('clicked')) {
            value.classList.add('clicked');
        }
    }
    wasGameWon = true;
}

function scoreAdder(event) {
    if (playerOne.id === event.target.classList[4]) {
        playerOne.score++;
        playerOneTag.innerText = `${playerOne.id}:  ${playerOne.score}`;
    } else {
        playerTwo.score++;
        playerTwoTag.innerText = `${playerTwo.id}:  ${playerTwo.score}`;
    }
}

//RESTART THE GAME, RESET VARIABLES
function restartGame() {
    for (let value of square) {
        value.style.backgroundColor = 'white';
        for (let value of square) {
            value.classList.remove('clicked');
            value.classList.remove(`${playerOne.id}`);
            value.classList.remove(`${playerTwo.id}`);
        }
    }
    totalClicks = 0;
    currentPlayer = 'playerOne';
    underlineCurrent();
    wasGameWon = false;
}

//FUNCTION CALLED BY 'CHANGE NAME' BUTTON, CREATES FORM TO ALTER NAMES
function changeName() {
    console.log('adasdasd');
    nameChangeGrey.style.visibility = 'visible';
}

function exitNameChange(event) {
    console.log(event);
    nameChangeGrey.style.visibility = 'hidden';
    event.stopPropagation();
}

//IMPLEMENTS CHANGES FROM CHANGENAME() FORM
function submitNameChange(firstName, secondName) {
    if (
        playerOneNameInput.contains(' ') ||
        playerTwoNameInput.contains(' ') ||
        playerOneNameInput === 'playerOne' ||
        playerTwoNameInput === 'playerTwo'
    ) {
        alert('Ivalid input');
    }
    playerOne.id = firstName;
    playerTwo.id = secondName;
    playerOneTag.innerText =
        playerTwo.innerText = `${playerOne.id}:  ${playerOne.score}`;
    playerTwoTag.innerText =
        playerTwo.innerText = `${playerTwo.id}:  ${playerTwo.score}`;
    document.getElementById('nameForm').remove();
}
