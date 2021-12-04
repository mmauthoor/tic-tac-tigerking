// Important for variables to have semantic names, code to be clear etc

// readme info - highly recommend using chrome/safari to view for animations. IE not recommended. 
// Approach - in the wake of TK season 2, thought it would be fun to make a game encapsulating the chaotic energy and colourful characters. 
// acknowledge where animations and pics came from 

// Need to:
// do JE win state text
// add images to sides and popups
// style popups
// add animated border to game status
// favicon?


// Nice to haves: 
// after 1 game, would go on to TK2 - Jeff Lowe v Tim Stark
// sound effects

// DOM objects
let popupDiv = document.querySelector(".popup-div");
let player1WinPopup = document.querySelector(".player1-win-popup");
let player2WinPopup = document.querySelector(".player2-win-popup");
let tiePopup = document.querySelector(".tie-popup");

let containerDiv = document.querySelector(".container-div");
let gridCells = document.querySelectorAll(".grid-cell");
let gameStatusDiv = document.querySelector(".game-status-div");

let startBtn = document.querySelector(".start-btn");
let restartBtns = document.querySelectorAll(".restart-btn");

let player1WinCountSpan = document.querySelector(".player1-win-count-span"); 
let player2WinCountSpan = document.querySelector(".player2-win-count-span"); 


// Start game status
let currentPlayer = "Player 1";
let player1WinCounter = 0;
let player2WinCounter = 0;

function handlePlayerMove(event) {
    let chosenCell = event.target;
    let playerCellClass = "";
    if (isCellVacant(chosenCell)) {
        // could put if statements here re: tk2
        if (currentPlayer === "Player 1") {
            chosenCell.classList.add("player1-cell", "occupied");
            playerCellClass = ".player1-cell";
        } else if (currentPlayer === "Player 2") {
            chosenCell.classList.add("player2-cell", "occupied");
            playerCellClass = ".player2-cell";
        }
        if (hasPlayerMade3Moves(playerCellClass)) {
            if (isWin(playerCellClass, chosenCell)) {
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

function isCellVacant(cell) {
    return !cell.classList.contains("occupied");
}

function hasPlayerMade3Moves(playerCellClass) {
    let playerTotalCells = document.querySelectorAll(playerCellClass);
    return playerTotalCells.length >= 3;
}

function isRowOrColumnFull(chosenCell, playerTotalCells) {
    let chosenCellRow = chosenCell.dataset.row;
    let chosenCellCol = chosenCell.dataset.col;

    let playerRowCounter = 0;
    let playerColCounter = 0;

    playerTotalCells.forEach(function(cell) {
        if (cell.dataset.row === chosenCellRow) {
            playerRowCounter++;
        }
        if (cell.dataset.col === chosenCellCol) {
            playerColCounter++;
        }
    });
    if (playerRowCounter === 3) {
        playerTotalCells.forEach(function(cell) {
            if (cell.dataset.row === chosenCellRow) {
                cell.classList.add("winning-combo");
            }
        });
        return true;
    } else if (playerColCounter === 3) {
        playerTotalCells.forEach(function(cell) {
            if (cell.dataset.col === chosenCellCol) {
                cell.classList.add("winning-combo");
            }
        });
        return true;
    }
}

function isDiagonalFull(playerTotalCells) {
    let cellCoordinateArray = [];
    playerTotalCells.forEach(function(cell) {
        let cellCoordinates = cell.dataset.row + cell.dataset.col;
        cellCoordinateArray.push(cellCoordinates); 
        });
        // Ideally identifying the diagonal win state would be based on the maths patterns in the grid rather than hard-coded like this, to allow the grid to be enlarged beyond 3x3. Might refactor at a later date. 
    if (cellCoordinateArray.includes("11") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("33")) {
        playerTotalCells.forEach(function(cell) {
            if (cell.dataset.row + cell.dataset.col === "11" || cell.dataset.row + cell.dataset.col === "22" || cell.dataset.row + cell.dataset.col === "33") {
                cell.classList.add("winning-combo");
            }
        });
        return true;
    } else if (cellCoordinateArray.includes("13") && cellCoordinateArray.includes("22") && cellCoordinateArray.includes("31")) {
        playerTotalCells.forEach(function(cell) {
            if (cell.dataset.row + cell.dataset.col === "13" || cell.dataset.row + cell.dataset.col === "22" || cell.dataset.row + cell.dataset.col === "31") {
                cell.classList.add("winning-combo");
            }
        });
        return true;
    }
}

function isWin(playerCellClass, chosenCell) {
    let playerTotalCells = document.querySelectorAll(playerCellClass); 
    if (isRowOrColumnFull(chosenCell, playerTotalCells)) {
        return true;
    } else if (isDiagonalFull(playerTotalCells)) {
        return true;
    } 
}

function declareWinner(winner) {
    if (winner === ".player1-cell") {
        player1WinPopup.classList.remove("hide");
        player1WinCounter++;
        player1WinCountSpan.textContent = player1WinCounter;
    } else if (winner === ".player2-cell") {
        player2WinPopup.classList.remove("hide");
        player2WinCounter++;
        player2WinCountSpan.textContent = player1WinCounter;
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
    gridCells.forEach(cell => cell.classList.remove("player1-cell", "player2-cell", "occupied", "winning-combo"));
    player1WinPopup.classList.add("hide");
    player2WinPopup.classList.add("hide");
    tiePopup.classList.add("hide");
    currentPlayer = "Player 1";
    gameStatusDiv.textContent = "Player 1, you go first!";
}

// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerMove));
startBtn.addEventListener("click", handleStart);
restartBtns.forEach(button => button.addEventListener("click", handleRestart));

