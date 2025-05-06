import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://khhniloy0:${process.env.DB_PASS}@cluster0.m65dh.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export default async function getDBCollection(collectionName) {
  const clientPromise = await client.connect();
  return clientPromise.db("fast-pathao-next").collection(collectionName);
}
