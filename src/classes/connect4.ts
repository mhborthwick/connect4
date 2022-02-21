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

  clickCell = (row: number, col: number) => {
    const canContinue = this.board[row][col] === "";
    if (canContinue) {
      this.board[row][col] = this.currentPlayer;
      this.display.updateBoard(row, col, this.currentPlayer);
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

  startGame(): void {
    this.display.printScoreBoard(this.score);
    this.display.printGameBoard(this.board);
  }
}
