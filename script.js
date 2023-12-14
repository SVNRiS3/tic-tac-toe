const Gameboard = (function () {
	const BOARDSIZE = 3;
	const board = [];

	for (let i = 0; i < BOARDSIZE; i++) {
		board[i] = [];
		for (let j = 0; j < BOARDSIZE; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	return { getBoard };
})();

function Cell() {
	let symbol = "";

	const setSymbol = (newSymbol) => (symbol = newSymbol);
	const getSymbol = () => symbol;

	return { setSymbol, getSymbol };
}

function Player(name, symbol) {
	const getName = () => name;
	const getSymbol = () => symbol;

	return { getName, getSymbol };
}

const GameControl = (function () {
	const firstPlayer = Player("P1", "x");
	const secondlayer = Player("P2", "o");
})();
