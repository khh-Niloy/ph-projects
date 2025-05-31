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

import { getAllParcel } from "@/lib/admin/getAllParcel";
import AssignButton from "./components/AssignButton";

export default async function AllParcel() {
  type tableHeadItems = {
    id: number;
    label: string;
  };

  type AllParcelInfo = {
    _id: string;
    senderName: string;
    senderPhoneNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    deliveryAddress: string;
    requestedDeliveryDate: string;
    bookingDate: string;
    deliveryCharge: number;
    deliverystatus: string;
  };

  const tableHead: tableHeadItems[] = [
    { id: 1, label: "Sender Name" },
    { id: 2, label: "Sender PhoneNumber" },
    { id: 3, label: "Receiver Name" },
    { id: 4, label: "Receiver PhoneNumber" },
    { id: 5, label: "Delivery Address" },
    { id: 6, label: "Requested Delivery Date" },
    { id: 7, label: "Booking Date" },
    { id: 8, label: "Delivery Charge" },
    { id: 9, label: "Delivery Status" },
    { id: 10, label: "Actions" },
  ];

  const allParcelInfo: AllParcelInfo[] = await getAllParcel();

  return (
    <div className="bg-white h-screen">
      <h1>AllParcel</h1>

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
          {allParcelInfo.map(
            ({
              _id,
              senderName,
              senderPhoneNumber,
              receiverName,
              receiverPhoneNumber,
              deliveryAddress,
              requestedDeliveryDate,
              bookingDate,
              deliveryCharge,
              deliverystatus,
            }) => (
              <>
                <TableRow>
                  <TableCell>{senderName}</TableCell>
                  <TableCell>{senderPhoneNumber}</TableCell>
                  <TableCell>{receiverName}</TableCell>
                  <TableCell>{receiverPhoneNumber}</TableCell>
                  <TableCell>{deliveryAddress}</TableCell>
                  <TableCell>{requestedDeliveryDate}</TableCell>
                  <TableCell>{bookingDate}</TableCell>
                  <TableCell>{deliveryCharge}</TableCell>
                  <TableCell>{deliverystatus}</TableCell>
                  <TableCell>
                    <AssignButton
                      deliverystatus={deliverystatus}
                      parcelID={_id}
                    />
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
