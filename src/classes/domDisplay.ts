import { Display, Player, Score } from "../interfaces/index";

export class DOMDisplay implements Display {
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

  bindHoverHandler(
    hoverHandler: (row: number, col: number, eventString: string) => void
  ): void {
    document.addEventListener("mouseover", (event: Event) => {
      const hovered = <HTMLElement>event.target;
      const isColumn = hovered.className === "col";
      if (isColumn) {
        const cell = hovered;
        // fix later - https://typescript-eslint.io/rules/no-non-null-assertion/
        const row = +cell.parentElement!.dataset.row!;
        const col = +cell.dataset.col!;
        hoverHandler(row, col, "mouseover");
      }
    });
    document.addEventListener("mouseout", (event: Event) => {
      const hovered = <HTMLElement>event.target;
      const isColumn = hovered.className === "col";
      if (isColumn) {
        const cell = hovered;
        // fix later - https://typescript-eslint.io/rules/no-non-null-assertion/
        const row = +cell.parentElement!.dataset.row!;
        const col = +cell.dataset.col!;
        hoverHandler(row, col, "mouseout");
      }
    });
  }

  bindClickHandler(clickHandler: (row: number, col: number) => void): void {
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

  enableHover(row: number, col: number): void {
    const currentCell = this.getElement(
      `[data-row="${row}"] [data-col="${col}"]`
    );
    const isLastCellInRowEmpty = row === 5 && !currentCell.innerHTML.length;
    if (isLastCellInRowEmpty) {
      this.getElement(`[data-row="${row}"] [data-col="${col}"]`).style.border =
        "2px solid #F9A810";
    }
    let i = 1;
    while (row + i <= 5) {
      const cellBelow = this.getElement(
        `[data-row="${row + i}"] [data-col="${col}"]`
      );
      const cellAbove = this.getElement(
        `[data-row="${row + i - 1}"] [data-col="${col}"]`
      );
      if (row + i === 5 && !cellBelow.innerHTML.length) {
        this.getElement(
          `[data-row="${row + i}"] [data-col="${col}"]`
        ).style.border = "2px solid #F9A810";
      } else if (cellBelow.innerHTML.length && !cellAbove.innerHTML.length) {
        this.getElement(
          `[data-row="${row + i - 1}"] [data-col="${col}"]`
        ).style.border = "2px solid #F9A810";
      }
      i += 1;
    }
  }

  disableHover(): void {
    const cols = this.getAllElements(".col") as NodeListOf<HTMLElement>;
    cols.forEach((c) => (c.style.border = "2px solid #3e3d4f"));
  }

  printMessage(winner?: string): void {
    const message = this.createElement("div", "message");
    const player = winner === "red" ? "Player 1" : "Player 2";
    message.textContent = winner ? `${player} wins!` : "Nobody wins!";
    const game = this.getElement("#game");
    game.prepend(message);
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
