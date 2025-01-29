import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "../../../Hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [allDeliveryMen, setallDeliveryMen] = useState([]);

  const { data: allParcel = [], refetch } = useQuery({
    queryKey: ["allparcelinfos"],
    queryFn: async () => {
      const data = await axiosSecure.get("/all-parcel");
      return data.data;
    },
  });
  const [filterdDate, setfilterdDate] = useState(allParcel);

  useEffect(() => {
    setfilterdDate(allParcel);
  }, [allParcel]);

  useEffect(() => {
    axiosSecure.get(`/all-role?role=deliverymen`).then((res) => {
      setallDeliveryMen(res.data);
    });
  }, []);

  const [DeliveryDate, setDeliveryDate] = useState("");

  async function handleAssignSubmit(e, id) {
    e.preventDefault();
    const form = e.target;
    const assignedDeliveryManID = form.assignedDeliveryMan.value;
    const approximateDeliveryDate = DeliveryDate;

    const updateInfo = {
      status: "On The Way",
      assignedDeliveryManID: assignedDeliveryManID,
      approximateDeliveryDate: approximateDeliveryDate
        ? approximateDeliveryDate.toLocaleDateString("en-CA")
        : "",
    };

    await axiosSecure.patch(`/update-status-addID/${id}`, updateInfo);
    refetch();
    toast({
      title: <span style={{ color: "#00D26A" }}>Success!</span>,
      description: "Assiged successfully",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
  }
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  async function handleDateSearch(e) {
    e.preventDefault();
    const date_from = dateFrom ? dateFrom.toLocaleDateString("en-CA") : "";
    const date_to = dateTo ? dateTo.toLocaleDateString("en-CA") : "";

    if (date_from && date_to) {
      const res = await axiosSecure.get(
        `/date-range?date_from=${date_from}&date_to=${date_to}`
      );
      setfilterdDate(res.data);
    }
  }

  return (
    <div>
      <div className="px-10 pt-5 pb-20">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Parcel Management
        </h1>
        <p className="text-gray-600 pb-10 text-center">
          Assign parcels to delivery personnel and manage deliveries
          efficiently.
        </p>

        <div className="pb-10">
          <h1 className="text-xs mb-3 text-black/70">
            View Deliveries by Requested Delivery Date Range
          </h1>
          <form
            onSubmit={handleDateSearch}
            className="flex sm:flex-row sm:items-center flex-col items-start gap-3"
          >
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? (
                      format(dateFrom, "PPP")
                    ) : (
                      <span>From Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : <span>To Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button size="sm" className="text-xs">
              Search
            </Button>
          </form>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead></TableHead>
              <TableHead>User's Name</TableHead>
              <TableHead>User's Phone</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterdDate.map((parcel, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{parcel.name}</TableCell>
                <TableCell>{parcel.phonenumber}</TableCell>
                <TableCell>{parcel.bookingDate}</TableCell>
                <TableCell>{parcel.requestedDeliveryDate}</TableCell>
                <TableCell>${parcel.price}</TableCell>
                <TableCell>{parcel.status}</TableCell>
                <TableCell className="flex flex-col items-start justify-center gap-1">
                  <Button
                    size="sm"
                    disabled={parcel.status !== "pending"}
                    onClick={() =>
                      document.getElementById(`trigger-${parcel._id}`).click()
                    }
                    className="text-xs"
                  >
                    {parcel.status === "pending" ? "Assign" : "Assigned"}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button id={`trigger-${parcel._id}`} className="hidden" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                          Assign Delivery
                        </DialogTitle>
                      </DialogHeader>

                      <form
                        key={parcel._id}
                        onSubmit={(e) => handleAssignSubmit(e, parcel._id)}
                        className="mt-4 space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Choose Delivery Person
                          </label>
                          <Select name="assignedDeliveryMan">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a delivery person" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {allDeliveryMen.map((deliveryMan) => (
                                  <SelectItem
                                    key={deliveryMan._id}
                                    value={deliveryMan._id}
                                    className="cursor-pointer hover:bg-gray-100"
                                  >
                                    {deliveryMan.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="approximateDeliveryDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Approximate Delivery Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !DeliveryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {DeliveryDate ? (
                                  format(DeliveryDate, "PPP")
                                ) : (
                                  <span>Delivery Date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={DeliveryDate}
                                onSelect={setDeliveryDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="flex flex-col gap-4 mt-6">
                          <DialogClose asChild>
                            <Button
                              type="submit"
                              onClick={() => refetch()}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Assign Delivery
                            </Button>
                          </DialogClose>

                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllParcel;
