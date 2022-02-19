interface Display {
  printScoreBoard(score: Score): void;
}

interface Score {
  red: number;
  blue: number;
}

// -- Display --
class DOMDisplay {
  printScoreBoard(score: Score): void {
    console.log(score);
  }
}

// -- Model --
class Connect4 {
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

// -- Start Game --
const connect4 = new Connect4(new DOMDisplay());
connect4.startGame();
