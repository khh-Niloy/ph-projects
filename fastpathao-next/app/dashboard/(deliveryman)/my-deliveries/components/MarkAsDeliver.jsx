"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

export default function MarkAsDeliver({ _id, assignedDeliveryManID }) {
  async function handleDeliver(parcelID) {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/my-deliveries/update-deliver-status/${parcelID}`,
      {
        deliverystatus: "delivered",
        assignedDeliveryManID: assignedDeliveryManID,
      }
    );
    const data = response.data;
    console.log(data);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Mark as deliver</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Parcel Delivery</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this parcel as delivered? This
              action will update the delivery status and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose>
              <Button type="button" variant="secondary">
                No, go back
              </Button>
              <Button onClick={() => handleDeliver(_id)} className="ml-2">
                Yes, mark as delivered
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
