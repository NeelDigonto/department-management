import csvParser from "csv-parser";
import fs from "fs";

export default async function handler(req, res) {
  const results = [];

  await new Promise((resolve, reject) => {
    const parser = csvParser()
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        const obj = {};
        results.forEach((row) => {
          /*  if (!!obj[row["faculty_name"]]) obj[row["faculty_name"]]++;
          else obj[row["faculty_name"]] = 1; */
          if (!!obj[row["proof"]]) obj[row["proof"]]++;
          else obj[row["proof"]] = 1;
        });
        //console.log(obj);

        res.status(201).json(obj);
        resolve();
      });

    fs.createReadStream(process.cwd() + "/file1.csv").pipe(parser);
  });
}
