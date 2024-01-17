const Gameboard = (function () {
	const BOARDSIZE = 3;
	const board = [];

	const createBoard = () => {
		for (let i = 0; i < BOARDSIZE; i++) {
			board[i] = [];
			for (let j = 0; j < BOARDSIZE; j++) {
				board[i].push(Cell());
			}
		}
	};

	createBoard();

	const getBoard = () => board;

	const getBoardsize = () => BOARDSIZE;

	const sumOfSymbols = () =>
		getBoard().reduce(
			(sum, arr) =>
				sum +
				arr.reduce(
					(arrsum, item) => arrsum + item.getSymbol().length,
					0
				),
			0
		);

	return { getBoard, getBoardsize, createBoard, sumOfSymbols };
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

const renderGameboardVisual = (function () {
	const setButtonText = () => {
		const resetButton = document.querySelector(".new-game");
		resetButton.textContent =
			Gameboard.sumOfSymbols() > 0 && !GameControls.isGameWon()
				? "Reset"
				: "New game";
	};
	const boardRenderVisual = () => {
		const gameboardArr = Gameboard.getBoard();
		const gameboardEl = document.querySelector(".gameboard");
		gameboardEl.innerHTML = "";
		gameboardArr.forEach((row, rowIndex) => {
			row.forEach((el, colIndex) => {
				let newElement = document.createElement("div");
				newElement.classList.add("cell");
				newElement.setAttribute(
					"data-position",
					"" + rowIndex + colIndex
				);
				newElement.textContent = el.getSymbol();
				gameboardEl.appendChild(newElement);
			});
		});
		setButtonText();
	};
	return { boardRenderVisual };
})();

const renderGameboard = (function () {
	const boardRender = () => {
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

	const playerTurnRender = (playerInfo) => {
		console.log(
			playerInfo.name +
				", where to draw " +
				playerInfo.symbol +
				"?"
		);
	};

	const winRender = (playerInfo) => {
		console.log(playerInfo.name + " won, congratulations!");
	};

	const tieRender = () => {
		console.log("It's a tie!");
	};

	return { boardRender, playerTurnRender, winRender, tieRender };
})();

const GameControls = (function () {
	let gameFinished = false;
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

	const isATie = () => Gameboard.sumOfSymbols() === 9;

	const isGameWon = () => {
		const symbolDrawn = getPlayerInfo().symbol;
		const board = Gameboard.getBoard();
		const checkRowColumn = (rowColumn) =>
			rowColumn.every(
				(symbol) => symbol.getSymbol() === symbolDrawn
			);

		for (let i = 0; i < Gameboard.getBoardsize(); i++) {
			let column = board.map((arr) => arr[i]);

			if (checkRowColumn(board[i]) || checkRowColumn(column))
				return true;
		}
		if (board[1][1].getSymbol() === symbolDrawn) {
			if (
				(board[0][0].getSymbol() === symbolDrawn &&
					board[2][2].getSymbol() === symbolDrawn) ||
				(board[0][2].getSymbol() === symbolDrawn &&
					board[2][0].getSymbol() === symbolDrawn)
			)
				return true;
		}
		return false;
	};

	const isFieldOccupied = (row, column) =>
		Boolean(Gameboard.getBoard()[row][column].getSymbol());
	// renderGameboard.boardRender();
	renderGameboardVisual.boardRenderVisual();
	renderGameboard.playerTurnRender(getPlayerInfo());

	const playRound = (row, column) => {
		if (!gameFinished) {
			if (
				row >= 0 &&
				row < Gameboard.getBoardsize() &&
				column >= 0 &&
				column < Gameboard.getBoardsize() &&
				!isFieldOccupied(row, column)
			) {
				Gameboard.getBoard()[row][column].setSymbol(
					getPlayerInfo().symbol
				);
				if (!isGameWon() && !isATie()) switchPlayer();
			}
			// renderGameboard.boardRender();
			renderGameboardVisual.boardRenderVisual();
			if (!isGameWon() && !isATie())
				renderGameboard.playerTurnRender(getPlayerInfo());
			else if (isGameWon() || isATie()) {
				gameFinished = true;
				if (isGameWon()) {
					renderGameboard.winRender(getPlayerInfo());
				} else if (isATie()) {
					renderGameboard.tieRender();
				}
			}
		}
	};

	const switchPlayer = () => {
		playingPlayer = playingPlayer === 1 ? 2 : 1;
	};

	const resetGame = () => {
		Gameboard.createBoard();
		gameFinished = false;
		playingPlayer = 1;
		// renderGameboard.boardRender();
		renderGameboardVisual.boardRenderVisual();
		renderGameboard.playerTurnRender(getPlayerInfo());
	};

	const bindCells = () => {
		const gameboardEl = document.querySelector(".gameboard");
		gameboardEl.addEventListener("click", (e) => {
			if (e.target.classList.contains("cell"))
				playRound(
					...e.target.getAttribute("data-position").split("")
				);
		});
	};

	const bindReset = () => {
		const resetButton = document.querySelector(".new-game");
		resetButton.addEventListener("click", resetGame);
	};

	bindCells();
	bindReset();

	return { playRound, resetGame, isGameWon };
})();
