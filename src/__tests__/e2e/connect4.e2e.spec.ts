describe("Connect4", () => {
  const url = Cypress.config().baseUrl;

  describe("Start Game", () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it("should render a 7x6 board", () => {
      cy.get(".board").find(".row").find(".col").should("have.length", 42);
    });

    it("should render an empty board", () => {
      cy.get(".board").find(".row").find(".col").should("not.contain", "red");
      cy.get(".board").find(".row").find(".col").should("not.contain", "blue");
    });

    it("should render a 0-0 scoreboard", () => {
      cy.get(".score").find(".red").should("contain", "Player 1: 0");
      cy.get(".score").find(".blue").should("contain", "Player 2: 0");
    });
  });

  describe("Player Moves", () => {
    beforeEach(() => {
      cy.visit(url);
    });

    describe("First Move", () => {
      it("should fill cell with red token", () => {
        const firstCell = cy
          .get(".board")
          .find('[data-row="5"]')
          .find('[data-col="0"]');
        firstCell.click();
        firstCell.should("contain", "red");
      });
    });

    describe("Second Move", () => {
      it("should fill cell with blue token", () => {
        const firstCell = cy
          .get(".board")
          .find('[data-row="5"]')
          .find('[data-col="0"]');
        firstCell.click();
        const secondCell = cy
          .get(".board")
          .find('[data-row="5"]')
          .find('[data-col="1"]');
        secondCell.click();
        secondCell.should("contain", "blue");
      });
    });

    describe("Illegal Move", () => {
      it("should not fill cell with a token", () => {
        const firstCell = cy
          .get(".board")
          .find('[data-row="0"]')
          .find('[data-col="0"]');
        firstCell.click();
        firstCell.should("not.contain", "red");
        firstCell.should("not.contain", "blue");
      });
    });
  });

  describe("Player Wins", () => {
    beforeEach(() => {
      cy.visit(url);
    });

    describe("Horizontal Win", () => {
      it("should have winner when 4 tokens in a row", () => {
        cy.get(".board").find('[data-row="5"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="3"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="3"]').click();
        cy.get(".message").should("contain", "Player 1 wins!");
      });
    });

    describe("Vertical Win", () => {
      it("should have winner when 4 tokens in a row", () => {
        cy.get(".board").find('[data-row="5"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="3"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="3"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="2"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="2"]').find('[data-col="1"]').click();
        cy.get(".message").should("contain", "Player 1 wins!");
      });
    });

    describe("Diagonal Win", () => {
      it("should have winner when 4 tokens in a row", () => {
        cy.get(".board").find('[data-row="5"]').find('[data-col="0"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="1"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="5"]').find('[data-col="3"]').click();
        cy.get(".board").find('[data-row="3"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="4"]').find('[data-col="3"]').click();
        cy.get(".board").find('[data-row="3"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="3"]').find('[data-col="3"]').click();
        cy.get(".board").find('[data-row="2"]').find('[data-col="2"]').click();
        cy.get(".board").find('[data-row="2"]').find('[data-col="3"]').click();
        cy.get(".message").should("contain", "Player 1 wins!");
      });
    });
  });

  describe("Game Reset", () => {
    beforeEach(() => {
      cy.visit(url);
      cy.get(".board").find('[data-row="5"]').find('[data-col="0"]').click();
      cy.get(".board").find('[data-row="4"]').find('[data-col="0"]').click();
      cy.get(".board").find('[data-row="5"]').find('[data-col="1"]').click();
      cy.get(".board").find('[data-row="4"]').find('[data-col="1"]').click();
      cy.get(".board").find('[data-row="5"]').find('[data-col="2"]').click();
      cy.get(".board").find('[data-row="4"]').find('[data-col="2"]').click();
      cy.get(".board").find('[data-row="5"]').find('[data-col="3"]').click();
      cy.get(".board").find('[data-row="4"]').find('[data-col="3"]').click();
    });

    it("should render a 7x6 board", () => {
      cy.clock();
      cy.tick(2000);
      cy.get(".board").find(".row").find(".col").should("have.length", 42);
    });

    it("should render an empty board", () => {
      cy.clock();
      cy.tick(2000);
      cy.get(".board").find(".row").find(".col").should("not.contain", "red");
      cy.get(".board").find(".row").find(".col").should("not.contain", "blue");
    });

    it("should render a 1-0 scoreboard", () => {
      cy.clock();
      cy.tick(2000);
      cy.get(".score").find(".red").should("contain", "Player 1: 1");
      cy.get(".score").find(".blue").should("contain", "Player 2: 0");
    });
  });
});
