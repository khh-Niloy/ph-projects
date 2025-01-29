import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContextProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../../Hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data: myParcelData = [], refetch } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-parcel/${user?.email}`);
      return data;
    },
  });
  const [filterdData, setfilterdData] = useState(myParcelData);

  async function handleCancelParcel() {
    if (!selectedParcelId) return;

    const updateStatus = {
      status: "cancelled",
    };
    await axiosSecure.patch(
      `/cancel-deliver-status/${selectedParcelId}`,
      updateStatus
    );
    refetch();
    toast({
      title: <span style={{ color: "#E83434" }}>Cancelled!</span>,
      description:
        "You've marked this delivery as cancelled. Follow up with the receiver or admin for further details.",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      duration: 2000,
    });
    setIsAlertOpen(false);
    setSelectedParcelId(null);
  }

  async function handleFeedback(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const rating = parseFloat(formObject.rating);
    const review_giving_date = new Date().toISOString();
    formObject.rating = rating;
    formObject.review_giving_date = review_giving_date;

    await axiosSecure.post("/add-reviews", formObject);
    toast({
      title: <span style={{ color: "#00D26A" }}>Success!</span>,
      description: "Thank you for your review!",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      duration: 2000,
    });
    e.target.reset();
  }

  useEffect(() => {
    setfilterdData(myParcelData);
  }, [myParcelData]);

  async function handleFilter(value) {
    if (value === "all") {
      setfilterdData(myParcelData);
    } else {
      const filtered = myParcelData.filter((item) => item.status === value);
      setfilterdData(filtered);
    }
  }

  return (
    <div className="px-10 pt-5 pb-20">
      <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
        Track Your Parcel
      </h1>
      <p className="text-gray-600 pb-7 text-center">
        View the status and details of your current and past parcel deliveries.
      </p>
      <div className="pb-7">
        <Select onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="on the way">On The Way</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Parcel Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this parcel delivery? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelParcel}>
              Yes, cancel delivery
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead></TableHead>
            <TableHead>Parcel Type</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Approximate Delivery Date</TableHead>
            <TableHead>Delivery Men ID</TableHead>
            <TableHead>Booking Status</TableHead>
            <TableHead>Update & Cancel</TableHead>
            <TableHead>Pay & Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterdData.map((e, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{e.parcelType}</TableCell>
              <TableCell>{e.requestedDeliveryDate}</TableCell>
              <TableCell>{e.bookingDate}</TableCell>
              <TableCell>{e.approximateDeliveryDate}</TableCell>
              <TableCell>{e.assignedDeliveryManID}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell className="flex flex-col items-start justify-center gap-1">
                <Button
                  onClick={() =>
                    navigate(`/dashboard/myparcel/update/${e._id}`)
                  }
                  disabled={e.status !== "pending"}
                  size="sm"
                  className="text-xs"
                >
                  Update
                </Button>
                <Button
                  disabled={e.status !== "pending"}
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setSelectedParcelId(e._id);
                    setIsAlertOpen(true);
                  }}
                >
                  Cancel
                </Button>
              </TableCell>
              <TableCell className="">
                <div className="flex flex-col items-start justify-center gap-1">
                  <Button
                    onClick={() =>
                      document.getElementById(`trigger-${e._id}`).click()
                    }
                    className={`text-xs ${
                      e.status === "delivered" ? "flex" : "hidden"
                    }`}
                    size="sm"
                  >
                    Review
                  </Button>

                  <Dialog className="max-h-[90vh]">
                    <DialogTrigger asChild>
                      <button
                        id={`trigger-${e._id}`}
                        style={{ display: "none" }}
                      />
                    </DialogTrigger>
                    <DialogContent className="p-4 max-w-lg mx-auto rounded-lg bg-white overflow-y-auto max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-medium">
                          Submit Feedback
                        </DialogTitle>
                      </DialogHeader>
                      <form key={e._id} onSubmit={handleFeedback}>
                        <div>
                          <label className="label">User's Name</label>
                          <input
                            type="text"
                            defaultValue={e.name}
                            name="usersName"
                            className="input input-bordered w-full h-10"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="label">User's Image</label>
                          <input
                            type="text"
                            defaultValue={user?.photoURL}
                            name="usersImage"
                            className="input input-bordered w-full h-10"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="label">Rating out of 5</label>
                          <input
                            step="any"
                            max="5"
                            name="rating"
                            className="input input-bordered w-full h-10"
                          />
                        </div>
                        <div>
                          <label className="label">Feedback</label>
                          <textarea
                            className="input input-bordered w-full h-24 resize-none"
                            name="feedback"
                          ></textarea>
                        </div>
                        <div>
                          <label className="label">Delivery Men's ID</label>
                          <input
                            type="text"
                            value={e.assignedDeliveryManID}
                            name="assignedDeliveryManID"
                            className="input input-bordered w-full h-10"
                            readOnly
                          />
                        </div>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            className="btn btn-neutral w-full mt-4"
                          >
                            Submit
                          </Button>
                        </DialogClose>
                      </form>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" className="w-full">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => navigate(`/dashboard/checkoutPage/${e._id}`)}
                    disabled={e.paymentStatus === "done"}
                    size="sm"
                    className="text-xs"
                  >
                    {e.paymentStatus === "done" ? "Paid" : "Pay"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyParcel;
