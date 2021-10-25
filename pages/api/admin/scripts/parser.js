import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

import { ACHIEVEMENTS } from "../../../../src/data/schema.js";

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

  const year = split_val[2].length === 2 ? `20${split_val[2]}` : split_val[2];
  const month = split_val[1].length === 1 ? `0${split_val[1]}` : split_val[1];
  const day = split_val[0].length === 1 ? `0${split_val[0]}` : split_val[0];

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date;
};

const getSpeakerDetails = (raw_string) => {
  const first_delimiter = raw_string.indexOf(",");
  const last_delimiter = raw_string.lastIndexOf(",");

  let speaker_name = "",
    speaker_designation = "",
    speaker_org = "";

  if (first_delimiter === -1) {
    speaker_name = raw_string;
    speaker_designation = "";
    speaker_org = "";
  } else if (first_delimiter === last_delimiter) {
    speaker_name = raw_string.substring(0, first_delimiter);
    speaker_designation = "";
    speaker_org = raw_string.substring(first_delimiter + 1);
    if (speaker_org[0] === " ") speaker_org = speaker_org.substring(1);
  } else {
    speaker_name = raw_string.substring(0, first_delimiter);
    speaker_designation = raw_string.substring(
      first_delimiter + 1,
      last_delimiter
    );
    if (speaker_designation[0] === " ")
      speaker_designation = speaker_designation.substring(1);
    speaker_org = raw_string.substring(last_delimiter + 1);
    if (speaker_org[0] === " ") speaker_org = speaker_org.substring(1);
  }

  return [speaker_name, speaker_designation, speaker_org];
};

const readFile = async (file_path) => {
  let csv_data = [];

  await new Promise((resolve, reject) => {
    const parser = csvParser()
      .on("data", (data) => {
        csv_data.push(data);
      })
      .on("end", () => {
        resolve();
      });

    fs.createReadStream(process.cwd() + file_path).pipe(parser);
  });

  return csv_data;
};

const filesToRead = [
  {
    file_path: "/data_for_bsh/conference/conference.csv",
    key: "conference-publications",
    mapper: (row) => {
      return {
        title: row["title"],
        pub_date: new Date(row["date"]).toISOString(),
        conf_name: row["conf_name"],
        impact_factor: row["impact_factor"],
        vol_no: row["vol_no"],
        issue_no: "",
        page_no: "",
        issn_isbn: row["issn_isbn"],
        conf_web_link: "",
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        indexing: row["indexing"],
        inv_paper: String(row["inv_paper"]).toLowerCase().includes("yes")
          ? true
          : false,
        prof_inv_file: {},
        studs_involved: Number(row["studs_involved"]),
        studs_coa_involved: Number(0),
        proof: { isLink: true, flink: String(row["proof"]) },
        fin_supp: false,
        fin_supp_details: "",
      };
    },
  },
  {
    file_path: "/data_for_bsh/books/books.csv",
    key: "book-publications",
    mapper: (row) => {
      return {
        title: row["title"],
        pub_date: new Date(row["date"]).toISOString(),
        writ_wh_bk:
          String(row["chaps_contrib"]).toLowerCase() == "na" ? true : false,
        chaps_contrib: row["chaps_contrib"],
        name_proceed: row["name_proceed"],
        vol_no: row["vol_no"],
        issue_no: "",
        page_no: "",
        name_of_publisher: row["name_of_publisher"],
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        issn_isbn: row["issn_isbn"],
        indexing: "",
        inv_contrib: String(row["inv_contrib"]).toLowerCase().includes("yes")
          ? true
          : false,
        prof_inv_file: String(row["prof_inv_file"]).toLowerCase().includes("na")
          ? {}
          : { isLink: true, flink: row["prof_inv_file"] },
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/journal/journal.csv",
    key: "journal-publications",
    mapper: (row) => {
      return {
        title: row["title"],
        pub_date: new Date(row["date"]).toISOString(),
        name_of_journ: row["name_of_journ"],
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        impact_factor: row["impact_factor"],
        vol_no: row["vol_no"],
        issue_no: "",
        page_no: "",
        issn_isbn: row["issn_isbn"],
        journ_web_link: "",
        indexing: row["indexing"],
        inv_paper: String(row["inv_paper"]).toLowerCase().includes("yes")
          ? true
          : false,
        prof_inv_file: String(row["prof_inv_file"]).toLowerCase().includes("na")
          ? {}
          : { isLink: true, flink: row["prof_inv_file"] },
        studs_involved: Number(row["studs_involved"]),
        studs_coa_involved: 0,
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/collab.csv",
    key: "collaborations",
    mapper: (row) => {
      return {
        date: new Date(row["date"]).toISOString(),
        collab_agency: row["collab_agency"],
        duration: row["duration"],
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        activity: row["activity"],
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/conf_att.csv",
    key: "conference-attended",
    mapper: (row) => {
      return {
        title: row["title"],
        speaker_name: row["speaker_name"],
        org_inst: "",
        role: row["role"],
        event_start_date: getDate(row["event_start_date"]).toISOString(),
        event_end_date: getDate(row["event_end_date"]).toISOString(),
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        participants: 0,
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/inv_lect.csv",
    key: "invited-lecture",
    mapper: (row) => {
      return {
        title: row["event_title"],
        event_type: row["event_type"],
        lecture_title: row["lecture_title"],
        org_inst: row["org_inst"],
        event_start_date: getDate(row["event_start_date"]).toISOString(),
        event_end_date: getDate(row["event_end_date"]).toISOString(),
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        participants: Number(row["participants"]),
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/fdp_org.csv",
    key: "fdp-workshop-organized",
    mapper: (row) => {
      const speaker = getSpeakerDetails(row["speaker_name"]);
      return {
        event_type: row["event_type"],
        title: row["title"],
        speaker_name: speaker[0],
        speaker_affiliation: speaker[1],
        speaker_inst: speaker[2],
        role: row["role"],
        event_start_date: getDate(row["event_start_date"]).toISOString(),
        event_end_date: getDate(row["event_end_date"]).toISOString(),
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        participants: Number(row["participants"]),
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/fdp_att.csv",
    key: "fdp-workshop-attended",
    mapper: (row) => {
      const speaker = getSpeakerDetails(row["speaker_name"]);
      return {
        event_type: row["event_type"],
        title: row["title"],
        speaker_name: speaker[0],
        speaker_affiliation: speaker[1],
        speaker_inst: speaker[2],
        event_start_date: getDate(row["event_start_date"]).toISOString(),
        event_end_date: getDate(row["event_end_date"]).toISOString(),
        coverage:
          String(row["coverage"]).toLowerCase() === "international"
            ? "International"
            : "National",
        participants: 0,
        proof: { isLink: true, flink: row["proof"] },
      };
    },
  },
  {
    file_path: "/data_for_bsh/sem_web_att.csv",
    key: "seminar-attended",
    mapper: (row) => {
      if (row["type"] === "Seminar") {
        const speaker = getSpeakerDetails(row["speaker_details"]);
        return {
          title: row["title"],
          event_start_date: getDate(row["event_start_date"]).toISOString(),
          event_end_date: getDate(row["event_end_date"]).toISOString(),
          speaker_name: speaker[0],
          speaker_designation: speaker[1],
          speaker_org: speaker[2],
          org_inst: "",
          coverage:
            String(row["coverage"]).toLowerCase() === "international"
              ? "International"
              : "National",
          participants: 100,
          proof: { isLink: true, flink: row["proof"] },
        };
      } else return null;
    },
  },
  {
    file_path: "/data_for_bsh/sem_web_att.csv",
    key: "webinar-attended",
    mapper: (row) => {
      if (row["type"] === "Webinar") {
        const speaker = getSpeakerDetails(row["speaker_details"]);
        return {
          event_start_date: getDate(row["event_start_date"]).toISOString(),
          event_end_date: getDate(row["event_end_date"]).toISOString(),
          speaker_name: speaker[0],
          speaker_designation: speaker[1],
          speaker_org: speaker[2],
          org_inst: "",
          coverage:
            String(row["coverage"]).toLowerCase() === "international"
              ? "International"
              : "National",
          participants: 100,
          proof: { isLink: true, flink: row["proof"] },
        };
      } else return null;
    },
  },
];

export default async function handler(req, res) {
  const outputFilePath = path.join(
    process.cwd(),
    "data_for_bsh",
    "final_user_data.json"
  );

  const hadnwrittenFilePath = path.join(
    process.cwd(),
    "data_for_bsh",
    "hand_written.json"
  );

  let collectionData = JSON.parse(fs.readFileSync(hadnwrittenFilePath));

  Promise.all(
    filesToRead.map(async (file) => {
      const csv_data = await readFile(file.file_path);

      csv_data.forEach((row, index) => {
        let result = collectionData.find(
          (user) =>
            user["profile"]["employeeID"] === row["Author"] &&
            user.profile.name === row["Author"]
        );
        if (result === undefined)
          collectionData.push({
            profile: {
              employeeID: row["Author"],
              name: row["Author"],
            },
          });

        result = collectionData.findIndex(
          (user) =>
            user["profile"]["employeeID"] === row["Author"] &&
            user.profile.name === row["Author"]
        );

        const mappedData = file.mapper(row);
        if (!!mappedData) {
          if (!collectionData[result][file.key]) {
            collectionData[result][file.key] = [];
          }

          collectionData[result][file.key].push(mappedData);
        }
      });
    })
  ).then(() => {
    res.status(201).json(collectionData);
    fs.writeFileSync(outputFilePath, JSON.stringify(collectionData, null, 2));
  });
}
