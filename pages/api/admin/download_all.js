import { getMongoClient } from "../../../lib/db";
import * as ExcelJS from "exceljs";
import contentDisposition from "content-disposition";
import { Readable } from "stream";

import { MASTER_SCHEMA, sidebarOptions } from "../../../data/schema";
import { isEmptyObject } from "../../../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../../../data/types/types";
import Cell from "../../../lib/Cell";

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

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  if (req.method !== "GET") {
    console.error("Other than get method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const collectionData = await usersCollection.find().toArray();

  connection.close();

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

  const setupProfileSheet = async () => {
    const worksheet = workbook.addWorksheet("Profiles");

    const setupHeaders = () => {
      let ws_columns_hot = [
        { header: "ID's", key: "id", width: collectionData[0]["employeeID"].length + 3 },
        {
          header: "Profile",
          key: "profile",
          width: getColumnWidth(MASTER_SCHEMA["profile"][0].view_width),
        },
      ];
      for (let i = 1; i < MASTER_SCHEMA["profile"].length; ++i) {
        ws_columns_hot.push({
          width: getColumnWidth(MASTER_SCHEMA["profile"][i].view_width),
        });
      }
      worksheet.columns = ws_columns_hot;
      worksheet.mergeCells("A1:A2");

      const mergeUptoCell = new Cell("B", 1);
      mergeUptoCell.column += MASTER_SCHEMA["profile"].length - 1;
      worksheet.mergeCells(`B1:${mergeUptoCell.getString()}`);

      worksheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
      worksheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };

      const iter_cell = new Cell("B", 2);
      MASTER_SCHEMA["profile"].forEach((field, index) => {
        const cell = worksheet.getCell(iter_cell.getString());
        iter_cell.column += 1;
        cell.value = field.label;
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    };

    const setupDataRows = () => {
      const employeeID_cell = new Cell("A", 3); //A3
      for (let userNo = 0; userNo < collectionData.length; ++userNo) {
        worksheet.getCell(employeeID_cell.getString()).value = collectionData[userNo]["employeeID"];

        const employeeField_cell = new Cell("B", 3 + userNo);
        MASTER_SCHEMA["profile"].forEach((field, index) => {
          const cell = worksheet.getCell(employeeField_cell.getString());
          employeeField_cell.column += 1;
          const value = collectionData[userNo]["profile"][field.db_field];
          cell.value = !!value ? value : null;
        });

        employeeID_cell.row += 1;
      }
    };

    setupHeaders();
    setupDataRows();
  };

  const setupAchievementSheets = async () => {
    sidebarOptions.forEach((menu_item) => {
      const display_name = menu_item.menuDisplay;
      const achievement_key = menu_item.urlSuffix;

      if (achievement_key === "profile") return;

      const worksheet = workbook.addWorksheet(display_name);
      const rowHeight = 30;

      const setupHeaders = () => {
        let ws_columns_hot = [
          { header: "ID's", key: "id", width: 12 },
          {
            header: display_name,
            key: achievement_key,
            width: getColumnWidth(MASTER_SCHEMA[achievement_key]["fields"][0].view_width),
          },
        ];

        for (let i = 1; i < MASTER_SCHEMA[achievement_key]["fields"].length; ++i) {
          ws_columns_hot.push({
            width: getColumnWidth(MASTER_SCHEMA[achievement_key]["fields"][i].view_width),
          });
        }
        worksheet.columns = ws_columns_hot;

        const mergeUptoCell = new Cell("B", 1);
        mergeUptoCell.column += MASTER_SCHEMA[achievement_key]["fields"].length - 1;

        worksheet.mergeCells(`B1:${mergeUptoCell.getString()}`);
        worksheet.mergeCells("A1:A2");

        worksheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
        worksheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };

        const iter_cell = new Cell("B", 2);
        MASTER_SCHEMA[achievement_key]["fields"].forEach((field, index) => {
          const cell = worksheet.getCell(iter_cell.getString());
          iter_cell.column += 1;
          cell.value = field.label;
          cell.alignment = { horizontal: "center", vertical: "middle" };
        });
      };

      const setupDataRows = () => {
        const employeeID_iter_cell = new Cell("A", 3); //A3
        let rowsConsumedByPrevUsers = 0;
        let rowsConsumedByAllUsers = 0;

        for (let userNo = 0; userNo < collectionData.length; ++userNo) {
          const employeeID_cell = worksheet.getCell(employeeID_iter_cell.getString());
          employeeID_cell.value = collectionData[userNo]["employeeID"];
          employeeID_cell.alignment = { horizontal: "center", vertical: "middle" };
          worksheet.mergeCells(
            `A${3 + rowsConsumedByPrevUsers}:A${
              3 + rowsConsumedByPrevUsers + collectionData[userNo][achievement_key].length - 1
            }`
          );

          for (let pubNo = 0; pubNo < collectionData[userNo][achievement_key].length; ++pubNo) {
            let colStart = "B";
            MASTER_SCHEMA[achievement_key]["fields"].forEach((field, index) => {
              const colCode = colStart.charCodeAt(0) + index;
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
            });
          }

          rowsConsumedByPrevUsers = collectionData[userNo][achievement_key].length;
          rowsConsumedByAllUsers += rowsConsumedByPrevUsers;
          employeeID_iter_cell.row += rowsConsumedByPrevUsers;
        }

        for (let currentRow = 3; currentRow < 3 + rowsConsumedByAllUsers; ++currentRow) {
          worksheet.getRow(currentRow).height = rowHeight;
        }
      };

      setupHeaders();
      setupDataRows();
    });
  };

  const streamFile = async () => {
    let buffer = null;
    await workbook.xlsx.writeBuffer().then((data) => {
      buffer = data;
    });

    res.status(200);
    res.setHeader("Content-Length", buffer.byteLength);
    res.setHeader(
      "Content-Disposition",
      contentDisposition("TestFile.xlsx", {
        type: "inline",
      })
    );
    res.setHeader("Content-Encoding", "7bit");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Accept-Ranges", "bytes");
    const readStream = new Readable();
    readStream._read = () => {};
    readStream.push(buffer);
    readStream.push(null);

    await new Promise(function (resolve) {
      readStream.pipe(res);
      readStream.on("end", resolve);
    });
  };
  await setupProfileSheet();
  await setupAchievementSheets();
  await streamFile();
}
