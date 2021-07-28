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

    worksheet.columns = [
      { header: "ID's", key: "id", width: 12 },
      { header: "Profile", key: "profile", width: 20 },
    ];

    worksheet.mergeCells("B1:Y1");
    worksheet.mergeCells("A1:A2");

    worksheet.getCell("A1").alignment = { horizontal: "center" };
    worksheet.getCell("B1").alignment = { horizontal: "center" };

    const rowStart = 3;
    schema["Profile"].forEach((item, index) => {
      worksheet.getCell(`B${rowStart + index}`).value = item.excel_field_name;
      console.log(rowStart + index);
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
