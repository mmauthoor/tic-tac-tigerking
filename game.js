// Need ability to distinguish between 2 players on same computer - needs automatically place the correct image 

// Questions: 
// How will computer recognise when a win state has been achieved - i.e. that all noughts are in correct formation, or all crosses? 
// What is best way to store data (i.e. player turns)?
// Two nested arrays = one for column, one for rows. 


// Need ability for computer to tell when a win state has been reached, i.e. all of one type (image, etc.) in a row/column/diagonal, OR the grid is full. 
// Need win state and lose state
// Need restart ability

// Important for variables to have semantic names, code to be clear etc


// Nice to haves: 
// after 1 game, would go on to TK2 - Jeff Lowe v Tim Stark
// start-up screen: Welcome to the jungle: Tic Tac Tiger King. Click to start
// Then show the grid and diff sides
// sound effects
// 


// DOM objects
let gridCells = document.querySelectorAll(".grid-cell");


// Functions that I'll need
// toggle between players - DONE
// Check if token already present in cell - DONE
// Check if there are 3 or more of a player's tokens on the board - DONE
// if so, are they in a single row/column/diagonal? 
// Check if all the cells on the board are filled - DONE




// Start game player status
console.log("Player 1, it's your turn!");
let currentPlayer = "Player 1";
// let player1 = true;
// let player2 = false;


function handlePlayerChoice(event) {
    let playerCellChoice = event.target;
    let playerCells = "";
    if (isCellVacant(playerCellChoice)) {
        if (currentPlayer === "Player 1") {
            playerCellChoice.classList.add("joe-cell", "occupied");
            playerCells = ".joe-cell";
        } else if (currentPlayer === "Player 2") {
            playerCellChoice.classList.add("carole-cell", "occupied");
            playerCells = ".carole-cell";
        }
        if (checkPlayerCellNumber(playerCells)) {
            isPlayerComboWinning(playerCellChoice);
            // want to check if the current cell shares the same row/column as others of its type
        }

        togglePlayers();
    } else {
        console.log("There's a tiger in this cage already! Choose a different one!");
    }
}


function togglePlayers() {
    if (currentPlayer === "Player 1") {
        currentPlayer = "Player 2";
        console.log("Player 2, it's your turn!");
    } else if (currentPlayer === "Player 2") {
        currentPlayer = "Player 1";
        console.log("Player 1, it's your turn!");
    }
}

function isCellVacant(cell) {
    if (cell.classList.contains("occupied")) {
        return false;
    } else {
        return true;
    }
}

function checkPlayerCellNumber(playerCells) {
    let playerTotalCells = document.querySelectorAll(playerCells);
    if (playerTotalCells.length >= 3) {
        return true;
    } else {
        return false;
    }
}

function isPlayerComboWinning(playerCellChoice) {
    let playerCellRow = playerCellChoice.dataset.row;
    let playerCellCol = playerCellChoice.dataset.col;

    if (playerCellChoice.classList.contains("joe-cell")) {
        let joeCells = document.querySelectorAll(".joe-cell");
        let joeRowCounter = 0;
        let joeColCounter = 0;
        
        for (let i = 0; i < joeCells.length; i++) {
            if (joeCells[i].dataset.row === playerCellRow) {
                joeRowCounter++;
                console.log(joeRowCounter)
            } else if (joeCells[i].dataset.col === playerCellCol) {
                joeColCounter++;
                console.log(joeColCounter)
            }
        }
        if (joeRowCounter === 3 || joeColCounter === 3) {
            joeWinState();
        } else {
            for (let i = 0; i < joeCells.length; i++) {
                let cellCoordinates = joeCells[i].dataset.row + joeCells[i].dataset.col; 
                console.log(cellCoordinates);
            }
            // hard code if  cells are all in diagonal position. i.e. if in 11, 22, 33 OR 13, 22, 31

        }
    } else {
        let caroleCells = document.querySelectorAll(".carole-cell");
        let caroleCellCounter = 0;
        // need to update with row and col counters

        for (let i = 0; i < caroleCells.length; i++) {
            if (caroleCells[i].dataset.row === playerCellRow || caroleCells[i].dataset.col === playerCellCol) {
                caroleCellCounter++;
                console.log(caroleCellCounter);
            } 
        }
        if (caroleCellCounter === 3) {
            caroleWinState();
        } 
    }
}

function joeWinState() {
    console.log("joe wins!!");
    // Special joe message here
}

function caroleWinState() {
    console.log("carole wins!!");
    // Great job, you cool cats and kittens! vs I'm never going to financially recover from this
}



function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    console.log(occupiedCells);
    if (occupiedCells.length === gridCells.length) {
        console.log("No winner");
    }
}

function handleRestart() {
    gridCells.forEach(cell => cell.classList.remove("joe-cell", "carole-cell", "occupied"));
}


// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerChoice));
// Need a handler to click on restart button, start button

