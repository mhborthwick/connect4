describe("Connect4", () => {
  describe("Start Game", () => {
    before(() => {
      cy.visit("http://localhost:3000/");
    });

    it("should render a 7x6 board", () => {});
    it("should render an empty board", () => {});
    it("should render a 0-0 scoreboard", () => {});
  });

  describe("Player Moves", () => {
    describe("First Move", () => {
      it("should fill cell with red token", () => {});
    });
    describe("Second Move", () => {
      it("should fill cell with blue token", () => {});
    });
    describe("Illegal Move", () => {
      it("should not fill cell with a token", () => {});
    });
  });

  describe("Player Moves", () => {
    describe("First Move", () => {
      it("should fill cell with red token", () => {});
    });
    describe("Second Move", () => {
      it("should fill cell with blue token", () => {});
    });
    describe("Illegal Move", () => {
      it("should not fill cell with token", () => {});
      it("should not switch player turn", () => {});
    });
  });

  describe("Player Wins", () => {
    describe("Horizontal Win", () => {
      it("should have winner when 4 tokens in a row", () => {});
    });
    describe("Vertical Win", () => {
      it("should have winner when 4 tokens in a row", () => {});
    });
    describe("Diagonal Win", () => {
      it("should have winner when 4 tokens in a row", () => {});
    });
  });

  describe("Game Reset", () => {
    it("should render a 7x6 board", () => {});
    it("should render an empty board", () => {});
    it("should render a 1-0 scoreboard", () => {});
  });
});
