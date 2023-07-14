import { clearTeams } from "@libs/mongo/teams";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { result, error } = await clearTeams();
      if (error) throw new Error(error);

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default handler;
