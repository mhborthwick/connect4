import Connect4 from "../classes/connect4";
import DOMDisplay from "../classes/domDisplay";

describe("Class: Connect4", () => {
  describe("Method: startGame", () => {
    let domDisplay: DOMDisplay;
    let connect4: Connect4;

    beforeEach(() => {
      jest
        .spyOn(DOMDisplay.prototype, "printScoreBoard")
        .mockImplementationOnce(jest.fn());
      domDisplay = new DOMDisplay();
      connect4 = new Connect4(domDisplay);
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
  });
});
