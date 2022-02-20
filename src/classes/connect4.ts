import { Display } from "../types";

export default class Connect4 {
  display: Display;
  score: { red: number; blue: number };
  constructor(display: Display) {
    this.display = display;
    this.score = { red: 0, blue: 0 };
  }
  startGame(): void {
    this.display.printScoreBoard(this.score);
  }
}
