import { TeamData, loadTeams } from "@libs/mongo/teams";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { result, error } = await loadTeams(req.body as TeamData[]);
      if (error) throw new Error(error);

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error: "Wrong request method" });
  }
}

export default handler;

