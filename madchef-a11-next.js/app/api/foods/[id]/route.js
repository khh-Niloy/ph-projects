import getDBCollectionName from "@/lib/getDBCollectionName";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const foodCollection = await getDBCollectionName("food");
    const result = await foodCollection.findOne({ _id: new ObjectId(id) });
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  const id = await params.id;

  const filter = { _id: new ObjectId(id) };

  const update = {
    $set: body,
  };

  const foodCollection = await getDBCollectionName("food");

  try {
    const result = await foodCollection.updateOne(filter, update, {
      upsert: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
