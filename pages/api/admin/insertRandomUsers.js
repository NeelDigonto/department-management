import { getMongoClient } from "../../../lib/db";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { MASTER_SCHEMA } from "../../../data/schema";
import { isEmptyObject } from "../../../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../../../data/types/types";
import * as faker from "faker";

const getFakeValue = (input_type) => {};

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  if (req.method !== "PATCH") {
    console.error("Other than PATCH method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let users = [];

  for (let userIndex = 0; userIndex < 100; ++userIndex) {
    let userObject = {
      employeeID: "",
      hashedPassword: "",
    };
    userObject["profile"] = MASTER_SCHEMA["profile"].forEach((field, index) => {
      getFakeValue(field.input_type);
    });
  }
  connection.close();

  res.status(200);
}
