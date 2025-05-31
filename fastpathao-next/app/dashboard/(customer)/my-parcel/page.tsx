export const dynamic = "force-dynamic";

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
import Review from "./components/Review";

export default async function MyParcel() {
  type tableHeadItems = {
    id: number;
    label: string;
  };

  const tableHead: tableHeadItems[] = [
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

  // console.log(parcelInfo);

  type ParcelInfo = {
    _id: string;
    receiverName: string;
    receiverPhoneNumber: string;
    deliveryAddress: string;
    parcelType: string;
    requestedDeliveryDate: string;
    bookingDate: string;
    approximateDeliveryDate?: string;
    deliveryCharge: number;
    assignedDeliveryManID?: string;
    deliverystatus: string;
  };

  const parcelInfo: ParcelInfo[] = await getParcelinfo(email);

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
          {parcelInfo.map(
            ({
              _id,
              receiverName,
              receiverPhoneNumber,
              requestedDeliveryDate,
              bookingDate,
              approximateDeliveryDate,
              deliveryAddress,
              assignedDeliveryManID,
              parcelType,
              deliveryCharge,
              deliverystatus,
            }) => (
              <>
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
                    <Button>Pay</Button>
                  </TableCell>
                  <TableCell>
                    <Review _id={_id} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-5 items-start">
                      {deliverystatus !== "pending" ? (
                        <Button disabled>Update</Button>
                      ) : (
                        <Link
                          href={`/dashboard/my-parcel/update-parcel/${_id}`}
                        >
                          <Button>Update</Button>
                        </Link>
                      )}

                      <CancelButton deliverystatus={deliverystatus} _id={_id} />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
