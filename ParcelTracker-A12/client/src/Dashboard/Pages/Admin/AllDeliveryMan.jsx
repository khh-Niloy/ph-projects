import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDeliveryMen = [] } = useQuery({
    queryKey: ["allDeliveryMen"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-role?role=deliverymen`);
      return data;
    },
  });

  // console.log(allDeliveryMen);

  return (
    <div>
      <div>
        <div className="px-10 pt-5 pb-16">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            All Delivery Men
          </h1>
          <p className="text-gray-600 pb-10 text-center">
            View and manage all registered delivery personnel.
          </p>
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead></TableHead>
                <TableHead>Delivery Man's Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Number of parcels delivered</TableHead>
                <TableHead>Average review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDeliveryMen.map((e, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.phonenumber}</TableCell>
                  <TableCell>{e.number_of_parcel_delivered}</TableCell>
                  <TableCell>{e.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
