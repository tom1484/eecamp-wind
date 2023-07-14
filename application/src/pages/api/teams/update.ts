import { UpdateData, updateHistory } from "@libs/mongo/teams";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // console.log("update.ts: ", req.body)
    try {
      const { result, error } = await updateHistory(req.body as UpdateData);
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




