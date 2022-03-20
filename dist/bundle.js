/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/connect4.ts":
/*!*********************************!*\
  !*** ./src/classes/connect4.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Connect4\": () => (/* binding */ Connect4)\n/* harmony export */ });\nvar Connect4 = (function () {\n    function Connect4(display) {\n        var _this = this;\n        this.hoverCell = function (row, col, eventString) {\n            if (eventString === \"mouseover\") {\n                var currentCol = _this.display.getElement(\"[data-row=\\\"\".concat(row, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\"));\n                if (row === 5 && !currentCol.innerHTML.length) {\n                    _this.display.getElement(\"[data-row=\\\"\".concat(row, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\")).style.border = \"2px solid #F9A810\";\n                }\n                var i = 1;\n                while (row + i <= 5) {\n                    var colBelow = _this.display.getElement(\"[data-row=\\\"\".concat(row + i, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\"));\n                    var colAbove = _this.display.getElement(\"[data-row=\\\"\".concat(row + i - 1, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\"));\n                    if (row + i === 5 && !colBelow.innerHTML.length) {\n                        _this.display.getElement(\"[data-row=\\\"\".concat(row + i, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\")).style.border = \"2px solid #F9A810\";\n                    }\n                    else if (colBelow.innerHTML.length && !colAbove.innerHTML.length) {\n                        _this.display.getElement(\"[data-row=\\\"\".concat(row + i - 1, \"\\\"] [data-col=\\\"\").concat(col, \"\\\"]\")).style.border = \"2px solid #F9A810\";\n                    }\n                    i += 1;\n                }\n            }\n            else if (eventString === \"mouseout\") {\n                _this.display.clearHoverEffects();\n            }\n        };\n        this.clickCell = function (row, col) {\n            _this.display.clearHoverEffects();\n            var isLastRow = row === 5;\n            var canContinue = _this.board[row][col] === \"\";\n            if (canContinue && !_this.waiting) {\n                if (isLastRow) {\n                    _this.board[row][col] = _this.currentPlayer.token;\n                    _this.display.updateBoard(row, col, _this.currentPlayer);\n                    _this.currentPlayer.isTurn = false;\n                }\n                else {\n                    var isCellBelowOpen = _this.board[row + 1][col] === \"\";\n                    if (!isCellBelowOpen) {\n                        _this.board[row][col] = _this.currentPlayer.token;\n                        _this.display.updateBoard(row, col, _this.currentPlayer);\n                        _this.currentPlayer.isTurn = false;\n                    }\n                    else {\n                        var i = 1;\n                        while (row + i <= 5) {\n                            if (row + i === 5 && _this.board[row + i][col] === \"\") {\n                                _this.board[row + i][col] = _this.currentPlayer.token;\n                                _this.display.updateBoard(row + i, col, _this.currentPlayer);\n                                _this.currentPlayer.isTurn = false;\n                            }\n                            else if (_this.board[row + i][col] === \"\" &&\n                                !(_this.board[row + i + 1][col] === \"\")) {\n                                _this.board[row + i][col] = _this.currentPlayer.token;\n                                _this.display.updateBoard(row + i, col, _this.currentPlayer);\n                                _this.currentPlayer.isTurn = false;\n                            }\n                            else {\n                                i += 1;\n                            }\n                        }\n                    }\n                }\n                var win = _this.isGameWon(row, col);\n                var stalemate = _this.board\n                    .map(function (row) { return row.filter(function (col) { return col === \"\"; }); })\n                    .filter(function (row) { return row.length > 0; });\n                if (!_this.waiting) {\n                    if (win) {\n                        _this.increaseScore(_this.currentPlayer);\n                        _this.display.updateScore(_this.score, _this.currentPlayer);\n                        _this.gameOver(_this.currentPlayer);\n                    }\n                    else if (stalemate.length < 1) {\n                        _this.gameOver();\n                    }\n                    else {\n                        if (!_this.currentPlayer.isTurn) {\n                            _this.switchPlayer();\n                        }\n                    }\n                }\n            }\n        };\n        this.display = display;\n        this.board = this.createBoard();\n        this.score = { red: 0, blue: 0 };\n        this.players = {\n            red: { token: \"red\", isTurn: true },\n            blue: { token: \"blue\", isTurn: false },\n        };\n        this.currentPlayer = this.players.red;\n        this.display.bindClickHandler(this.clickCell);\n        this.display.bindHoverHandler(this.hoverCell);\n        this.waiting = false;\n    }\n    Connect4.prototype.increaseScore = function (currentPlayer) {\n        this.score[currentPlayer.token] += 1;\n    };\n    Connect4.prototype.createBoard = function () {\n        return [\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n            [\"\", \"\", \"\", \"\", \"\", \"\", \"\"],\n        ];\n    };\n    Connect4.prototype.resetBoard = function () {\n        this.display.clearMessage();\n        this.display.clearGameBoard();\n        this.board = this.createBoard();\n    };\n    Connect4.prototype.resetPlayers = function () {\n        this.currentPlayer = this.players.red;\n    };\n    Connect4.prototype.gameOver = function (winner) {\n        var _this = this;\n        this.waiting = true;\n        this.display.printMessage(winner === null || winner === void 0 ? void 0 : winner.token);\n        setTimeout(function () {\n            _this.resetBoard();\n            _this.resetPlayers();\n            _this.waiting = false;\n        }, 2000);\n    };\n    Connect4.prototype.isGameWon = function (row, col) {\n        if ((this.board[row][0] === this.currentPlayer.token &&\n            this.board[row][1] === this.currentPlayer.token &&\n            this.board[row][2] === this.currentPlayer.token &&\n            this.board[row][3] === this.currentPlayer.token) ||\n            (this.board[row][1] === this.currentPlayer.token &&\n                this.board[row][2] === this.currentPlayer.token &&\n                this.board[row][3] === this.currentPlayer.token &&\n                this.board[row][4] === this.currentPlayer.token) ||\n            (this.board[row][2] === this.currentPlayer.token &&\n                this.board[row][3] === this.currentPlayer.token &&\n                this.board[row][4] === this.currentPlayer.token &&\n                this.board[row][5] === this.currentPlayer.token) ||\n            (this.board[row][3] === this.currentPlayer.token &&\n                this.board[row][4] === this.currentPlayer.token &&\n                this.board[row][5] === this.currentPlayer.token &&\n                this.board[row][6] === this.currentPlayer.token) ||\n            (this.board[0][col] === this.currentPlayer.token &&\n                this.board[1][col] === this.currentPlayer.token &&\n                this.board[2][col] === this.currentPlayer.token &&\n                this.board[3][col] === this.currentPlayer.token) ||\n            (this.board[1][col] === this.currentPlayer.token &&\n                this.board[2][col] === this.currentPlayer.token &&\n                this.board[3][col] === this.currentPlayer.token &&\n                this.board[4][col] === this.currentPlayer.token) ||\n            (this.board[2][col] === this.currentPlayer.token &&\n                this.board[3][col] === this.currentPlayer.token &&\n                this.board[4][col] === this.currentPlayer.token &&\n                this.board[5][col] === this.currentPlayer.token) ||\n            (this.board[2][0] === this.currentPlayer.token &&\n                this.board[3][1] === this.currentPlayer.token &&\n                this.board[4][2] === this.currentPlayer.token &&\n                this.board[5][3] === this.currentPlayer.token) ||\n            (this.board[1][0] === this.currentPlayer.token &&\n                this.board[2][1] === this.currentPlayer.token &&\n                this.board[3][2] === this.currentPlayer.token &&\n                this.board[4][3] === this.currentPlayer.token) ||\n            (this.board[2][1] === this.currentPlayer.token &&\n                this.board[3][2] === this.currentPlayer.token &&\n                this.board[4][3] === this.currentPlayer.token &&\n                this.board[5][4] === this.currentPlayer.token) ||\n            (this.board[0][0] === this.currentPlayer.token &&\n                this.board[1][1] === this.currentPlayer.token &&\n                this.board[2][2] === this.currentPlayer.token &&\n                this.board[3][3] === this.currentPlayer.token) ||\n            (this.board[1][1] === this.currentPlayer.token &&\n                this.board[2][2] === this.currentPlayer.token &&\n                this.board[3][3] === this.currentPlayer.token &&\n                this.board[4][4] === this.currentPlayer.token) ||\n            (this.board[2][2] === this.currentPlayer.token &&\n                this.board[3][3] === this.currentPlayer.token &&\n                this.board[4][4] === this.currentPlayer.token &&\n                this.board[5][5] === this.currentPlayer.token) ||\n            (this.board[0][1] === this.currentPlayer.token &&\n                this.board[1][2] === this.currentPlayer.token &&\n                this.board[2][3] === this.currentPlayer.token &&\n                this.board[3][4] === this.currentPlayer.token) ||\n            (this.board[1][2] === this.currentPlayer.token &&\n                this.board[2][3] === this.currentPlayer.token &&\n                this.board[3][4] === this.currentPlayer.token &&\n                this.board[4][5] === this.currentPlayer.token) ||\n            (this.board[2][3] === this.currentPlayer.token &&\n                this.board[3][4] === this.currentPlayer.token &&\n                this.board[4][5] === this.currentPlayer.token &&\n                this.board[5][6] === this.currentPlayer.token) ||\n            (this.board[0][2] === this.currentPlayer.token &&\n                this.board[1][3] === this.currentPlayer.token &&\n                this.board[2][4] === this.currentPlayer.token &&\n                this.board[3][5] === this.currentPlayer.token) ||\n            (this.board[1][3] === this.currentPlayer.token &&\n                this.board[2][4] === this.currentPlayer.token &&\n                this.board[3][5] === this.currentPlayer.token &&\n                this.board[4][6] === this.currentPlayer.token) ||\n            (this.board[0][3] === this.currentPlayer.token &&\n                this.board[1][4] === this.currentPlayer.token &&\n                this.board[2][5] === this.currentPlayer.token &&\n                this.board[3][6] === this.currentPlayer.token) ||\n            (this.board[5][3] === this.currentPlayer.token &&\n                this.board[4][4] === this.currentPlayer.token &&\n                this.board[3][5] === this.currentPlayer.token &&\n                this.board[2][6] === this.currentPlayer.token) ||\n            (this.board[5][2] === this.currentPlayer.token &&\n                this.board[4][3] === this.currentPlayer.token &&\n                this.board[3][4] === this.currentPlayer.token &&\n                this.board[2][5] === this.currentPlayer.token) ||\n            (this.board[4][3] === this.currentPlayer.token &&\n                this.board[3][4] === this.currentPlayer.token &&\n                this.board[2][5] === this.currentPlayer.token &&\n                this.board[1][6] === this.currentPlayer.token) ||\n            (this.board[5][1] === this.currentPlayer.token &&\n                this.board[4][2] === this.currentPlayer.token &&\n                this.board[3][3] === this.currentPlayer.token &&\n                this.board[2][4] === this.currentPlayer.token) ||\n            (this.board[4][2] === this.currentPlayer.token &&\n                this.board[3][3] === this.currentPlayer.token &&\n                this.board[2][4] === this.currentPlayer.token &&\n                this.board[1][5] === this.currentPlayer.token) ||\n            (this.board[3][3] === this.currentPlayer.token &&\n                this.board[2][4] === this.currentPlayer.token &&\n                this.board[1][5] === this.currentPlayer.token &&\n                this.board[0][6] === this.currentPlayer.token) ||\n            (this.board[5][0] === this.currentPlayer.token &&\n                this.board[4][1] === this.currentPlayer.token &&\n                this.board[3][2] === this.currentPlayer.token &&\n                this.board[2][3] === this.currentPlayer.token) ||\n            (this.board[4][1] === this.currentPlayer.token &&\n                this.board[3][2] === this.currentPlayer.token &&\n                this.board[2][3] === this.currentPlayer.token &&\n                this.board[1][4] === this.currentPlayer.token) ||\n            (this.board[3][2] === this.currentPlayer.token &&\n                this.board[2][3] === this.currentPlayer.token &&\n                this.board[1][4] === this.currentPlayer.token &&\n                this.board[0][5] === this.currentPlayer.token) ||\n            (this.board[4][0] === this.currentPlayer.token &&\n                this.board[3][1] === this.currentPlayer.token &&\n                this.board[2][2] === this.currentPlayer.token &&\n                this.board[1][3] === this.currentPlayer.token) ||\n            (this.board[3][1] === this.currentPlayer.token &&\n                this.board[2][2] === this.currentPlayer.token &&\n                this.board[1][3] === this.currentPlayer.token &&\n                this.board[0][4] === this.currentPlayer.token) ||\n            (this.board[3][0] === this.currentPlayer.token &&\n                this.board[2][1] === this.currentPlayer.token &&\n                this.board[1][2] === this.currentPlayer.token &&\n                this.board[0][3] === this.currentPlayer.token))\n            return true;\n        return false;\n    };\n    Connect4.prototype.switchPlayer = function () {\n        this.currentPlayer =\n            this.currentPlayer === this.players.red\n                ? this.players.blue\n                : this.players.red;\n        this.currentPlayer.isTurn = true;\n    };\n    Connect4.prototype.startGame = function () {\n        this.display.printScoreBoard(this.score);\n        this.display.printGameBoard(this.board);\n    };\n    return Connect4;\n}());\n\n\n\n//# sourceURL=webpack://connect4/./src/classes/connect4.ts?");

/***/ }),

/***/ "./src/classes/domDisplay.ts":
/*!***********************************!*\
  !*** ./src/classes/domDisplay.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMDisplay\": () => (/* binding */ DOMDisplay)\n/* harmony export */ });\nvar DOMDisplay = (function () {\n    function DOMDisplay() {\n    }\n    DOMDisplay.prototype.getElement = function (selector) {\n        return document.querySelector(selector);\n    };\n    DOMDisplay.prototype.createElement = function (tag, className, dataset) {\n        var element = document.createElement(tag);\n        if (className)\n            element.classList.add(className);\n        if (dataset)\n            element.dataset[dataset.value] = dataset.index;\n        return element;\n    };\n    DOMDisplay.prototype.getAllElements = function (selector) {\n        return document.querySelectorAll(selector);\n    };\n    DOMDisplay.prototype.clearGameBoard = function () {\n        var cells = this.getAllElements(\".col\");\n        cells.forEach(function (c) {\n            c.textContent = \"\";\n        });\n    };\n    DOMDisplay.prototype.bindHoverHandler = function (hoverHandler) {\n        document.addEventListener(\"mouseover\", function (event) {\n            var hovered = event.target;\n            var isColumn = hovered.className === \"col\";\n            if (isColumn) {\n                var cell = hovered;\n                var row = +cell.parentElement.dataset.row;\n                var col = +cell.dataset.col;\n                hoverHandler(row, col, \"mouseover\");\n            }\n        });\n        document.addEventListener(\"mouseout\", function (event) {\n            var hovered = event.target;\n            var isColumn = hovered.className === \"col\";\n            if (isColumn) {\n                var cell = hovered;\n                var row = +cell.parentElement.dataset.row;\n                var col = +cell.dataset.col;\n                hoverHandler(row, col, \"mouseout\");\n            }\n        });\n    };\n    DOMDisplay.prototype.bindClickHandler = function (clickHandler) {\n        document.addEventListener(\"click\", function (event) {\n            var clicked = event.target;\n            var isColumn = clicked.className === \"col\";\n            if (isColumn) {\n                var cell = clicked;\n                var row = +cell.parentElement.dataset.row;\n                var col = +cell.dataset.col;\n                clickHandler(row, col);\n            }\n        });\n    };\n    DOMDisplay.prototype.clearMessage = function () {\n        var message = this.getElement(\".message\");\n        message.remove();\n    };\n    DOMDisplay.prototype.clearHoverEffects = function () {\n        var cols = this.getAllElements(\".col\");\n        cols.forEach(function (c) { return (c.style.border = \"2px solid #3e3d4f\"); });\n    };\n    DOMDisplay.prototype.printMessage = function (winner) {\n        var message = this.createElement(\"div\", \"message\");\n        var player = winner === \"red\" ? \"Player 1\" : \"Player 2\";\n        message.textContent = winner ? \"\".concat(player, \" wins!\") : \"Nobody wins!\";\n        var game = this.getElement(\"#game\");\n        game.prepend(message);\n    };\n    DOMDisplay.prototype.updateScore = function (currentScore, currentPlayer) {\n        var currentPlayerScore = this.getElement(\"#score-\".concat(currentPlayer.token));\n        var player = currentPlayer.token === \"red\" ? \"Player 1\" : \"Player 2\";\n        var d = currentScore[currentPlayer.token];\n        currentPlayerScore.textContent = \"\".concat(player, \": \").concat(d);\n    };\n    DOMDisplay.prototype.updateBoard = function (row, col, currentPlayer) {\n        var playerToken = this.createElement(\"span\", currentPlayer.token);\n        playerToken.textContent = currentPlayer.token;\n        var boardRow = this.getElement(\"[data-row=\\\"\".concat(row, \"\\\"]\"));\n        var cell = boardRow.querySelector(\"[data-col=\\\"\".concat(col, \"\\\"]\"));\n        cell.append(playerToken);\n    };\n    DOMDisplay.prototype.printGameBoard = function (board) {\n        var _this = this;\n        var game = this.getElement(\"#game\");\n        var gameBoard = this.createElement(\"div\", \"board\");\n        game.append(gameBoard);\n        board.forEach(function (row, i) {\n            var boardRow = _this.createElement(\"div\", \"row\", {\n                value: \"row\",\n                index: \"\".concat(i),\n            });\n            gameBoard.append(boardRow);\n            row.forEach(function (_, j) {\n                var boardCol = _this.createElement(\"div\", \"col\", {\n                    value: \"col\",\n                    index: \"\".concat(j),\n                });\n                boardRow.append(boardCol);\n            });\n        });\n    };\n    DOMDisplay.prototype.printScoreBoard = function (score) {\n        var game = this.getElement(\"#game\");\n        var scoreBoard = this.createElement(\"div\", \"score\");\n        game.append(scoreBoard);\n        var playerOneScore = this.createElement(\"div\", \"red\");\n        playerOneScore.textContent = \"Player 1: \".concat(score.red);\n        playerOneScore.id = \"score-red\";\n        var playerTwoScore = this.createElement(\"div\", \"blue\");\n        playerTwoScore.textContent = \"Player 2: \".concat(score.blue);\n        playerTwoScore.id = \"score-blue\";\n        scoreBoard.append(playerOneScore, playerTwoScore);\n    };\n    return DOMDisplay;\n}());\n\n\n\n//# sourceURL=webpack://connect4/./src/classes/domDisplay.ts?");

/***/ }),

/***/ "./src/classes/index.ts":
/*!******************************!*\
  !*** ./src/classes/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Connect4\": () => (/* reexport safe */ _connect4__WEBPACK_IMPORTED_MODULE_0__.Connect4),\n/* harmony export */   \"DOMDisplay\": () => (/* reexport safe */ _domDisplay__WEBPACK_IMPORTED_MODULE_1__.DOMDisplay)\n/* harmony export */ });\n/* harmony import */ var _connect4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connect4 */ \"./src/classes/connect4.ts\");\n/* harmony import */ var _domDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDisplay */ \"./src/classes/domDisplay.ts\");\n\n\n\n\n//# sourceURL=webpack://connect4/./src/classes/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/index */ \"./src/classes/index.ts\");\n\nvar connect4 = new _classes_index__WEBPACK_IMPORTED_MODULE_0__.Connect4(new _classes_index__WEBPACK_IMPORTED_MODULE_0__.DOMDisplay());\nconnect4.startGame();\n\n\n//# sourceURL=webpack://connect4/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;