import { MongoClient } from "../deps.js";

const client = new MongoClient();
// Connect to MongoDB using srv Url..
try{
  await client.connect(Deno.env.get("MONGO_URL"));
}catch(error){
  console.error(`Error in connecting to MongoDB: ${error}`);
}

const db = client.database("chatreader");
export const chats = db.collection("chats")
export const messages = db.collection("messages")