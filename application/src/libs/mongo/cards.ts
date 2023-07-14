import { Collection, Db } from "mongodb"
import { client } from "."
import { Card } from "@libs/mongo/models/card"


export interface ClearResult {
  result?: string,
  error?: string
}

export interface LoadResult {
  result?: string,
  error?: string
}

export interface FindResult {
  result?: Card,
  error?: string
}

// let client: MongoClient
let db: Db
let cardCollection: Collection<Card>

async function init() {
  try {
    db = client.db("data")
    cardCollection = db.collection<Card>("cards")
  } catch {
    throw new Error("Failed to stablish connection to database")
  }
}

export async function clearCards(): Promise<ClearResult> {
  try {
    if (!cardCollection) await init()
    const deleteResult = await cardCollection.deleteMany({})
    if (deleteResult.acknowledged) {
      return { result: "Success" }
    } else {
      throw new Error("Failed to delete all cards")
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }
}

export async function loadCards(cardDatas: Card[]): Promise<LoadResult> {
  try {
    if (!cardCollection) await init()
    const insertResult = await cardCollection.insertMany(cardDatas)

    if (insertResult.acknowledged) {
      return { result: "Success" }
    } else {
      throw new Error("Failed to insert cards")
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }
}

export async function findCard(query: Object): Promise<FindResult> {
  try {
    if (!cardCollection) await init()
    const findResult = await cardCollection.findOne(query)

    if (findResult) {
      return { result: findResult as Card }
    } else {
      throw new Error("Failed to insert cards")
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }
}


