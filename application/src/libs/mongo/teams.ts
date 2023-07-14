import { Collection, Db, ObjectId } from "mongodb"
import { client } from "."
import { History, Team } from "@libs/mongo/models/team"
import { findCard } from "./cards"
import { Card } from "./models/card"

import moment from 'moment';


export interface HistoryData {
  RFID: string
  timestamp: string
}

export interface TeamData {
  id: number
  name: string
  history: HistoryData[]
}

export interface FetchedHistoryData {
  RFID: string
  score: number
  timestamp: string
}

export interface FetchedTeamData {
  id: number
  name: string
  score: number
  history: FetchedHistoryData[]
}

export interface UpdateData {
  id: number
  // entry: HistoryData
  RFID: string
}

export interface ClearResult {
  result?: string
  error?: string
}

export interface LoadResult {
  result?: string
  error?: string
}

export interface FetchResult {
  result?: FetchedTeamData[]
  error?: string
}

export interface UpdateResult {
  result?: string
  error?: string
}

let db: Db
let teamCollection: Collection<Team>

async function init() {
  try {
    db = client.db("data")
    teamCollection = db.collection<Team>("teams")
  } catch {
    throw new Error("Failed to stablish connection to database")
  }
}

export async function clearTeams(): Promise<ClearResult> {
  try {
    if (!teamCollection) await init()
    const deleteResult = await teamCollection.deleteMany({})
    if (deleteResult.acknowledged) {
      return { result: "Success" }
    } else {
      throw new Error("Failed to delete all teams")
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }
}

export async function loadTeams(teamDatas: TeamData[]): Promise<LoadResult> {
  try {
    if (!teamCollection) await init()

    let teams: Team[] = await Promise.all(
      teamDatas.map(async (teamData) => {
        const historyData: HistoryData[] = teamData.history

        const history: History[] = (
          await Promise.all(
            historyData.map(async (entry) => {
              const result = (await findCard({ RFID: entry.RFID })).result
              if (result) return {
                id: result._id as ObjectId,
                timestamp: entry.timestamp
              }
              return undefined
            }
            ))
        ).filter(history => {
          if (history) return true
          else return false
        }) as History[]

        return {
          id: teamData.id,
          name: teamData.name,
          history: history
        }
      }
      ))
    const insertResult = await teamCollection.insertMany(teams)

    if (insertResult.acknowledged) {
      return { result: "Success" }
    } else {
      throw new Error("Failed to insert teams")
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }
}

export async function fetchTeams(): Promise<FetchResult> {
  try {
    // console.log(client)
    // if (!client) console.log(await connectClient())
    if (!teamCollection) await init()

    const teams: Team[] = await teamCollection.find({}).toArray();

    const teamDatas: FetchedTeamData[] = await Promise.all(
      teams.map(async (team) => {
        const history: History[] = team.history;

        const historyData: FetchedHistoryData[] = (
          await Promise.all(
            history.map(async (entry) => {
              const result = (await findCard({ _id: entry.id })).result
              if (result) {
                return {
                  timestamp: entry.timestamp,
                  ...result
                } as FetchedHistoryData
              }
              else return undefined
            })
          )
        ).filter(history => {
          if (history) return true
          else return false
        }) as FetchedHistoryData[]

        const totalScore = historyData.reduce((acc, entry) => {
          return acc + entry.score
        }, 0)

        return {
          id: team.id,
          name: team.name,
          score: totalScore,
          history: historyData
        } as FetchedTeamData
      })
    )

    return { result: teamDatas }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    return { error: message }
  }

}

export async function updateHistory(updateData: UpdateData): Promise<UpdateResult> {
  try {
    if (!teamCollection) {
      await init()
    }

    const findCardResult = (await findCard({ RFID: updateData.RFID })).result
    let card: Card
    if (findCardResult) {
      card = findCardResult as Card
    } else {
      const findPenaltyResult = (await findCard({ RFID: "penalty" })).result
      if (!findPenaltyResult) {
        return { error: "Unknown error" }
      }
      card = findPenaltyResult as Card
    }

    const findTeamResult = await teamCollection.findOne({ id: updateData.id })
    if (!findTeamResult) {
      return { error: "Team not exists" }
    }
    const team = findTeamResult as Team
    const history = team.history

    if (findCardResult) {
      let entryExists = false
      for (let existedEntry of history) {
        if (existedEntry.id.equals(card._id as ObjectId)) {
          entryExists = true
          break
        }
      }

      if (entryExists) {
        return { result: "Card already detected" }
      }
    }

    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")

    const newEntry: History = {
      id: card._id as ObjectId,
      timestamp: timestamp
    }

    const insertResult = await teamCollection.updateOne(
      { id: updateData.id },
      { "$push": { "history": newEntry } }
    )
    if (!insertResult.acknowledged) {
      return { error: "Failed to insert entry" }
    }

    if (findCardResult) {
      return { result: "Get point" }
    } else {
      return { result: "Get penalty" }
    }
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }

}
