const converter = () => {
    let wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "A Dam Title",
      Subject: "A Subject",
      Author: "Saikat Dey",
      CreatedDate: new Date(),
    };
    wb.SheetNames.push("Faculties");

    const ws_data = [["hello", "world"]];
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    wb.Sheets["Faculties"] = ws;

    const wb_export = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    }

    saveAs(new Blob([s2ab(wb_export)], { type: "application/octet-stream" }), "faculties.xlsx");
  };