document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  
    const checkWinner = () => {
      for (let row = 0; row < 3; row++) {
        if (
          boardState[row][0] !== "" &&
          boardState[row][0] === boardState[row][1] &&
          boardState[row][0] === boardState[row][2]
        ) {
          return true;
        }
      }
  
      for (let col = 0; col < 3; col++) {
        if (
          boardState[0][col] !== "" &&
          boardState[0][col] === boardState[1][col] &&
          boardState[0][col] === boardState[2][col]
        ) {
          return true;
        }
      }
  
      if (
        boardState[0][0] !== "" &&
        boardState[0][0] === boardState[1][1] &&
        boardState[0][0] === boardState[2][2]
      ) {
        return true;
      }
  
      if (
        boardState[0][2] !== "" &&
        boardState[0][2] === boardState[1][1] &&
        boardState[0][2] === boardState[2][0]
      ) {
        return true;
        }
        return false;
    };
  
    const cellClick = (e) => {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      if (boardState[row][col] === "") {
        boardState[row][col] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (boardState.flat().every((cell) => cell !== "")) {
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
      boardState = [
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