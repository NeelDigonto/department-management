import { getMongoClient } from "../../../lib/db";

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  if (req.method !== "GET") {
    console.error("Other than get method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const payload = await usersCollection.find().toArray();

  connection.close();

  const sanitizedPayload = payload.map((document) => {
    let temp_obj = { ...document };
    delete temp_obj["hashedPassword"];
    delete temp_obj["_id"];
    return temp_obj;
  });

  /*   delete payload["hashedPassword"];
  delete payload["_id"]; 
  console.log(payload);*/

  res.status(200).json(sanitizedPayload);
}
