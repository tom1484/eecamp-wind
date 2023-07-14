import { ObjectId } from "mongodb"

export interface History {
  id: ObjectId, 
  timestamp: string, 
  _id?: ObjectId
}

export interface Team {
  id: number,
  name: string, 
  history: History[],
  _id?: ObjectId
}
