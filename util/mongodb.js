import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = 'twitter-clone'

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}