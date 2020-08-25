# SudokuSolver
A beautiful sudoku-solver website built with JS, HTML, CSS.
https://hungleba.github.io/SudokuSolver/
![demo_solved](https://user-images.githubusercontent.com/51266998/91127354-eadcb780-e65a-11ea-9161-5163247176cc.png)

# Tech-stack
- jQuery
- Bootstrap

# Algorithm
Recursive BackTracking Algorithm:

The algorithm will go over all cells in a row from left to right. It then try to insert a number from 1 to 9, if any number matches the sudoku's rule (no repetitive number in row, column, and box) then it will insert that number into the cell and move on to the next empty cell. On the other hand, if there is no matched number, it returns to the previous cell to find another number.
![row](https://user-images.githubusercontent.com/51266998/91126414-c2ec5480-e658-11ea-8cad-560049308153.png)
When finishing a row, the program moves on to the next row and repeat until it reaches beyond the last grid's row.
![sudoku_board](https://user-images.githubusercontent.com/51266998/91126553-18c0fc80-e659-11ea-9148-a693b934066d.JPG)
However, in some cases when the input sudoku is invalid (not a sudoku puzzle), then it will notify the user that the input sudoku is unsolvable. In this case, the user can either modify numbers or reset to a new sudoku board.

# Feature
The board will show vague colored row, column, and box which indicates it is currently checking whether input value is valid or not.
The program allow valid input only. In case of invalid value, the cell contains repetitive value will blinks red twice to notify the user. The user can either modify that cell's value or try again with another valid input value.
![error](https://user-images.githubusercontent.com/51266998/91127267-c1bc2700-e65a-11ea-921f-fb81d3a2078b.jpg)
