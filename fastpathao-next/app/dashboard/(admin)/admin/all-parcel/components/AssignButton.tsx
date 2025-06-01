"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllDeliveryMen } from "@/lib/admin/getAllDeliveryMen";
import axios from "axios";

type PropType = {
  parcelID: string;
  deliverystatus: string;
};

export default function AssignButton({ parcelID, deliverystatus }: PropType) {
  // const availableDeliveryMenList = await getAllDeliveryMen();
  const [availableDeliveryMenList, setavailableDeliveryMenList] = useState([]);
  const [date, setDate] = React.useState<Date>();
  const [selectedDeliveryManID, setselectedDeliveryManID] = useState("");

  useEffect(() => {
    async function fetchData() {
      const availableDeliveryMen = await getAllDeliveryMen();
      setavailableDeliveryMenList(availableDeliveryMen);
    }
    fetchData();
  }, []);

  async function handleAssignedDeliveryMan(
    selectedDeliveryManID: string,
    date: Date | undefined
  ) {
    console.log(parcelID);
    // console.log(selectedDeliveryManID, date);
    const response = await axios.patch(
      `/api/dashboard/admin/all-parcel/assign-delivery-man/${parcelID}`,
      {
        approximateDeliveryDate: date,
        assignedDeliveryManID: selectedDeliveryManID,
      }
    );
    const data = response.data;
    console.log("response", data);
  }

  /* 
    4. appear pay button
  */

  return (
    <Dialog>
      <DialogTrigger
        disabled={
          deliverystatus === "assigned" || deliverystatus === "cancelled"
        }
      >
        <Button
          disabled={
            deliverystatus === "assigned" || deliverystatus === "cancelled"
          }
        >{`${deliverystatus === "assigned" ? "Assigned" : "Assign"}`}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Delivery Person</DialogTitle>
          <Select onValueChange={(value) => setselectedDeliveryManID(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose delivery man" />
            </SelectTrigger>
            <SelectContent>
              {availableDeliveryMenList.map(({ _id, name }) => (
                <SelectItem key={_id} value={_id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogHeader>
        {/* {""} */}
        <DialogHeader>
          <DialogTitle>Approximate Delivery Date</DialogTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </DialogHeader>
        <Button
          onClick={() => {
            handleAssignedDeliveryMan(selectedDeliveryManID, date);
          }}
        >
          Assign for delivery
        </Button>
      </DialogContent>
    </Dialog>
  );
}
