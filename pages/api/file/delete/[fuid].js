import { deleteFile } from "../../../../lib/aws-wrapper";

export default async function handler(req, res) {
  //check if the uid is valid
  //check also if the user is ok

  if (req.method !== "PATCH") {
    console.error("Non patch req received!");
  }

  const { fuid } = req.query;

  deleteFile(fuid);

  res.status(200).json({ status: "ok" });
}
