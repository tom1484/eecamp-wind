import { ObjectId } from "mongodb";

export interface Card {
  RFID: string, 
  score: number, 
  _id?: ObjectId
}
// export class Card {
//   constructor (
//     public RFID: string, 
//     public score: number, 
//   ) {}
// }
