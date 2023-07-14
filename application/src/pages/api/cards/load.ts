import { Card } from "@libs/mongo/models/card"
import { loadCards } from "@libs/mongo/cards"
import { NextApiRequest, NextApiResponse } from "next"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { result, error } = await loadCards(req.body as Card[])
      if (error) throw new Error(error)

      return res.status(200).json({ result })
    } catch (error) {
      return res.status(500).json({ error })
    }
  } else {
    return res.status(500).json({ error: "Wrong request method" })
  }
}

export default handler

