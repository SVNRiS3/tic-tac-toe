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
	const consoleRender = (playerName, symbol) => {
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
		console.log(playerName + ", where to draw " + symbol + "?");
	};

	return { consoleRender };
})();

const GameControl = (function () {
	let symbol = "x";
	let playingPlayer = 1;
	const firstPlayer = Player("Player1");
	const secondPlayer = Player("Player2");
	const getPlayerName = (player) => {
		if (player === 1) {
			return firstPlayer.getName();
		} else if (player === 2) {
			return secondPlayer.getName();
		}
	};

	const isFieldOccupied = (row, column) =>
		Boolean(Gameboard.getBoard()[row][column].getSymbol());

	const getSymbol = () => symbol;
	renderGameboard.consoleRender(getPlayerName(playingPlayer), symbol);

	const playRound = (row, column) => {
		if (!isFieldOccupied(row, column)) {
			Gameboard.getBoard()[row][column].setSymbol(symbol);
			switchPlayer();
		}
		renderGameboard.consoleRender(
			getPlayerName(playingPlayer),
			symbol
		);
	};

	const switchPlayer = () => {
		symbol = symbol === "x" ? "o" : "x";
		playingPlayer = playingPlayer === 1 ? 2 : 1;
	};

	return { playRound, getSymbol };
})();
