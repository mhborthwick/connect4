export interface Display {
  getElement(selector: string): HTMLElement;
  createElement(selector: string, className: string): HTMLElement;
  printGameBoard(board: string[][]): void;
  printScoreBoard(score: Score): void;
}

export interface Score {
  red: number;
  blue: number;
}
