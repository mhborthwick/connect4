export interface Display {
  bindHandler(clickHandler: (row: number, col: number) => void): void;
  clearGameBoard(): void;
  clearMessage(): void;
  updateScore(score: Score, currentPlayer: string): void;
  getElement(selector: string): HTMLElement;
  getAllElements(selector: string): NodeList;
  createElement(selector: string, className: string): HTMLElement;
  updateBoard(row: number, col: number, currentPlayer: string): void;
  printMessage(winnder: string): void;
  printGameBoard(board: string[][]): void;
  printScoreBoard(score: Score): void;
}

export interface Score {
  red: number;
  blue: number;
}
