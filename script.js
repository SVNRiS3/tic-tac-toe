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
	const getInfo = () => ({ name, symbol });

	return { getInfo };
}

const renderGameboard = (function () {
	const consoleRender = (playerInfo) => {
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
		console.log(
			playerInfo.name +
				", where to draw " +
				playerInfo.symbol +
				"?"
		);
	};

	return { consoleRender };
})();

const GameControls = (function () {
	let playingPlayer = 1;
	const firstPlayer = Player("Player1", "x");
	const secondPlayer = Player("Player2", "o");
	const getPlayerInfo = () => {
		if (playingPlayer === 1) {
			return firstPlayer.getInfo();
		} else if (playingPlayer === 2) {
			return secondPlayer.getInfo();
		}
	};

	const isFieldOccupied = (row, column) =>
		Boolean(Gameboard.getBoard()[row][column].getSymbol());

	renderGameboard.consoleRender(getPlayerInfo());

	const playRound = (row, column) => {
		if (!isFieldOccupied(row, column)) {
			Gameboard.getBoard()[row][column].setSymbol(
				getPlayerInfo().symbol
			);
			switchPlayer();
		}
		renderGameboard.consoleRender(getPlayerInfo());
	};

	const switchPlayer = () => {
		playingPlayer = playingPlayer === 1 ? 2 : 1;
	};

	return { playRound };
})();
