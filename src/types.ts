export interface Display {
  bindHandler(clickHandler: (row: number, col: number) => void): void;
  updateScore(score: Score, currentPlayer: string): void;
  getElement(selector: string): HTMLElement;
  createElement(selector: string, className: string): HTMLElement;
  updateBoard(row: number, col: number, currentPlayer: string): void;
  printGameBoard(board: string[][]): void;
  printScoreBoard(score: Score): void;
}

export interface Score {
  red: number;
  blue: number;
}
