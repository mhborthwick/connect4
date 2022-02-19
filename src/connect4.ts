interface Display {}

// -- Display --
class DOMDisplay {
  // DOMDisplay class
}

// -- Model --
class Connect4 {
  display: Display;
  constructor(display: Display) {
    this.display = display;
  }
  startGame() {
    return;
  }
}

// -- Start Game --
const connect4 = new Connect4(new DOMDisplay());
connect4.startGame();
