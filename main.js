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
const restartButton = document.getElementById('restartGame');
restartButton.addEventListener('click', restartGame);
const changeNameButton = document.getElementById('changeName');
changeNameButton.addEventListener('click', changeName);
const nameChangeGrey = document.getElementById('nameChangeGrey');
nameChangeGrey.addEventListener('click', exitNameChange);
const submitNamesButton = document.getElementById('submitNameChanges');
submitNamesButton.addEventListener('click', submitNameChange);
const moveLogButton = document.getElementById('moveLog');
moveLogButton.addEventListener('click', showMoveLog);
const moveLogPrint = document.getElementById('moveLogPrint');
playerOneNameInput = document.getElementById('playerOneNameInput');
playerTwoNameInput = document.getElementById('playerTwoNameInput');

playerOneTag.innerText = `${playerOne.id}:  ${playerOne.score}`;
playerTwoTag.innerText = `${playerTwo.id}:  ${playerTwo.score}`;

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
    let notYetClicked = !event.target.classList.contains('clicked');
    if (notYetClicked) {
        logMoveLog(event);
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
                messageBox.innerText = `${squarePlayerID} won with three in the same row!`;
            } else {
                messageBox.innerText = `${squarePlayerID} won with three in the same column!`;
            }
            stopClicking();
        }
        rowOrColumn++;
    }
}

//CHECKS FOR DIAGONAL WIN
function checkDiagonals(event) {
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
        messageBox.innerText = `${squarePlayerID} won diagonally!`;
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

//LOG MOVELOG FUNCTIONALITY
function logMoveLog(event) {
    let element = document.createElement('p');
    if (currentPlayer === 'playerOne') {
        element.innerText = `${totalClicks + 1}: ${playerOne.id} clicked cell ${
            event.target.id
        }`;
    } else {
        element.innerText = `${totalClicks + 1}: ${playerTwo.id} clicked cell ${
            event.target.id
        }`;
    }
    moveLogPrint.appendChild(element);
}

//MOVE LOG BUTTON FUNCTIONALITY
function showMoveLog() {
    moveLogPrint.classList.toggle('hidden');
    if (
        moveLogButton.style.backgroundColor === '' ||
        moveLogButton.style.backgroundColor === 'rgba(95, 140, 255, 0.63)'
    ) {
        moveLogButton.style.backgroundColor = '#0040e2a1';
    } else {
        moveLogButton.style.backgroundColor = 'rgba(95, 140, 255, 0.63)';
    }
}

//RESTART THE GAME, RESET VARIABLES
function restartGame() {
    for (let value of square) {
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
}

//FUNCTION CALLED BY 'CHANGE NAME' BUTTON, CREATES FORM TO ALTER NAMES
function changeName() {
    nameChangeGrey.style.opacity = '1';
    nameChangeGrey.style.pointerEvents = 'all';
}

function exitNameChange(event) {
    if (event.target.id === 'nameChangeGrey') {
        nameChangeGrey.style.opacity = '0';
        nameChangeGrey.style.pointerEvents = 'none';
    }
}

//IMPLEMENTS CHANGES FROM CHANGENAME() FORM
function submitNameChange() {
    if (playerOneNameInput.value === '' || playerTwoNameInput.value === '') {
        console.log('To submit, give both players a name');
    } else if (
        playerOneNameInput.value.includes(' ') ||
        playerTwoNameInput.value.includes(' ')
    ) {
        console.log('Names cannot have spaces!');
    } else {
        for (let box of square) {
            console.log('box.classlist:    ' + box.classList);
            console.log('box.classlist4:    ' + box.classList[4]);
            console.log('playerOneId:    ' + playerOne.id);
            console.log(box.classList[4] === playerOne.id);
            if (box.classList[4] === playerOne.id) {
                box.classList.remove(playerOne.id);
                box.classList.add(playerOneNameInput.value);
            } else if (box.classList[4] === playerTwo.id) {
                box.classList.remove(playerTwo.id);
                box.classList.add(playerTwoNameInput.value);
            }
            console.log(box);
        }
        playerOne.id = playerOneNameInput.value;
        playerTwo.id = playerTwoNameInput.value;
        playerOneTag.innerText = `${playerOne.id}:  ${playerOne.score}`;
        playerTwoTag.innerText = `${playerTwo.id}:  ${playerTwo.score}`;
        nameChangeGrey.style.opacity = '0';
        nameChangeGrey.style.pointerEvents = 'none';
    }
}
