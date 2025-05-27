import connectDB from "@/lib/db";
import { Deliverymen } from "@/models/deliverymen.model";
// import { Deliverymen } from "@/models/deliverymen.model";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";
/* 
  r1. parcel info -> add deliveryman ID, add approximateDeliveryDate r2. delivery status -> assigned
  r5. deliveryman is available status -> false 
*/
export async function PATCH(request, { params }) {
  const { approximateDeliveryDate, assignedDeliveryManID } =
    await request.json();

  await connectDB();

  const { id } = params;
  // console.log("route", id);
  console.log("route deliveryman id", assignedDeliveryManID);

  try {
    const updateParcelInfo = await Parcel.updateOne(
      { _id: id },
      {
        $set: {
          assignedDeliveryManID: assignedDeliveryManID,
          approximateDeliveryDate: approximateDeliveryDate,
          deliverystatus: "assigned",
        },
      },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log(error);
  }

  // console.log(updateParcelInfo);

  const updateDeliverymanAvailableStatus = await Deliverymen.findByIdAndUpdate(
    assignedDeliveryManID,
    {
      $set: {
        isAvailable: false,
      },
    }
    // { new: true, runValidators: true }
  );

  // console.log(updateParcelInfo, updateDeliverymanAvailableStatus);

  return NextResponse.json(
    { message: "update parcel info and deliveryman available status" },
    { status: 200 }
  );
}
