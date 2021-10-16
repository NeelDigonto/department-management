import csvParser from "csv-parser";
import fs from "fs";

export default async function handler(req, res) {
  const csv_data = [];

  await new Promise((resolve, reject) => {
    const parser = csvParser()
      .on("data", (data) => {
        csv_data.push(data);
      })
      .on("end", () => {
        let collectionData = [];
        /* const achievements = {};
        achievements["webinar-attended"] = [];
        achievements["seminar-attended"] = []; */

        csv_data.forEach((row, index) => {
          const speaker_details = row["speaker_details"];
          let speaker_name, speaker_designation, speaker_org, coverage;
          let event_start_date = row["event_from"];
          let event_end_date = row["event_to"];

          const sanitizeData = () => {
            const first_delimiter = speaker_details.indexOf(",");
            const last_delimiter = speaker_details.lastIndexOf(",");

            if (first_delimiter === -1) {
              speaker_name = row["speaker_details"];
              speaker_designation = "";
              speaker_org = "";
            } else if (first_delimiter === last_delimiter) {
              speaker_name = row["speaker_details"].substring(
                0,
                first_delimiter
              );
              speaker_designation = "";
              speaker_org = row["speaker_details"].substring(
                first_delimiter + 1
              );
              if (speaker_org[0] === " ")
                speaker_org = speaker_org.substring(1);
            } else {
              speaker_name = row["speaker_details"].substring(
                0,
                first_delimiter
              );
              speaker_designation = row["speaker_details"].substring(
                first_delimiter + 1,
                last_delimiter
              );
              if (speaker_designation[0] === " ")
                speaker_designation = speaker_designation.substring(1);
              speaker_org = row["speaker_details"].substring(
                last_delimiter + 1
              );
              if (speaker_org[0] === " ")
                speaker_org = speaker_org.substring(1);
            }

            if (row["coverage"] === "National") {
              coverage = "National";
            } else if (row["coverage"] === "International") {
              coverage = "International";
            }

            //const event_start_date = new Date(row["event_from"]).toISOString();
            //const event_end_date = new Date(row["event_to"]).toISOString();

            if (event_start_date.toLowerCase().includes("na")) {
              console.error(`na passed as start date`);
              throw `na passed as date`;
            }

            if (event_end_date.toLowerCase().includes("na")) {
              event_end_date = event_start_date;
            }

            const getDate = (rawString) => {
              let delimiter = "";
              if (rawString.includes(",")) {
                delimiter = ",";
              } else if (rawString.includes("-")) {
                delimiter = "-";
              } else if (rawString.includes("/")) {
                delimiter = "/";
              } else if (rawString.includes(".")) {
                delimiter = ".";
              }

              const split_val = rawString.split(delimiter);

              const year =
                split_val[2].length === 2 ? `20${split_val[2]}` : split_val[2];
              const month = split_val[1];
              const day = split_val[0];

              const date = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
              );

              return date;
            };

            event_start_date = getDate(event_start_date).toISOString();
            event_end_date = getDate(event_end_date).toISOString();
          };

          sanitizeData();

          if (
            collectionData.find(
              (user) => user.employeeID === row["faculty_name"]
            ) === undefined
          ) {
            collectionData.push({
              employeeID: row["faculty_name"],
              profile: { name: row["faculty_name"] },
              "seminar-attended": [],
              "webinar-attended": [],
            });
          }

          if (row["type"] === "Seminar") {
            collectionData
              .find((user) => user.employeeID === row["faculty_name"])
              ["seminar-attended"].push({
                title: row["title"],
                event_start_date,
                event_end_date,
                speaker_name,
                speaker_designation,
                speaker_org,
                org_inst: "",
                nat_inter_imp: coverage,
                participants: 100,
                proof: { isLink: true, flink: row["proof"] },
              });
          } else if (row["type"] === "Webinar") {
            collectionData
              .find((user) => user.employeeID === row["faculty_name"])
              ["webinar-attended"].push({
                title: row["title"],
                event_start_date,
                event_end_date,
                speaker_name,
                speaker_designation,
                speaker_org,
                org_inst: "",
                nat_inter_imp: coverage,
                participants: 100,
                proof: { isLink: true, flink: row["proof"] },
              });
          }
        });

        res.status(201).json(collectionData);
        resolve();
      });

    fs.createReadStream(process.cwd() + "/file1.csv").pipe(parser);
  });
}
