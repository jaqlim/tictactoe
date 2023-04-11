document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  
    const checkWinner = () => {
      for (let row = 0; row < 3; row++) {
        if (
          gameState[row][0] !== "" &&
          gameState[row][0] === gameState[row][1] &&
          gameState[row][0] === gameState[row][2]
        ) {
          return true;
        }
      }
  
      for (let col = 0; col < 3; col++) {
        if (
          gameState[0][col] !== "" &&
          gameState[0][col] === gameState[1][col] &&
          gameState[0][col] === gameState[2][col]
        ) {
          return true;
        }
      }
  
      if (
        gameState[0][0] !== "" &&
        gameState[0][0] === gameState[1][1] &&
        gameState[0][0] === gameState[2][2]
      ) {
        return true;
      }
  
      if (
        gameState[0][2] !== "" &&
        gameState[0][2] === gameState[1][1] &&
        gameState[0][2] === gameState[2][0]
      ) {
        return true;
        }
        return false;
    };
  
    const cellClick = (e) => {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      if (gameState[row][col] === "") {
        gameState[row][col] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (gameState.flat().every((cell) => cell !== "")) {
              alert("It's a draw!");
              resetGame();
            }
          }
        }
      }
  
    const createCell = (row, col) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", cellClick);
      return cell;
    };
  
    const createBoard = () => {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          gameBoard.appendChild(createCell(row, col));
        }
      }
    };
  
    const resetGame = () => {
      gameState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      currentPlayer = "X";
      Array.from(gameBoard.children).forEach((cell) => {
        cell.textContent = "";
      });
    };
  
    createBoard();
  
    resetButton.addEventListener("click", () => {
      resetGame();
    });
});