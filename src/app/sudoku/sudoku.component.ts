import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {
  @Input()
  gameSolved = false;

  constructor() {
  }
  @Input() initial: string[][] = [
    [' ', ' ', ' ', ' ', ' ', ' ', '4', ' ', '2'],
    [' ', ' ', ' ', ' ', '1', ' ', ' ', '7', '8'],
    ['7', '5', '4', '8', ' ', ' ', ' ', '1', '3'],
    [' ', '2', '1', '6', '5', ' ', ' ', '3', ' '],
    [' ', '3', ' ', '2', ' ', '8', ' ', '4', ' '],
    [' ', '6', ' ', ' ', '4', '3', '7', '2', ' '],
    ['8', '1', ' ', ' ', ' ', '2', '3', '6', '4'],
    ['2', '4', ' ', ' ', '6', ' ', ' ', ' ', ' '],
    ['6', ' ', '9', ' ', ' ', ' ', ' ', ' ', ' ']
  ];
  @Input() userProvided: string[][] = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ];

  onKey(rowIndex, colIndex, value) {
    this.userProvided[rowIndex][colIndex] = value;
  }


  // Returns value at given column / row
  valueAt(rowIndex, colIndex): string {
    if (this.initial[rowIndex][colIndex] === ' ') {
      return this.userProvided[rowIndex][colIndex];
    } else {
      return this.initial[rowIndex][colIndex];
    }
  }

  // Checks if array has integers 1 to 9
  testNumbers(array: string[]): boolean {
    for (let i = 1; i <= 9; i++) {
      if (array.indexOf(String(i)) === -1) {
        return false;
      }
    }
    return true;
  }

  checkSolution() {
    const sudoku = Array(9).fill(undefined).map((_, rowIndex) => {
      return Array(9).fill(undefined).map((_, colIndex) => {
        return this.valueAt(rowIndex, colIndex);
      });
    });

    this.gameSolved = true;
    for (let i = 0; i < 9; i++) {
      if (!this.testNumbers(this.row(i))) {
        this.gameSolved = false;
      }
      if (!this.testNumbers(this.column(i))) {
        this.gameSolved = false;
      }
    }
    for (let j = 0; j < 3; j++ ) {
      for (let k = 0; k < 3; k++) {
        if (!this.testNumbers(this.box(j, k))) {
          this.gameSolved = false;
        }
      }
    }
  }

  row(rowIndex) {
    const row = [];
    for (let i = 0; i < 9; i++) {
        row.push(this.valueAt(rowIndex, i));
      }
    return row;
  }

  column(columnIndex) {
    const column = [];
    for (let i = 0; i < 9; i++) {
        column.push(this.valueAt(i, columnIndex));
    }
    return column;
  }

  box(boxRowIndex, boxColIndex) {
    const box = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        box.push(this.valueAt(boxRowIndex * 3 + i, boxColIndex * 3 + j));
      }
    }
    return box;
  }
}
