function TypeOf(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

class Cell {
  row: number;
  column: number;

  static convertColumnToNumber(column_str: string) {
    if (column_str.length === 1) {
      return column_str.charCodeAt(0) - 65 + 1; //starts from 1
    } else if (
      column_str.length === 2 &&
      column_str.charCodeAt(0) === "A".charCodeAt(0)
    ) {
      return column_str.charCodeAt(1) - 65 + 1 + 26; //starts from 1
    } else {
      return undefined;
    }
  }
  static convertNumberToColumn(column_num: number) {
    if (column_num >= 1 && column_num <= 26) {
      return String.fromCharCode(column_num - 1 + 65); //starts from 1
    } else if (column_num >= 27 && column_num <= 52) {
      return "A" + String.fromCharCode(column_num - 26 - 1 + 65); //starts from 1
    } else {
      return undefined;
    }
  }

  constructor(_column: string | number, _row: number) {
    this.row = _row;
    this.column =
      TypeOf(_column) === "number"
        ? (_column as number)
        : TypeOf(_column) === "string"
        ? Cell.convertColumnToNumber(_column as string)
        : undefined;
  }
  toString(): string {
    return `${Cell.convertNumberToColumn(Number(this.column))}${this.row}`;
  }
}

export default Cell;
