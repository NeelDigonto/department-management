import * as ExcelJS from "exceljs";

import { ACHIEVEMENTS_GROUP_SCHEMA, MASTER_SCHEMA, sidebarOptions } from "../data/schema";
import { isEmptyObject } from "../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../data/types/types";
import Cell from "../lib/Cell";

const getColumnWidth = (view_width) => {
  switch (view_width) {
    case WIDTH_TYPE.SMALL:
      return 20;
    case WIDTH_TYPE.MEDIUM:
      return 30;
    case WIDTH_TYPE.LARGE:
      return 40;
    default:
      return 20;
  }
};
const rowHeight = 40;

function getWorkBook(collectionData, display) {
  let displayObject = {};
  for (let [key, value] of Object.entries(display)) {
    const split_key = key.split(".");
    if (!displayObject[split_key[0]]) displayObject[split_key[0]] = {};
    displayObject[split_key[0]][split_key[1]] = true;
  }

  const getStandardWorkBook = () => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Saikat Dey";
    workbook.lastModifiedBy = "Nobody";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    workbook.calcProperties.fullCalcOnLoad = true;
    return workbook;
  };

  const workbook = getStandardWorkBook();

  for (let [achievement_key, value] of Object.entries(ACHIEVEMENTS_GROUP_SCHEMA)) {
    if (!!displayObject[achievement_key]) {
      const worksheet = workbook.addWorksheet(achievement_key);
      worksheet.properties.defaultRowHeight = rowHeight;
      worksheet.properties.tabColor = { argb: "FFFFB703" };

      const setupHeaders = () => {
        let ws_columns_hot = [];

        let mergeEnd_cell = new Cell("A:1");
        let mergeStart_cell = new Cell("B:1");
        const iter_cell = new Cell("B", 2);

        const setupProfileHeaders = () => {
          // setup profile top header
          ws_columns_hot.push({
            header: "Profile",
            key: "profile",
            width: 15,
          });

          // setup profile header field column widths
          MASTER_SCHEMA["profile"].forEach((field, index) => {
            if (!!displayObject["profile"] && displayObject["profile"][field.db_field])
              ws_columns_hot.push({
                width: getColumnWidth(field.view_width),
              });
          });

          //Employee Id cell
          const employeeID_header = worksheet.getCell("A2");
          employeeID_header.value = "ID's";
          employeeID_header.alignment = { horizontal: "center", vertical: "middle" };

          // setup profile header fields
          MASTER_SCHEMA["profile"].forEach((field, index) => {
            if (!!displayObject["profile"][field.db_field]) {
              const cell = worksheet.getCell(iter_cell.getString());
              cell.value = field.label;
              cell.alignment = { horizontal: "center", vertical: "middle" };

              iter_cell.column += 1;
            }
          });

          // merge profile header cells
          worksheet.mergeCells(
            `A1:${new Cell(Cell.convertColumnToNumber("A") + iter_cell.column - 2, 1).getString()}`
          );
          worksheet.getCell("A:1").alignment = { horizontal: "center", vertical: "middle" };
        };

        const setupAchievementHeaders = () => {
          //Achievements
          mergeStart_cell = new Cell(iter_cell.column, 1);

          // Achievement header name setup
          ws_columns_hot.push({
            header: value.diplay_name,
            key: achievement_key,
            width: getColumnWidth(
              ACHIEVEMENTS_GROUP_SCHEMA[achievement_key]["fields"][0].view_width
            ),
          });

          // Achievement header field column widths setup
          ACHIEVEMENTS_GROUP_SCHEMA[achievement_key]["fields"].forEach((field, index) => {
            if (index !== 0) {
              if (
                !!displayObject[achievement_key] &&
                displayObject[achievement_key][field.db_field]
              )
                ws_columns_hot.push({
                  width: getColumnWidth(field.view_width),
                });
            }
          });

          // Achievement fields header setup
          ACHIEVEMENTS_GROUP_SCHEMA[achievement_key]["fields"].forEach((field, index) => {
            if (!!displayObject[achievement_key][field.db_field]) {
              const cell = worksheet.getCell(iter_cell.getString());
              cell.value = field.label;
              cell.alignment = { horizontal: "center", vertical: "middle" };

              iter_cell.column += 1;
            }
          });

          // Merging achievemnt header name cells
          mergeEnd_cell = new Cell(iter_cell.column - 1, 1);
          worksheet.mergeCells(`${mergeStart_cell.getString()}:${mergeEnd_cell.getString()}`);
          worksheet.getCell(mergeStart_cell.getString()).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
        };

        setupProfileHeaders();
        setupAchievementHeaders();

        worksheet.columns = ws_columns_hot;
      };

      const setupRows = () => {
        const setupProfileRows = () => {
          let rowToWrite = 3;
          const employeeID_cell = new Cell("A", 3); //A3

          collectionData.forEach((elem, userNo) => {
            //write employeeID
            worksheet.getCell(employeeID_cell.getString()).value =
              collectionData[userNo]["employeeID"];
            worksheet.getCell(employeeID_cell.getString()).alignment = {
              horizontal: "center",
              vertical: "middle",
            };

            //write profile field datas
            const employeeField_cell = new Cell("B", rowToWrite);
            MASTER_SCHEMA["profile"].forEach((field, index) => {
              if (!!displayObject["profile"][field.db_field]) {
                const cell = worksheet.getCell(employeeField_cell.getString());
                employeeField_cell.column += 1;
                const value = collectionData[userNo]["profile"][field.db_field];
                cell.value = !!value ? value : null;
                cell.alignment = { horizontal: "center", vertical: "middle" };
              }
            });

            //merge cells
            for (
              let column_no = 1;
              column_no <= 1 + Object.keys(displayObject["profile"]).length;
              ++column_no
            ) {
              const mergeStart_cell = new Cell(column_no, rowToWrite);
              const mergeEnd_cell = new Cell(
                column_no,
                rowToWrite + Object.keys(collectionData[userNo][achievement_key]).length - 1
              );

              console.log(`${mergeStart_cell.getString()}:${mergeEnd_cell.getString()}`);
              worksheet.mergeCells(`${mergeStart_cell.getString()}:${mergeEnd_cell.getString()}`);
            }

            //increment counters
            employeeID_cell.row += Object.keys(collectionData[userNo][achievement_key]).length;
            rowToWrite += Object.keys(collectionData[userNo][achievement_key]).length;
          });
        };

        const setupAchievementRows = () => {
          let rowsConsumedByPrevUsers = 0;
          let rowsConsumedByAllUsers = 0;

          for (let userNo = 0; userNo < collectionData.length; ++userNo) {
            for (let pubNo = 0; pubNo < collectionData[userNo][achievement_key].length; ++pubNo) {
              let fieldNo = 0;
              MASTER_SCHEMA[achievement_key]["fields"].forEach((field) => {
                if (!!displayObject[achievement_key][field.db_field]) {
                  const colCode =
                    "A".charCodeAt(0) +
                    1 +
                    Object.keys(displayObject["profile"]).length +
                    fieldNo++;
                  const colId = String.fromCharCode(colCode);
                  const cell = worksheet.getCell(`${colId}${3 + rowsConsumedByPrevUsers + pubNo}`);
                  const value = collectionData[userNo][achievement_key][pubNo][field.db_field];
                  if (field.input_type !== "file") {
                    cell.value = !!value ? value : null;
                  } else {
                    if (isEmptyObject(value)) {
                      cell.value = "No File Uploaded";
                    } else {
                      cell.value = {
                        //put an env variable for this
                        text: value.fname,
                        hyperlink: "https://faculty-book.vercel.app/api/file/get/" + value.fuid,
                        tooltip: "https://faculty-book.vercel.app/api/file/get/" + value.fuid,
                      };
                    }
                  }
                  cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
                }
              });
            }

            rowsConsumedByPrevUsers = collectionData[userNo][achievement_key].length;
            rowsConsumedByAllUsers += rowsConsumedByPrevUsers;
          }

          for (let currentRow = 3; currentRow < 3 + rowsConsumedByAllUsers; ++currentRow) {
            worksheet.getRow(currentRow).height = rowHeight;
          }
        };

        setupProfileRows();
        setupAchievementRows();
      };

      setupHeaders();
      setupRows();
    }
  }
  return workbook;
}

export { getWorkBook };
