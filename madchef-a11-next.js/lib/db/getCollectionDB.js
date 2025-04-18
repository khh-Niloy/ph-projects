import clientPromise from "./connectDB";

export async function getCollectionDB(collectionName) {
  const client = await clientPromise;
  const db = client.db("madchef-next-js");
  return db.collection(collectionName);
}
