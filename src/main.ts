import Connect4 from "./classes/connect4";
import DOMDisplay from "./classes/domDisplay";

const connect4 = new Connect4(new DOMDisplay());
connect4.startGame();
