//DECLARING GLOBAL VARIABLES
let currentPlayer = 'playerOne';
let totalClicks = 0;
let totalSquares = 0;
let playerOne = {
    id: 'One',
    color: 'red',
    score: 0,
};

let playerTwo = {
    id: 'Two',
    color: 'blue',
    score: 0,
};

//LINKING JS TO HTML
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
const restartButton = document.getElementById('restartGame');

//ADDING EVENT LISTENERS
for (let value of square) {
    totalSquares++;
    value.addEventListener('click', myScript);
}

restartButton.addEventListener('click', restartGame);

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
        //GAME CANNOT BE WON BEFORE 5TH MOVE
        if (!(totalClicks < 4)) {
            checkRowsAndColumns(event);
            checkDiagonals(event);
        }
        if (currentPlayer === 'playerOne') {
            currentPlayer = 'playerTwo';
        } else {
            currentPlayer = 'playerOne';
        }
        totalClicks++;
        if (totalClicks === 9) {
            setTimeout(function () {
                alert("It's a draw!");
            }, 30);
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
                setTimeout(function () {
                    alert(
                        `${event.target.classList[4]} won with three in the same row!`
                    );
                }, 30);
            } else {
                setTimeout(function () {
                    alert(
                        `${event.target.classList[4]} won with three in the same column!`
                    );
                }, 30);
            }
            stopClicking();
        }
        rowOrColumn++;
    }
}

function checkDiagonals(event) {
    if (event.target.id === '1,1') {
        if (
            square33.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]
        ) {
            setTimeout(function () {
                alert(`${event.target.classList[4]} won diagonally!`);
            }, 30);
            stopClicking();
        }
    } else if (event.target.id === '3,1') {
        if (
            square13.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]
        ) {
            setTimeout(function () {
                alert(`${event.target.classList[4]} won diagonally!`);
            }, 30);
            stopClicking();
        }
    } else if (event.target.id === '1,3') {
        if (
            square31.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]
        ) {
            setTimeout(function () {
                alert(`${event.target.classList[4]} won diagonally!`);
            }, 30);
            stopClicking();
        }
    } else if (event.target.id === '3,3') {
        if (
            square11.classList[4] === event.target.classList[4] &&
            square22.classList[4] === event.target.classList[4]
        ) {
            setTimeout(function () {
                alert(`${event.target.classList[4]} won diagonally!`);
            }, 30);
            stopClicking();
        }
    }
}

//ADDS 'CLICKED' CLASS TO SQUARES WITHOUT IT, ACTS AS CLICKABLE CHECKER
function stopClicking() {
    for (let value of square) {
        if (!value.classList.contains('clicked')) {
            value.classList.add('clicked');
        }
    }
}

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
}
