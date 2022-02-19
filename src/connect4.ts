interface Display {
  getElement(selector: string): HTMLElement;
  createElement(selector: string, className: string): HTMLElement;
  printScoreBoard(score: Score): void;
}

interface Score {
  red: number;
  blue: number;
}

// -- Display --
class DOMDisplay implements Display {
  getElement(selector: string): HTMLElement {
    return <HTMLElement>document.querySelector(selector);
  }

  createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  printScoreBoard(score: Score): void {
    const game = this.getElement("#game");
    const scoreBoard = this.createElement("div", "score");
    game.append(scoreBoard);
    const playerOneScore = this.createElement("div", "red");
    playerOneScore.textContent = `Player 1: ${score.red}`;
    playerOneScore.id = "score-red";
    const playerTwoScore = this.createElement("div", "blue");
    playerTwoScore.textContent = `Player 2: ${score.blue}`;
    playerTwoScore.id = "score-blue";
    scoreBoard.append(playerOneScore, playerTwoScore);
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
