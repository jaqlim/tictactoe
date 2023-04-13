document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let currentMoveIndex = 0;
    let moveHistory = [];
    let gameOver = false;
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
      if (gameOver) {
        return;
      }
    
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
    
      if (boardState[row][col] === "") {
        boardState[row][col] = currentPlayer;
        e.target.textContent = currentPlayer;
    
        saveMove(currentPlayer, row, col);
    
        if (checkWinner()) {
          showToast(`${currentPlayer} wins!`);
          gameOver = true;
          previousButton.disabled = false;
          nextButton.disabled = currentMoveIndex === 0;
          return;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          if (boardState.flat().every((cell) => cell !== "")) {
            showToast("It's a draw!");
            gameOver = true;
            previousButton.disabled = false;
            nextButton.disabled = currentMoveIndex === 0;
            return;
          }
        }
      }
    };
    
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

    const updateBoard = (moveIndex) => {
      resetGame();
      for (let i = 0; i <= moveIndex; i++) {
        const move = moveHistory[i];
        boardState[move.row][move.col] = move.player;
        const cell = gameBoard.querySelector(
          `[data-row="${move.row}"][data-col="${move.col}"]`
        );
        cell.textContent = move.player;
      }
      currentMoveIndex = moveIndex;
    };
    

    const saveMove = (player, row, col) => {
      moveHistory.push({ player, row, col });
    };
    
    const showToast = (message) => {
      const toast = document.createElement("div");
      toast.classList.add("toast");
      toast.textContent = message;
    
      document.body.appendChild(toast);
    
      setTimeout(() => {
        toast.classList.add("fadeOut");
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 3000);
    };    
  
    const resetGame = () => {
      boardState = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      currentPlayer = "X";
      moveHistory = [];
      currentMoveIndex = 0;
      previousButton.disabled = true;
      nextButton.disabled = true;
      gameOver = false;
      Array.from(gameBoard.children).forEach((cell) => {
        cell.textContent = "";
      });
    };
    
    

    const onPreviousClick = () => {
      const newIndex = currentMoveIndex - 1;
      if (newIndex >= 0) {
        updateBoard(newIndex);
        currentPlayer = moveHistory[newIndex].player === "X" ? "O" : "X";
      }
    };
    
    
    const onNextClick = () => {
      const newIndex = currentMoveIndex + 1;
      if (newIndex < moveHistory.length) {
        updateBoard(newIndex);
      }
    };

    previousButton.addEventListener("click", () => {
      onPreviousClick();
      previousButton.disabled = currentMoveIndex === 0;
      nextButton.disabled = false;
    });
    
    nextButton.addEventListener("click", () => {
      onNextClick();
      previousButton.disabled = false;
      nextButton.disabled = currentMoveIndex === moveHistory.length - 1;
    });
    
    
  
    createBoard();
  
    resetButton.addEventListener("click", () => {
      resetGame();
    });
});