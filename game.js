// Important for variables to have semantic names, code to be clear etc

// Need to:
// refactor to clean up code
// choose better variable names
// add images to sides and popups
// choose fonts
// style popups
// work out how to stop images being clickable when game over
// slow down transition between states
// add animated border to game status


// Nice to haves: 
// after 1 game, would go on to TK2 - Jeff Lowe v Tim Stark
// sound effects
// jiggly popup boxes

// DOM objects
let popupDiv = document.querySelector(".popup-div");
let joeWinPopup = document.querySelector(".joe-win-popup");
let caroleWinPopup = document.querySelector(".carole-win-popup");
let tiePopup = document.querySelector(".tie-popup");

let containerDiv = document.querySelector(".container-div");
let gridCells = document.querySelectorAll(".grid-cell");
let gameStatusDiv = document.querySelector(".game-status-div");

let startBtn = document.querySelector(".start-btn");
let restartBtns = document.querySelectorAll(".restart-btn");

// Start game player status
let currentPlayer = "Player 1";

function handlePlayerChoice(event) {
    let playerCellChoice = event.target;
    let playerCellClass = "";
    if (isCellVacant(playerCellChoice)) {
        
        if (currentPlayer === "Player 1") {
            playerCellChoice.classList.add("joe-cell", "occupied");
            playerCellClass = ".joe-cell";
        } else if (currentPlayer === "Player 2") {
            playerCellChoice.classList.add("carole-cell", "occupied");
            playerCellClass = ".carole-cell";
        }
        if (checkPlayerCellNumber(playerCellClass)) {
            if (hasPlayerWon(playerCellClass, playerCellChoice)) {
                declareWinner(playerCellClass);
            } else if (isBoardFull()) {
                isTie();
            } else {
                togglePlayers();
            }
        } else {
            togglePlayers();
        }
    } else {
        gameStatusDiv.textContent = `There's a tiger in this cage already! Choose a different one, ${currentPlayer}!`;
        }
}

function togglePlayers() {
    if (currentPlayer === "Player 1") {
        currentPlayer = "Player 2";
        gameStatusDiv.textContent = "Player 2, it's your turn!";
    } else if (currentPlayer === "Player 2") {
        currentPlayer = "Player 1";
        gameStatusDiv.textContent = "Player 1, it's your turn!";
    }
}

// function isCellVacant(cell) {
//     if (cell.classList.contains("occupied")) {
//         return false;
//     } else {
//         return true;
//     }
// }

function isCellVacant(cell) {
    return !cell.classList.contains("occupied");
}

function checkPlayerCellNumber(playerCells) {
    let playerTotalCells = document.querySelectorAll(playerCells);
    return playerTotalCells.length >= 3;
}

function checkRowColWins(playerCellChoice, playerTotalCells) {
    let playerCellChoiceRow = playerCellChoice.dataset.row;
    let playerCellChoiceCol = playerCellChoice.dataset.col;

    let playerRowCounter = 0;
    let playerColCounter = 0;

    playerTotalCells.forEach(function(cell) {
        if (cell.dataset.row === playerCellChoiceRow) {
            playerRowCounter++;
        }
        if (cell.dataset.col === playerCellChoiceCol) {
            playerColCounter++;
        }
    });
    if (playerRowCounter === 3 || playerColCounter === 3) {
        return true;
    }
}

function checkDiagonalWins(playerTotalCells) {
    let cellCoordinateArray = [];
    for (let i = 0; i < playerTotalCells.length; i++) {
        let currentCell = playerTotalCells[i];
        let cellCoordinates = currentCell.dataset.row + currentCell.dataset.col;
        cellCoordinateArray.push(cellCoordinates); 
        }
        if (cellCoordinateArray.includes("11") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("33") || cellCoordinateArray.includes("13") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("31")) {
            return true;
        }
}

function hasPlayerWon(playerCellClass, playerCellChoice) {
    let playerTotalCells = document.querySelectorAll(playerCellClass); 
    if (checkRowColWins(playerCellChoice, playerTotalCells)) {
        return true;
    } else if (checkDiagonalWins(playerTotalCells)) {
        return true;
    } 
}

function declareWinner(winner) {
    if (winner === ".joe-cell") {
        joeWinPopup.classList.remove("hide");
    } else if (winner === ".carole-cell") {
        caroleWinPopup.classList.remove("hide");
    }   
}

function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    return occupiedCells.length === gridCells.length;
}

function isTie() {
    tiePopup.classList.remove("hide");
}

function handleStart() {
    containerDiv.classList.toggle("hide");
    popupDiv.classList.toggle("hide");
}

function handleRestart() {
    gridCells.forEach(cell => cell.classList.remove("joe-cell", "carole-cell", "occupied"));
    joeWinPopup.classList.add("hide");
    caroleWinPopup.classList.add("hide");
    tiePopup.classList.add("hide");
    currentPlayer = "Player 1";
    gameStatusDiv.textContent = "Player 1, it's your turn!";

    // also add clickability back
}

// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerChoice));
startBtn.addEventListener("click", handleStart);
restartBtns.forEach(button => button.addEventListener("click", handleRestart));

