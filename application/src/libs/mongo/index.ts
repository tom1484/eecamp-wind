import { MongoClient, MongoClientOptions } from "mongodb"

const DB_URI: string = process.env.DB_URI ?? "mongodb://localhost:27017"
const options: MongoClientOptions = {}

export const client: MongoClient = new MongoClient(DB_URI, options)

client.on("serverHeartbeatFailed", async () => {
  // console.log("serverHeartbeatFailed")
  // console.log(await client.db("data").collection("teams"))
  // console.log(client.db("data").collection("teams"))
  await client.connect()
})
client.on("serverHeartbeatSucceeded", () => {
  // console.log("serverHeartbeatSucceeded")
})


