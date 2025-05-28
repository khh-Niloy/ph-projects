import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getParcelinfo } from "@/lib/customer/getParcelinfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CancelButton from "./components/CancelButton";

export default async function MyParcel() {
  const tableHead = [
    { id: 1, label: "Receiver Name" },
    { id: 2, label: "Receiver PhoneNumber" },
    { id: 3, label: "Delivery Address" },
    { id: 4, label: "Parcel Type" },
    { id: 5, label: "Requested Delivery Date" },
    { id: 6, label: "Booking Date" },
    { id: 7, label: "Approximate Delivery Date" },
    { id: 8, label: "Delivery Charge" },
    { id: 9, label: "Delivery Men ID" },
    { id: 10, label: "Delivery Status" },
    { id: 11, label: "Pay" },
    { id: 12, label: "Review" },
    { id: 13, label: "Update & Cancel" },
  ];

  const email = "Hasib@gmail.com";

  const {
    _id,
    receiverName,
    receiverPhoneNumber,
    requestedDeliveryDate,
    bookingDate,
    approximateDeliveryDate,
    deliveryAddress,
    assignedDeliveryManID,
    parcelType,
    parcelWeight,
    deliveryCharge,
    deliverystatus,
    paymentStatus,
  } = await getParcelinfo(email);
  // console.log(parcelInfo);

  return (
    <div className="bg-white h-screen">
      <h1>My Parcel</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHead.map(({ id, label }) => (
              <TableHead key={id}>{label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{receiverName}</TableCell>
            <TableCell>{receiverPhoneNumber}</TableCell>
            <TableCell>{deliveryAddress}</TableCell>
            <TableCell>{parcelType}</TableCell>
            <TableCell>{requestedDeliveryDate}</TableCell>
            <TableCell>{bookingDate}</TableCell>
            <TableCell>{approximateDeliveryDate ?? "-"}</TableCell>
            <TableCell>{deliveryCharge}</TableCell>
            <TableCell>{assignedDeliveryManID ?? "-"}</TableCell>
            <TableCell>{deliverystatus}</TableCell>
            <TableCell>
              <Button variant="outline">Pay</Button>
            </TableCell>
            <TableCell>
              <Button variant="outline">Review</Button>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-5 items-start">
                {deliverystatus !== "pending" ? (
                  <Button disabled variant="outline">
                    Update
                  </Button>
                ) : (
                  <Link href={`/dashboard/my-parcel/update-parcel/${_id}`}>
                    <Button variant="outline">Update</Button>
                  </Link>
                )}

                <CancelButton deliverystatus={deliverystatus} _id={_id} />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
