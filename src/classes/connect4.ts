import { Display } from "../types";

export default class Connect4 {
  display: Display;
  score: { red: number; blue: number };
  board: string[][];
  players: { red: string; blue: string };
  currentPlayer: string;
  constructor(display: Display) {
    this.display = display;
    this.board = this.createBoard();
    this.score = { red: 0, blue: 0 };
    this.players = { red: "red", blue: "blue" };
    this.currentPlayer = this.players.red;
    this.display.bindHandler(this.clickCell);
  }

  clickCell = (row: number, col: number): void => {
    const isLastRow = row === 5;
    const canContinue = this.board[row][col] === "";
    if (canContinue) {
      if (isLastRow) {
        this.board[row][col] = this.currentPlayer;
        this.display.updateBoard(row, col, this.currentPlayer);
      } else {
        const isCellBelowOpen = this.board[row + 1][col] === "";
        if (!isCellBelowOpen) {
          this.board[row][col] = this.currentPlayer;
          this.display.updateBoard(row, col, this.currentPlayer);
        }
      }
      const win = this.isGameWon(row, col);
      console.log(win);
      this.switchPlayer();
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

  isGameWon = (row: number, col: number): boolean => {
    // refactor later
    if (
      // Horizontal win
      (this.board[row][0] === this.currentPlayer &&
        this.board[row][1] === this.currentPlayer &&
        this.board[row][2] === this.currentPlayer &&
        this.board[row][3] === this.currentPlayer) ||
      (this.board[row][1] === this.currentPlayer &&
        this.board[row][2] === this.currentPlayer &&
        this.board[row][3] === this.currentPlayer &&
        this.board[row][4] === this.currentPlayer) ||
      (this.board[row][2] === this.currentPlayer &&
        this.board[row][3] === this.currentPlayer &&
        this.board[row][4] === this.currentPlayer &&
        this.board[row][5] === this.currentPlayer) ||
      (this.board[row][3] === this.currentPlayer &&
        this.board[row][4] === this.currentPlayer &&
        this.board[row][5] === this.currentPlayer &&
        this.board[row][6] === this.currentPlayer) ||
      // Vertical win
      (this.board[0][col] === this.currentPlayer &&
        this.board[1][col] === this.currentPlayer &&
        this.board[2][col] === this.currentPlayer &&
        this.board[3][col] === this.currentPlayer) ||
      (this.board[1][col] === this.currentPlayer &&
        this.board[2][col] === this.currentPlayer &&
        this.board[3][col] === this.currentPlayer &&
        this.board[4][col] === this.currentPlayer) ||
      (this.board[2][col] === this.currentPlayer &&
        this.board[3][col] === this.currentPlayer &&
        this.board[4][col] === this.currentPlayer &&
        this.board[5][col] === this.currentPlayer) ||
      // Left Diagonal win
      (this.board[2][0] === this.currentPlayer &&
        this.board[3][1] === this.currentPlayer &&
        this.board[4][2] === this.currentPlayer &&
        this.board[5][3] === this.currentPlayer) ||
      (this.board[1][0] === this.currentPlayer &&
        this.board[2][1] === this.currentPlayer &&
        this.board[3][2] === this.currentPlayer &&
        this.board[4][3] === this.currentPlayer) ||
      (this.board[2][1] === this.currentPlayer &&
        this.board[3][2] === this.currentPlayer &&
        this.board[4][3] === this.currentPlayer &&
        this.board[5][4] === this.currentPlayer) ||
      (this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer &&
        this.board[3][3] === this.currentPlayer) ||
      (this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer &&
        this.board[3][3] === this.currentPlayer &&
        this.board[4][4] === this.currentPlayer) ||
      (this.board[2][2] === this.currentPlayer &&
        this.board[3][3] === this.currentPlayer &&
        this.board[4][4] === this.currentPlayer &&
        this.board[5][5] === this.currentPlayer) ||
      (this.board[0][1] === this.currentPlayer &&
        this.board[1][2] === this.currentPlayer &&
        this.board[2][3] === this.currentPlayer &&
        this.board[3][4] === this.currentPlayer) ||
      (this.board[1][2] === this.currentPlayer &&
        this.board[2][3] === this.currentPlayer &&
        this.board[3][4] === this.currentPlayer &&
        this.board[4][5] === this.currentPlayer) ||
      (this.board[2][3] === this.currentPlayer &&
        this.board[3][4] === this.currentPlayer &&
        this.board[4][5] === this.currentPlayer &&
        this.board[5][6] === this.currentPlayer) ||
      (this.board[0][2] === this.currentPlayer &&
        this.board[1][3] === this.currentPlayer &&
        this.board[2][4] === this.currentPlayer &&
        this.board[3][5] === this.currentPlayer) ||
      (this.board[1][3] === this.currentPlayer &&
        this.board[2][4] === this.currentPlayer &&
        this.board[3][5] === this.currentPlayer &&
        this.board[4][6] === this.currentPlayer) ||
      (this.board[0][3] === this.currentPlayer &&
        this.board[1][4] === this.currentPlayer &&
        this.board[2][5] === this.currentPlayer &&
        this.board[3][6] === this.currentPlayer) ||
      // Right Diagonal win
      (this.board[5][3] === this.currentPlayer &&
        this.board[4][4] === this.currentPlayer &&
        this.board[3][5] === this.currentPlayer &&
        this.board[2][6] === this.currentPlayer) ||
      (this.board[5][2] === this.currentPlayer &&
        this.board[4][3] === this.currentPlayer &&
        this.board[3][4] === this.currentPlayer &&
        this.board[2][5] === this.currentPlayer) ||
      (this.board[4][3] === this.currentPlayer &&
        this.board[3][4] === this.currentPlayer &&
        this.board[2][5] === this.currentPlayer &&
        this.board[1][6] === this.currentPlayer) ||
      (this.board[5][1] === this.currentPlayer &&
        this.board[4][2] === this.currentPlayer &&
        this.board[3][3] === this.currentPlayer &&
        this.board[2][4] === this.currentPlayer) ||
      (this.board[4][2] === this.currentPlayer &&
        this.board[3][3] === this.currentPlayer &&
        this.board[2][4] === this.currentPlayer &&
        this.board[1][5] === this.currentPlayer) ||
      (this.board[3][3] === this.currentPlayer &&
        this.board[2][4] === this.currentPlayer &&
        this.board[1][5] === this.currentPlayer &&
        this.board[0][6] === this.currentPlayer) ||
      (this.board[5][0] === this.currentPlayer &&
        this.board[4][1] === this.currentPlayer &&
        this.board[3][2] === this.currentPlayer &&
        this.board[2][3] === this.currentPlayer) ||
      (this.board[4][1] === this.currentPlayer &&
        this.board[3][2] === this.currentPlayer &&
        this.board[2][3] === this.currentPlayer &&
        this.board[1][4] === this.currentPlayer) ||
      (this.board[3][2] === this.currentPlayer &&
        this.board[2][3] === this.currentPlayer &&
        this.board[1][4] === this.currentPlayer &&
        this.board[0][5] === this.currentPlayer) ||
      (this.board[4][0] === this.currentPlayer &&
        this.board[3][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer &&
        this.board[1][3] === this.currentPlayer) ||
      (this.board[3][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer &&
        this.board[1][3] === this.currentPlayer &&
        this.board[0][4] === this.currentPlayer) ||
      (this.board[3][0] === this.currentPlayer &&
        this.board[2][1] === this.currentPlayer &&
        this.board[1][2] === this.currentPlayer &&
        this.board[0][3] === this.currentPlayer)
    )
      return true;
    return false;
  };

  switchPlayer(): void {
    this.currentPlayer =
      this.currentPlayer === this.players.red
        ? this.players.blue
        : this.players.red;
  }

  startGame(): void {
    this.display.printScoreBoard(this.score);
    this.display.printGameBoard(this.board);
  }
}
