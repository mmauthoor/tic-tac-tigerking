// Need ability to distinguish between 2 players on same computer - needs automatically place the correct image 

// Need ability for users to specify where they want to place their move - i.e. through click or other input - and add image/change state - so will need to store the clicked area through data set. 
// Questions: 
// How will computer recognise when a win state has been achieved - i.e. that all noughts are in correct formation, or all crosses? 
// What is best way to store data (i.e. player turns)?
// Two nested arrays = one for column, one for rows. 


// Need ability for computer to tell when a win state has been reached, i.e. all of one type (image, etc.) in a row/column/diagonal, OR the grid is full. 
// Need win state and lose state
// Need restart ability


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
// Check if all the cells on the board are filled




// Start game player status
console.log("Player 1, it's your turn!");
let currentPlayer = "Player 1";
// let player1 = true;
// let player2 = false;


function handlePlayerChoice(event) {
    let playerCellChoice = event.target;
    if (isCellVacant(playerCellChoice)) {
        if (currentPlayer === "Player 1") {
            playerCellChoice.classList.add("joe-token", "occupied");
        } else if (currentPlayer === "Player 2") {
            playerCellChoice.classList.add("carole-token", "occupied");
        }
        if (checkPlayerTokenNumber()) {
            // pass playercellchoice into next function
        }

        togglePlayers();
    } else {
        console.log("There's a tiger in this cage already! Choose a different one!");
    }
}


// function handlePlayerChoice(event) {
//     let playerChoice = event.target;
//     if (checkIfCellVacant(playerChoice)) {
//         if (player1) {
//             playerChoice.classList.add("joe-token");
//         } else if (player2) {
//             playerChoice.classList.add("carole-token");
//         }
//         togglePlayers();
//     } else {
//         console.log("There's a tiger in this cage already! Choose a different one!");
//     }
// }

// function togglePlayers() {
//     if (player1) {
//         player1 = false;
//         player2 = true;
//         console.log("Player 2, it's your turn!");
//     } else if (player2) {
//         player2 = false;
//         player1 = true;
//         console.log("Player 1, it's your turn!");
//     }
// }

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
    if (cell.classList.contains("joe-token") || cell.classList.contains("carole-token")) {
        return false;
    } else {
        return true;
    }
}

function checkPlayerTokenNumber() {
    if (currentPlayer === "Player 1") {
        let joeTokens = document.querySelectorAll(".joe-token");
        if (joeTokens.length >= 3) {
            return true;
        } else {
            return false;
        }
    } else {
        let caroleTokens = document.querySelectorAll(".carole-token");
        if (caroleTokens.length >= 3) {
            return true;
        } else {
            return false;
        }
    }
}

function isPlayerComboWinning() {

}


function isBoardFull() {
    let occupiedCells = document.querySelectorAll(".occupied");
    console.log(occupiedCells);
    if (occupiedCells.length === gridCells.length) {
        console.log("game over");
    }
}


// Event handlers
gridCells.forEach(cell => cell.addEventListener("click", handlePlayerChoice));
// Need a handler to click on restart button, start button

