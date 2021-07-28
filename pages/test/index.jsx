import React, { Fragment, useState, useEffect, useRef } from "react";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { schema } from "../../data/schema";

const AdminGetData = () => {
  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    fetch("/api/admin/getUserCollection")
      .then((response) => response.json())
      .then((result) => {
        setCollectionData(result);
      });
  }, []);

  const converter = async () => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Saikat Dey";
    workbook.lastModifiedBy = "Nobody";
    workbook.created = new Date(2015, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    workbook.calcProperties.fullCalcOnLoad = true;

    const worksheet = workbook.addWorksheet("My Sheet");

    let ws_columns_hot = [
      { header: "ID's", key: "id", width: 12 },
      { header: "Profile", key: "profile", width: schema["Profile"][0].excel_col_width },
      { header: "", key: "", width: 30 },
    ];

    for (let i = 1; i < schema["Profile"].length; ++i) {
      ws_columns_hot.push({
        /*         header: "",
        key: `${i}`, */
        width: schema["Profile"][i].excel_col_width,
      });
    }

    worksheet.columns = ws_columns_hot;

    worksheet.mergeCells("B1:Y1");
    worksheet.mergeCells("A1:A2");

    worksheet.getCell("A1").alignment = { horizontal: "center" };
    worksheet.getCell("B1").alignment = { horizontal: "center" };

    let colStart = "B";
    schema["Profile"].forEach((item, index) => {
      const colCode = colStart.charCodeAt(0) + index;
      const colId = String.fromCharCode(colCode);
      const cell = worksheet.getCell(`${colId}2`);
      cell.value = item.excel_field_name;
    });

    worksheet.getCell("A3").value = collectionData[1]["employeeID"];

    colStart = "B";
    schema["Profile"].forEach((item, index) => {
      const colCode = colStart.charCodeAt(0) + index;
      const colId = String.fromCharCode(colCode);
      const cell = worksheet.getCell(`${colId}3`);
      cell.value = collectionData[1]["Profile"][item.db_field];
    });

    /*     worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
    worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) }); */

    await workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "application/octet-stream" });
      saveAs(blob, "faculties.xlsx");
    });
  };

  return (
    <Fragment>
      <button
        style={{ margin: "20rem", padding: "2rem" }}
        disabled={!collectionData}
        onClick={converter}
      >
        Download Excel Sheet
      </button>
    </Fragment>
  );
};

export default AdminGetData;
