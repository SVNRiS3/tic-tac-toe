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

function Player(name) {
	const getName = () => name;

	return { getName };
}

const renderGameboard = (function () {
	const consoleRender = () => {
		console.log("   " + [0, 1, 2].join(" | ") + " ");
		Gameboard.getBoard().forEach((arr, index) => {
			console.log(
				index +
					" [" +
					arr
						.map((obj) => obj.getSymbol() || " ")
						.join(" | ") +
					"]"
			);
		});
	};

	return { consoleRender };
})();

const GameControl = (function () {
	let symbol = "x";

	const firstPlayer = Player("P1");
	const secondPlayer = Player("P2");
	renderGameboard.consoleRender();

	const playRound = (row, column) => {
		Gameboard.getBoard()[row][column].setSymbol(symbol);
		renderGameboard.consoleRender();
		switchPlayer();
	};

	function switchPlayer() {
		symbol = symbol === "x" ? "o" : "x";
	}

	return { playRound };
})();
