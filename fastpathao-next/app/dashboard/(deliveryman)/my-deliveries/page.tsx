import { getAllDeliveries } from "@/lib/deliveryman/getAllDeliveries";
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
import { Button } from "@/components/ui/button";

export default async function MyDelivery() {
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
    { id: 11, label: "Location" },
    { id: 13, label: "Actions" },
  ];

  const email = "deliveryman_3@gmail.com";

  const allDeliveriesList = await getAllDeliveries(email);
  console.log(allDeliveriesList);

  return (
    <div className="bg-white h-screen">
      <h1>MyDelivery</h1>

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
          {allDeliveriesList.map(
            ({
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
                    <Button variant="outline">Location</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline">Mark as deliver</Button>
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
