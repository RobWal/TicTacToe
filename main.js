//DECLARING GLOBAL VARIABLES
let currentPlayer = 'playerOne';
let totalClicks = 0;
let totalSquares = 0;
let wasGameWon = false;
let playerOne = {
    id: 'First-Player',
    color: 'red',
    score: 0,
};
let playerTwo = {
    id: 'Second-Player',
    color: 'blue',
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
    value.addEventListener('click', myScript);
}

//ALTERS CLICKED SQUARE, CHECKS FOR A WIN
function myScript(event) {
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
            if (rowOrColumn === 1) {
                messageBox.innerText = `${event.target.classList[4]} won with three in the same row!`;
                scoreAdder(event);
            } else {
                messageBox.innerText = `${event.target.classList[4]} won with three in the same column!`;
                scoreAdder(event);
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
        value.style.backgroundColor = 'lightblue';
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
    let element = document.createElement('p');
    element.innerHTML =
        '<div><label for="playerOne">Player One</label><input type="text" id="playerOneNameInput"></div><div><label for="playerTwo">Player Two</label><input type="text" id="playerTwoNameInput"></div><button id="submitNameChanges" onclick="submitNameChange(playerOneNameInput.value, playerTwoNameInput.value)">Submit Name Changes </button>';
    element.setAttribute('id', 'nameForm');
    element.classList.add('nameForm');
    body.appendChild(element);
}

/*
    THIS NEEDS WORK, WILL LIKELY IMPLEMENT PERMANENT ELEMENT THAT SITS BEHIND GAME SO THAT VARIABLES ARE EASILY PASSED
*/

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
// function checkDiagonals(event) {
//     if (event.target.id === '1,1') {
//         if (
//             square33.classList[4] === event.target.classList[4] &&
//             square22.classList[4] === event.target.classList[4]
//         ) {
//             setTimeout(function () {
//                 alert(`${event.target.classList[4]} won diagonally!`);
//             }, 30);
//             stopClicking();
//         }
//     } else if (event.target.id === '3,1') {
//         if (
//             square13.classList[4] === event.target.classList[4] &&
//             square22.classList[4] === event.target.classList[4]
//         ) {
//             setTimeout(function () {
//                 alert(`${event.target.classList[4]} won diagonally!`);
//             }, 30);
//             stopClicking();
//         }
//     } else if (event.target.id === '1,3') {
//         if (
//             square31.classList[4] === event.target.classList[4] &&
//             square22.classList[4] === event.target.classList[4]
//         ) {
//             setTimeout(function () {
//                 alert(`${event.target.classList[4]} won diagonally!`);
//             }, 30);
//             stopClicking();
//         }
//     } else if (event.target.id === '3,3') {
//         if (
//             square11.classList[4] === event.target.classList[4] &&
//             square22.classList[4] === event.target.classList[4]
//         ) {
//             setTimeout(function () {
//                 alert(`${event.target.classList[4]} won diagonally!`);
//             }, 30);
//             stopClicking();
//         }
//     } else if (event.target.id === '2,2') {
//         if (
//             square11.classList[4] === event.target.classList[4] &&
//             square22.classList[4] === event.target.classList[4]
//         ) {
//             //NEEDS TO BE UPDATED WITH ALL FOUR CORNERS
//             setTimeout(function () {
//                 alert(`${event.target.classList[4]} won diagonally!`);
//             }, 30);
//             stopClicking();
//         }
//     }
// }
