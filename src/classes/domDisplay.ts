import { Display, Player, Score } from "../types";

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

  getAllElements(selector: string): NodeList {
    return <NodeList>document.querySelectorAll(selector);
  }

  clearGameBoard(): void {
    const cells = this.getAllElements(".col");
    cells.forEach((c) => {
      c.textContent = "";
    });
  }

  bindHandler(clickHandler: (row: number, col: number) => void): void {
    document.addEventListener("click", (event: Event) => {
      const clicked = <HTMLElement>event.target;
      const isColumn = clicked.className === "col";
      if (isColumn) {
        const cell = clicked;
        // fix later - https://typescript-eslint.io/rules/no-non-null-assertion/
        const row = +cell.parentElement!.dataset.row!;
        const col = +cell.dataset.col!;
        clickHandler(row, col);
      }
    });
  }

  clearMessage(): void {
    const message = this.getElement(".message");
    message.remove();
  }

  printMessage(winner?: string): void {
    const message = this.createElement("div", "message");
    const player = winner === "red" ? "Player 1" : "Player 2";
    message.textContent = winner ? `${player} wins!` : "Nobody wins!";
    const game = this.getElement("#game");
    game.append(message);
  }

  updateScore(currentScore: Score, currentPlayer: Player): void {
    const currentPlayerScore = this.getElement(`#score-${currentPlayer.token}`);
    const player = currentPlayer.token === "red" ? "Player 1" : "Player 2";
    const d: number = currentScore[currentPlayer.token as keyof Score];
    currentPlayerScore.textContent = `${player}: ${d}`;
  }

  updateBoard(row: number, col: number, currentPlayer: Player): void {
    const playerToken = this.createElement("span", currentPlayer.token);
    playerToken.textContent = currentPlayer.token;
    const boardRow = this.getElement(`[data-row="${row}"]`);
    const cell = <HTMLElement>boardRow.querySelector(`[data-col="${col}"]`);
    cell.append(playerToken);
  }

  printGameBoard(board: string[][]): void {
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
