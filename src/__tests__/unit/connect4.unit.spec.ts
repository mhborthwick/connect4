import { Connect4, DOMDisplay } from "../../classes/index";

jest.mock("../../classes/domDisplay");

describe("Class: Connect4", () => {
  describe("Method: startGame", () => {
    let domDisplay: DOMDisplay;
    let connect4: Connect4;

    beforeEach(() => {
      domDisplay = new DOMDisplay();
      connect4 = new Connect4(domDisplay);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should print score board once when game starts", () => {
      connect4.startGame();
      expect(domDisplay.printScoreBoard).toHaveBeenCalledTimes(1);
    });

    it("should print score board with { red: 0, blue: 0 } when game starts", () => {
      connect4.startGame();
      expect(domDisplay.printScoreBoard).toHaveBeenCalledWith({
        red: 0,
        blue: 0,
      });
    });

    it("should print game board once when game starts", () => {
      connect4.startGame();
      expect(domDisplay.printGameBoard).toHaveBeenCalledTimes(1);
    });

    it("should print game board with blank 6 x 7 board when game starts", () => {
      connect4.startGame();
      expect(domDisplay.printGameBoard).toHaveBeenCalledWith([
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ]);
    });
  });

  describe("Method Name: clickCell", () => {
    let domDisplay: DOMDisplay;
    let connect4: Connect4;

    function createMockBoard(): string[][] {
      return [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["blue", "blue", "", "", "", "", ""],
        ["red", "red", "red", "", "", "", ""],
      ];
    }

    beforeEach(() => {
      domDisplay = new DOMDisplay();
      connect4 = new Connect4(domDisplay);
      connect4.board = createMockBoard();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update board when cell below is filled", () => {
      connect4.clickCell(3, 0);
      expect(domDisplay.updateBoard).toHaveBeenCalledTimes(1);
    });

    it("should fill lowest unfilled cell when cell below is unfilled", () => {
      connect4.clickCell(2, 0);
      expect(domDisplay.updateBoard).toHaveBeenCalledTimes(1);
      expect(connect4.board).toEqual([
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["red", "", "", "", "", "", ""],
        ["blue", "blue", "", "", "", "", ""],
        ["red", "red", "red", "", "", "", ""],
      ]);
    });

    it("should have a winner when 4 cells in a row are filled", () => {
      // mock gameOver to handle built-in timer
      jest.spyOn(connect4, "gameOver").mockImplementationOnce(jest.fn());
      connect4.clickCell(5, 3);
      expect(domDisplay.updateBoard).toHaveBeenCalledTimes(1);
      expect(connect4.isGameWon(5, 3)).toEqual(true);
    });
  });
});
