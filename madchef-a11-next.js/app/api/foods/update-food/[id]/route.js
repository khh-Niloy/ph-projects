import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const body = await req.json();
  const { id } = req.query;
  const { _id, ...updateInfo } = body;

  const filter = { _id: new ObjectId(id) };

  const update = {
    $set: updateInfo,
  };

  const foodCollection = await getCollectionDB("food");

  try {
    const result = await foodCollection.updateOne(filter, update, {
      upsert: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
