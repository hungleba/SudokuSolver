/*
	Authour: Hung Le Ba
	email: hungleba@email.arizona.edu
*/
function Board() {
	this.grid = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	];
}
Board();

function  createBoard() {
	let board = document.getElementById("grid");
	let header = board.createTHead();
	for (let row = 0; row < 9; row++) {
		let rowDOM = header.insertRow(row);
		for (let col = 0; col < 9; col++) {
			let cell = rowDOM.insertCell(col);
			cell.id = `cell-${row}-${col}`;
			cell.innerHTML = "";
			cell.setAttribute('contentEditable', 'true');
		}
	}
	validInput();
}
createBoard();

function validInput() {
	// Prevent invalid input
	$('[contenteditable="true"]').keypress(function(e) {
		var x = event.charCode || event.keyCode;
		if (isNaN(String.fromCharCode(e.which)) && x!=46 || x===32 || x===13) {
			e.preventDefault();
		}
	});
	$('[contenteditable="true"]').keydown(function(e) {
		if($(this).text().length === 1 && event.keyCode != 8) { 
			event.preventDefault();
		}
		let cellID = $(this).attr('id');
		let input = parseInt(e.key);
		// Implement check row, col, and square grid
		if (!isValidRowInput(input, cellID) || !isValidColInput(input, cellID) || !isValidSquareInput(input, cellID)){
			event.preventDefault();
		}
	});
	$('[contenteditable="true"]').bind("paste", function(e) {
		event.preventDefault();
	});

	// High light row, column, and square grid
	$("td").focusin(function() {
		$(this).css("background-color", "#DCDCDC");
		let cellID = $(this).attr('id');
		let cellRow = parseInt(cellID[5]);
		let cellCol = parseInt(cellID[7]);
		let rowStart = cellRow - cellRow % 3;
		let rowEnd = rowStart + 3;
		let colStart = cellCol - cellCol % 3;
		let colEnd = colStart + 3;
		for (let i = 0; i < 9; i++) {
			if (i != cellRow) {
				let newCellID = `cell-${i}-${cellCol}`;
				let newCellElement = document.getElementById(newCellID);
				newCellElement.style.backgroundColor = "#F0F0F0";
			}
			if (i != cellCol) {
				let newCellID = `cell-${cellRow}-${i}`;
				let newCellElement = document.getElementById(newCellID);
				newCellElement.style.backgroundColor = "#F0F0F0";
			}
		}
		for (let x = rowStart; x < rowEnd; x++) {
			for (let y = colStart; y < colEnd; y++) {
				let cellBox = document.getElementById(`cell-${x}-${y}`);
				cellBox.style.backgroundColor = "#F0F0F0";
			}
		}
	})
	$("td").focusout(function() {
		for (let x = 0; x < 9; x++) {
			for (let y = 0; y < 9; y++) {
				let cellBox = document.getElementById(`cell-${x}-${y}`);
				cellBox.style.backgroundColor = "white";
				cellBox.classList.remove("blink_me");
			}
		}
	})
}

function isValidSquareInput(input, cellID) {
	let cellRow = parseInt(cellID[5]);
	let cellCol = parseInt(cellID[7]);
	let rowStart = cellRow - cellRow % 3;
	let rowEnd = rowStart + 3;
	let colStart = cellCol - cellCol % 3;
	let colEnd = colStart + 3;
	for (let x = rowStart; x < rowEnd; x++) {
		for (let y = colStart; y < colEnd; y++) {
			let cellToCheck = document.getElementById(`cell-${x}-${y}`);
			if (cellToCheck.textContent != "" && parseInt(cellToCheck.textContent) == input) {
				cellToCheck.className = "blink_me";
				return false;
			}
		}
	}
	return true;
}

function isValidColInput(input, cellID) {
	let cellRow = parseInt(cellID[5]);
	let cellCol = parseInt(cellID[7]);
	for (let row = 0; row < 9; row++) {
		if (row != cellRow) {
			let cellToCheck = document.getElementById(`cell-${row}-${cellCol}`);
			if (cellToCheck.textContent != "" && parseInt(cellToCheck.textContent) == input) {
				cellToCheck.className = "blink_me";
				return false;
			}
		}
	}
	return true;
}

function isValidRowInput(input, cellID) {
	let cellRow = parseInt(cellID[5]);
	let cellCol = parseInt(cellID[7]);
	for (let col = 0; col < 9; col++) {
		if (col != cellCol) {
			let cellToCheck = document.getElementById(`cell-${cellRow}-${col}`);
			if (cellToCheck.textContent != "" && parseInt(cellToCheck.textContent) == input) {
				cellToCheck.className = "blink_me";
				return false;
			}
		}
	}
	return true;
}

function isValidMoveInput(input, cellID) {
	if (isValidRowInput(input, cellID) && isValidColInput(input, cellID) && isValidSquareInput(input, cellID)) {
		return true;
	}
	return false;
}

function updateBoard() {
	let table = document.getElementById("grid");
	for (row = 0; row < 9; row++) {
		for (col = 0; col < 9; col++) {
			let val = table.rows[row].cells[col].innerText;
			if (val === "") {
				this.grid[row][col] = 0
			} else if (!isNaN(parseInt(val))) {
				this.grid[row][col] = parseInt(val);
			}
		}
	}
}

function findNextEmpty() {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (grid[i][j] === 0) {
				return [i, j];
			}
		}
	}
	return null;
}

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Implementing recursive backtracking algorithm
function solve() {
	return solveHelper(0,0);
}

function solveHelper(row, col) {
	// Base case
	if (row+1 > 9) {
		return true;
	} else if (col+1 > 9) {
		return solveHelper(row+1, 0);
	} else {
		if (grid[row][col] != 0) {
			return solveHelper(row, col+1);
		} else {
			// Choose
			for (let n = 1; n <= 9; n++) {
				grid[row][col] = n;
				renderCell(`cell-${row}-${col}`, n);
				if (isValidMove(row, col)) {
					if (solveHelper(row, col+1) == true) {
						return true;
					}
				}
				// Unchoose
				grid[row][col] = 0;
				renderCell(`cell-${row}-${col}`, '');
			}
			return false;
		}
	}
}

function isValidMove(row, col) {
	if (isValidRow(row, col) && isValidCol(row, col) && isValidSquare(row, col)) {
		return true;
	}
	return false;
}

function isValidRow(row, col) {
	let checkVal = grid[row][col];
	for (let cellCol = 0; cellCol < 9; cellCol++) {
		if (cellCol != col && grid[row][cellCol] === checkVal) {
			return false;
		}
	}
	return true;
}

function isValidCol(row, col) {
	let checkVal = grid[row][col];
	for (let cellRow = 0; cellRow < 9; cellRow++) {
		if (cellRow != row && grid[cellRow][col] === checkVal) {
			return false;
		}
	}
	return true;
}

function isValidSquare(cellRow, cellCol) {
	let checkVal = grid[cellRow][cellCol];
	let rowStart = cellRow - cellRow % 3;
	let rowEnd = rowStart + 3;
	let colStart = cellCol - cellCol % 3;
	let colEnd = colStart + 3;
	for (let x = rowStart; x < rowEnd; x++) {
		for (let y = colStart; y < colEnd; y++) {
			if ((x != cellRow || y != cellCol) && grid[x][y] === checkVal) {
				return false;
			}
		}
	}
	return true;

}

function clearBoard() {
	this.grid = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
	];
	for (let x = 0; x < 9; x++) {
		for (let y = 0; y < 9; y++) {
			document.getElementById(`cell-${x}-${y}`).innerHTML = '';
		}
	}
	document.getElementById('solvingStatus').innerHTML = '';
}

function renderCell(cellID, value) {
	let cellBox = document.getElementById(cellID);
	cellBox.innerHTML = parseInt(value);
}

document.getElementById("clearBtn").onclick = () => {
	clearBoard();
}

document.getElementById("solveBtn").onclick = () => {
	updateBoard();
	let status = document.getElementById("solvingStatus");
	if (solve()) {
		status.innerHTML = 'Solved! <i class="em em-smiley_cat" \
		aria-role="presentation" aria-label="SMILING CAT FACE WITH OPEN MOUTH"> </i>';
		status.style.color = "green";
	} else {
		status.innerHTML = 'Unsolvable, please try again \
		<i class="em em-anguished" aria-role="presentation" aria-label="ANGUISHED FACE"></i>'
		status.style.color = "red";
	}
}
