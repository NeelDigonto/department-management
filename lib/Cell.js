function TypeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

class Cell {
  static convertColumnToNumber(column_str) {
    if (column_str.length === 1) {
      return column_str.charCodeAt(0) - 65 + 1; //starts from 1
    } else if (column_str.length === 2 && column_str.charCodeAt(0) === "A") {
      return column_str.charCodeAt(1) - 65 + 1 + 26; //starts from 1
    } else {
      return undefined;
    }
  }
  static convertNumberToColumn(column_num) {
    if (column_num >= 1 && column_num <= 26) {
      return String.fromCharCode(column_num - 1 + 65); //starts from 1
    } else if (column_num >= 27 && column_num <= 52) {
      return "A" + String.fromCharCode(column_num - 26 - 1 + 65); //starts from 1
    } else {
      return undefined;
    }
  }

  constructor(_column, _row) {
    this.row = TypeOf(_row) === "number" ? _row : undefined;
    this.column =
      TypeOf(_column) === "number"
        ? _column
        : TypeOf(_column) === "string"
        ? Cell.convertColumnToNumber(_column)
        : undefined;
  }
  getString() {
    return `${Cell.convertNumberToColumn(this.column)}${this.row}`;
  }
}

export default Cell;
