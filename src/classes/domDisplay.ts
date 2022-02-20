import { Display, Score } from "../types";

export default class DOMDisplay implements Display {
  getElement(selector: string): HTMLElement {
    return <HTMLElement>document.querySelector(selector);
  }

  createElement(
    tag: string,
    className?: string,
    dataset?: { value: string; index: string }
  ): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (dataset) element.dataset[dataset.value] = dataset.index;
    return element;
  }

  printGameBoard(board: string[][]) {
    const game = this.getElement("#game");
    const gameBoard = this.createElement("div", "board");
    game.append(gameBoard);
    board.forEach((row, i) => {
      const boardRow = this.createElement("div", "row", {
        value: "row",
        index: `${i}`,
      });
      gameBoard.append(boardRow);
      row.forEach((_, j) => {
        const boardCol = this.createElement("div", "col", {
          value: "col",
          index: `${j}`,
        });
        boardRow.append(boardCol);
      });
    });
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
