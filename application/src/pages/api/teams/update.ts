import { UpdateData, updateHistory } from "@libs/mongo/teams";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  if (req.method === "POST") {
    let { body } = req;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    try {
      const { result, error } = await updateHistory(body as UpdateData);
      if (error) throw new Error(error);

      console.log(result)

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error: "Wrong request method" });
  }
}

export default handler;




