export interface Display {
  bindClickHandler(clickHandler: (row: number, col: number) => void): void;
  bindHoverHandler(
    clickHandler: (row: number, col: number, eventString: string) => void
  ): void;
  clearGameBoard(): void;
  disableHover(): void;
  enableHover(row: number, col: number): void;
  clearMessage(): void;
  updateScore(score: Score, currentPlayer: Player): void;
  getElement(selector: string): HTMLElement;
  getAllElements(selector: string): NodeList;
  createElement(selector: string, className: string): HTMLElement;
  updateBoard(row: number, col: number, currentPlayer: Player): void;
  printMessage(winner?: string): void;
  printGameBoard(board: string[][]): void;
  printScoreBoard(score: Score): void;
}

export interface Score {
  red: number;
  blue: number;
}

export interface Player {
  token: string;
  isTurn: boolean;
}
