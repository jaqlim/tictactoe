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
      const check = (a, b, c) => a !== "" && a === b && a === c;
    
      return (
        check(boardState[0][0], boardState[0][1], boardState[0][2]) ||
        check(boardState[1][0], boardState[1][1], boardState[1][2]) ||
        check(boardState[2][0], boardState[2][1], boardState[2][2]) ||
        
        check(boardState[0][0], boardState[1][0], boardState[2][0]) ||
        check(boardState[0][1], boardState[1][1], boardState[2][1]) ||
        check(boardState[0][2], boardState[1][2], boardState[2][2]) ||
        
        check(boardState[0][0], boardState[1][1], boardState[2][2]) ||
        check(boardState[0][2], boardState[1][1], boardState[2][0])
      );
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