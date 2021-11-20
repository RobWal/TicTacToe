let currentPlayer = 'playerOne';
let totalClicks = 0;
let totalSquares = 0;
let playerOne = {
    id: 'one',
    color: 'red',
    score: 0,
};

let playerTwo = {
    id: 'two',
    color: 'blue',
    score: 0,
};

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
for (let value of square) {
    totalSquares++;
    value.addEventListener('click', myScript);
}

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
        checkForWinner(event);
        if (currentPlayer === 'playerOne') {
            currentPlayer = 'playerTwo';
        } else {
            currentPlayer = 'playerOne';
        }
        totalClicks++;
    }
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    for (let value of square) {
        value.style.backgroundColor = 'lightblue';
        for (let value of square) {
            value.classList.remove('clicked');
            value.classList.remove(`${playerOne.id}`);
            value.classList.remove(`${playerTwo.id}`);
        }
    }
}

function checkForWinner(event) {
    //CHECKING FOR COLUMN 1
    // console.log(`${whoIsPlaying}`);
    // console.log(event.target.classList);
    // console.log(event.target.classList[2]);
    let checkWinner = 0;
    for (let value of square) {
        // console.log('.');
        // console.log(value);
        // console.log(event.target.classList[4]);
        console.log(
            `${value.classList.contains(`${event.target.classList[1]}`)}`
        );
        console.log(`${value.classList.contains(event.target.classList[4])}`);
        if (
            value.classList.contains(`${event.target.classList[1]}`) &&
            value.classList.contains(event.target.classList[4])
        ) {
            console.log(checkWinner);
            checkWinner++;
        }
        if (checkWinner === 2) {
            console.log(`${event.target.classList[4]} won!!!`);
        }
    }
    // {
    //     if (square11.style.backgroundColor === `${playerOne.color}`) {
    //         setTimeout(function () {
    //             alert(`${playerOne.id} player wins!!`);
    //         }, 3);
    //     } else if (square11.style.backgroundColor === `${playerTwo.color}`) {
    //         setTimeout(function () {
    //             alert(`${playerTwo.id} player wins!!`);
    //         }, 3);
    //         //do nothing
    //     }
    // }
}
