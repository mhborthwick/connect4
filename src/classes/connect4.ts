import { Display, Score, Player } from "../types";

export default class Connect4 {
  display: Display;
  score: Score;
  board: string[][];
  players: {
    red: Player;
    blue: Player;
  };
  currentPlayer: Player;
  waiting: boolean;
  constructor(display: Display) {
    this.display = display;
    this.board = this.createBoard();
    this.score = { red: 0, blue: 0 };
    this.players = {
      red: { token: "red", isTurn: true },
      blue: { token: "blue", isTurn: false },
    };
    this.currentPlayer = this.players.red;
    this.display.bindClickHandler(this.clickCell);
    this.display.bindHoverHandler(this.hoverCell);
    this.waiting = false;
  }

  increaseScore(currentPlayer: Player): void {
    this.score[currentPlayer.token as keyof Score] += 1;
  }

  hoverCell = (row: number, col: number, eventString: string): void => {
    // #F9A810 = orange
    // #4d4de4 = blue
    // refactor later
    if (eventString === "mouseover") {
      const currentCol = this.display.getElement(
        `[data-row="${row}"] [data-col="${col}"]`
      );
      if (row === 5 && !currentCol.innerHTML.length) {
        this.display.getElement(
          `[data-row="${row}"] [data-col="${col}"]`
        ).style.border = "2px solid #F9A810";
      } else {
        this.display.getElement(
          `[data-row="${row}"] [data-col="${col}"]`
        ).style.border = "2px solid #4d4de4";
      }
      let i = 1;
      while (row + i <= 5) {
        const colBelow = this.display.getElement(
          `[data-row="${row + i}"] [data-col="${col}"]`
        );
        const colAbove = this.display.getElement(
          `[data-row="${row + i - 1}"] [data-col="${col}"]`
        );
        if (row + i === 5 && !colBelow.innerHTML.length) {
          this.display.getElement(
            `[data-row="${row + i}"] [data-col="${col}"]`
          ).style.border = "2px solid #F9A810";
        } else if (!colBelow.innerHTML.length) {
          this.display.getElement(
            `[data-row="${row + i}"] [data-col="${col}"]`
          ).style.border = "2px solid #4d4de4";
        } else if (colBelow.innerHTML.length && !colAbove.innerHTML.length) {
          this.display.getElement(
            `[data-row="${row + i - 1}"] [data-col="${col}"]`
          ).style.border = "2px solid #F9A810";
        }
        i += 1;
      }
    } else if (eventString === "mouseout") {
      const cols = this.display.getAllElements(
        ".col"
      ) as NodeListOf<HTMLElement>;
      cols.forEach((c) => (c.style.border = "2px solid #3e3d4f"));
    }
  };

  clickCell = (row: number, col: number): void => {
    // refactor later
    const cols = this.display.getAllElements(".col") as NodeListOf<HTMLElement>;
    cols.forEach((c) => (c.style.border = "2px solid #3e3d4f"));
    const isLastRow = row === 5;
    const canContinue = this.board[row][col] === "";
    if (canContinue && !this.waiting) {
      if (isLastRow) {
        this.board[row][col] = this.currentPlayer.token;
        this.display.updateBoard(row, col, this.currentPlayer);
        this.currentPlayer.isTurn = false;
      } else {
        const isCellBelowOpen = this.board[row + 1][col] === "";
        if (!isCellBelowOpen) {
          this.board[row][col] = this.currentPlayer.token;
          this.display.updateBoard(row, col, this.currentPlayer);
          this.currentPlayer.isTurn = false;
        } else {
          // refactor later
          let i = 1;
          while (row + i <= 5) {
            if (row + i === 5 && this.board[row + i][col] === "") {
              this.board[row + i][col] = this.currentPlayer.token;
              this.display.updateBoard(row + i, col, this.currentPlayer);
              this.currentPlayer.isTurn = false;
            } else if (
              this.board[row + i][col] === "" &&
              !(this.board[row + i + 1][col] === "")
            ) {
              this.board[row + i][col] = this.currentPlayer.token;
              this.display.updateBoard(row + i, col, this.currentPlayer);
              this.currentPlayer.isTurn = false;
            } else {
              i += 1;
            }
          }
        }
      }
      const win = this.isGameWon(row, col);
      const stalemate = this.board
        .map((row) => row.filter((col) => col === ""))
        .filter((row) => row.length > 0);
      if (!this.waiting) {
        if (win) {
          this.increaseScore(this.currentPlayer);
          this.display.updateScore(this.score, this.currentPlayer);
          this.gameOver(this.currentPlayer);
        } else if (stalemate.length < 1) {
          this.gameOver();
        } else {
          if (!this.currentPlayer.isTurn) {
            this.switchPlayer();
          }
        }
      }
    }
  };

  createBoard(): string[][] {
    return [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
  }

  resetBoard(): void {
    this.display.clearMessage();
    this.display.clearGameBoard();
    this.board = this.createBoard();
  }

  resetPlayers() {
    this.currentPlayer = this.players.red;
  }

  gameOver(winner?: Player): void {
    this.waiting = true;
    this.display.printMessage(winner?.token);
    setTimeout(() => {
      this.resetBoard();
      this.resetPlayers();
      this.waiting = false;
    }, 2000);
  }

  isGameWon(row: number, col: number): boolean {
    // refactor later
    if (
      // Horizontal win
      (this.board[row][0] === this.currentPlayer.token &&
        this.board[row][1] === this.currentPlayer.token &&
        this.board[row][2] === this.currentPlayer.token &&
        this.board[row][3] === this.currentPlayer.token) ||
      (this.board[row][1] === this.currentPlayer.token &&
        this.board[row][2] === this.currentPlayer.token &&
        this.board[row][3] === this.currentPlayer.token &&
        this.board[row][4] === this.currentPlayer.token) ||
      (this.board[row][2] === this.currentPlayer.token &&
        this.board[row][3] === this.currentPlayer.token &&
        this.board[row][4] === this.currentPlayer.token &&
        this.board[row][5] === this.currentPlayer.token) ||
      (this.board[row][3] === this.currentPlayer.token &&
        this.board[row][4] === this.currentPlayer.token &&
        this.board[row][5] === this.currentPlayer.token &&
        this.board[row][6] === this.currentPlayer.token) ||
      // Vertical win
      (this.board[0][col] === this.currentPlayer.token &&
        this.board[1][col] === this.currentPlayer.token &&
        this.board[2][col] === this.currentPlayer.token &&
        this.board[3][col] === this.currentPlayer.token) ||
      (this.board[1][col] === this.currentPlayer.token &&
        this.board[2][col] === this.currentPlayer.token &&
        this.board[3][col] === this.currentPlayer.token &&
        this.board[4][col] === this.currentPlayer.token) ||
      (this.board[2][col] === this.currentPlayer.token &&
        this.board[3][col] === this.currentPlayer.token &&
        this.board[4][col] === this.currentPlayer.token &&
        this.board[5][col] === this.currentPlayer.token) ||
      // Left Diagonal win
      (this.board[2][0] === this.currentPlayer.token &&
        this.board[3][1] === this.currentPlayer.token &&
        this.board[4][2] === this.currentPlayer.token &&
        this.board[5][3] === this.currentPlayer.token) ||
      (this.board[1][0] === this.currentPlayer.token &&
        this.board[2][1] === this.currentPlayer.token &&
        this.board[3][2] === this.currentPlayer.token &&
        this.board[4][3] === this.currentPlayer.token) ||
      (this.board[2][1] === this.currentPlayer.token &&
        this.board[3][2] === this.currentPlayer.token &&
        this.board[4][3] === this.currentPlayer.token &&
        this.board[5][4] === this.currentPlayer.token) ||
      (this.board[0][0] === this.currentPlayer.token &&
        this.board[1][1] === this.currentPlayer.token &&
        this.board[2][2] === this.currentPlayer.token &&
        this.board[3][3] === this.currentPlayer.token) ||
      (this.board[1][1] === this.currentPlayer.token &&
        this.board[2][2] === this.currentPlayer.token &&
        this.board[3][3] === this.currentPlayer.token &&
        this.board[4][4] === this.currentPlayer.token) ||
      (this.board[2][2] === this.currentPlayer.token &&
        this.board[3][3] === this.currentPlayer.token &&
        this.board[4][4] === this.currentPlayer.token &&
        this.board[5][5] === this.currentPlayer.token) ||
      (this.board[0][1] === this.currentPlayer.token &&
        this.board[1][2] === this.currentPlayer.token &&
        this.board[2][3] === this.currentPlayer.token &&
        this.board[3][4] === this.currentPlayer.token) ||
      (this.board[1][2] === this.currentPlayer.token &&
        this.board[2][3] === this.currentPlayer.token &&
        this.board[3][4] === this.currentPlayer.token &&
        this.board[4][5] === this.currentPlayer.token) ||
      (this.board[2][3] === this.currentPlayer.token &&
        this.board[3][4] === this.currentPlayer.token &&
        this.board[4][5] === this.currentPlayer.token &&
        this.board[5][6] === this.currentPlayer.token) ||
      (this.board[0][2] === this.currentPlayer.token &&
        this.board[1][3] === this.currentPlayer.token &&
        this.board[2][4] === this.currentPlayer.token &&
        this.board[3][5] === this.currentPlayer.token) ||
      (this.board[1][3] === this.currentPlayer.token &&
        this.board[2][4] === this.currentPlayer.token &&
        this.board[3][5] === this.currentPlayer.token &&
        this.board[4][6] === this.currentPlayer.token) ||
      (this.board[0][3] === this.currentPlayer.token &&
        this.board[1][4] === this.currentPlayer.token &&
        this.board[2][5] === this.currentPlayer.token &&
        this.board[3][6] === this.currentPlayer.token) ||
      // Right Diagonal win
      (this.board[5][3] === this.currentPlayer.token &&
        this.board[4][4] === this.currentPlayer.token &&
        this.board[3][5] === this.currentPlayer.token &&
        this.board[2][6] === this.currentPlayer.token) ||
      (this.board[5][2] === this.currentPlayer.token &&
        this.board[4][3] === this.currentPlayer.token &&
        this.board[3][4] === this.currentPlayer.token &&
        this.board[2][5] === this.currentPlayer.token) ||
      (this.board[4][3] === this.currentPlayer.token &&
        this.board[3][4] === this.currentPlayer.token &&
        this.board[2][5] === this.currentPlayer.token &&
        this.board[1][6] === this.currentPlayer.token) ||
      (this.board[5][1] === this.currentPlayer.token &&
        this.board[4][2] === this.currentPlayer.token &&
        this.board[3][3] === this.currentPlayer.token &&
        this.board[2][4] === this.currentPlayer.token) ||
      (this.board[4][2] === this.currentPlayer.token &&
        this.board[3][3] === this.currentPlayer.token &&
        this.board[2][4] === this.currentPlayer.token &&
        this.board[1][5] === this.currentPlayer.token) ||
      (this.board[3][3] === this.currentPlayer.token &&
        this.board[2][4] === this.currentPlayer.token &&
        this.board[1][5] === this.currentPlayer.token &&
        this.board[0][6] === this.currentPlayer.token) ||
      (this.board[5][0] === this.currentPlayer.token &&
        this.board[4][1] === this.currentPlayer.token &&
        this.board[3][2] === this.currentPlayer.token &&
        this.board[2][3] === this.currentPlayer.token) ||
      (this.board[4][1] === this.currentPlayer.token &&
        this.board[3][2] === this.currentPlayer.token &&
        this.board[2][3] === this.currentPlayer.token &&
        this.board[1][4] === this.currentPlayer.token) ||
      (this.board[3][2] === this.currentPlayer.token &&
        this.board[2][3] === this.currentPlayer.token &&
        this.board[1][4] === this.currentPlayer.token &&
        this.board[0][5] === this.currentPlayer.token) ||
      (this.board[4][0] === this.currentPlayer.token &&
        this.board[3][1] === this.currentPlayer.token &&
        this.board[2][2] === this.currentPlayer.token &&
        this.board[1][3] === this.currentPlayer.token) ||
      (this.board[3][1] === this.currentPlayer.token &&
        this.board[2][2] === this.currentPlayer.token &&
        this.board[1][3] === this.currentPlayer.token &&
        this.board[0][4] === this.currentPlayer.token) ||
      (this.board[3][0] === this.currentPlayer.token &&
        this.board[2][1] === this.currentPlayer.token &&
        this.board[1][2] === this.currentPlayer.token &&
        this.board[0][3] === this.currentPlayer.token)
    )
      return true;
    return false;
  }

  switchPlayer(): void {
    this.currentPlayer =
      this.currentPlayer === this.players.red
        ? this.players.blue
        : this.players.red;
    this.currentPlayer.isTurn = true;
  }

  startGame(): void {
    this.display.printScoreBoard(this.score);
    this.display.printGameBoard(this.board);
  }
}
