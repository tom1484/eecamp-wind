import { fetchTeams } from "@libs/mongo/teams";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { result, error } = await fetchTeams();
      if (error) throw new Error(error);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error: "Wrong request method" });
  }
}

export default handler;


