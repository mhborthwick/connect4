export interface Display {
  getElement(selector: string): HTMLElement;
  createElement(selector: string, className: string): HTMLElement;
  printScoreBoard(score: Score): void;
}

export interface Score {
  red: number;
  blue: number;
}
