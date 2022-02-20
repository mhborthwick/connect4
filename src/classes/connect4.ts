import { Display } from "../types";

export default class Connect4 {
  display: Display;
  score: { red: number; blue: number };
  board: string[][];
  constructor(display: Display) {
    this.display = display;
    this.board = this.createBoard();
    this.score = { red: 0, blue: 0 };
  }

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
