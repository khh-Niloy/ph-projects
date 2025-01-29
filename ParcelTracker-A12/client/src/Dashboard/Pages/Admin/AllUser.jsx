import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUser = [] } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-role?role=user`);
      return data;
    },
  });

  const total_User = allUser.length;
  const numberOfPages = Math.ceil(total_User / 5);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setcurrentPage] = useState(1);

  const { data: perPageUser = [], refetch } = useQuery({
    queryKey: ["paginatoin"],
    queryFn: async () => {
      const data = await axiosSecure.get(
        `/products?page=${currentPage - 1}&size=${5}`
      );
      return data.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleMakeDeliveryMan = async (email) => {
    await axiosSecure.patch(`/update-role-tpye/${email}`, {
      role: "deliverymen",
    });
    refetch();
    toast({
      title: <span style={{ color: "#00D26A" }}>Success!</span>,
      description: "Role Changed To Delivery Men!",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
  };

  const handleMakeAdmin = async (email) => {
    await axiosSecure.patch(`/update-role-tpye/${email}`, {
      role: "admin",
    });
    refetch();
    toast({
      title: <span style={{ color: "#00D26A" }}>Success!</span>,
      description: "Role Changed To Admin!",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
  };

  return (
    <div>
      <div>
        <div className="px-10 pt-5 pb-16">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            All Users
          </h1>
          <p className="text-gray-600 pb-10 text-center">
            View and manage all registered users in one place.
          </p>

          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead></TableHead>
                <TableHead>User's Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Number of parcels Booked</TableHead>
                <TableHead>Total Spent Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perPageUser.map((e, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.phonenumber}</TableCell>
                  <TableCell>{e.number_of_parcel_booked}</TableCell>
                  <TableCell>${e.total_spent_amount}</TableCell>
                  <TableCell className="flex flex-col items-start justify-center gap-1">
                    <Button
                      size="sm"
                      onClick={() => handleMakeDeliveryMan(e?.email)}
                      className="text-xs"
                    >
                      Make Delivery Men
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleMakeAdmin(e?.email)}
                      className="text-xs"
                    >
                      Make Admin
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <h1 className="text-center text-gray-800 mb-4 text-sm">Pages</h1>
      <div className="flex items-center justify-center pb-20 gap-3">
        {pages.map((e, index) => (
          <Button
            onClick={() => {
              setcurrentPage(e + 1);
            }}
            key={index}
            size="sm"
            className={`border bg-transparent text-black ${
              currentPage === e + 1 && "bg-[#212121] text-white"
            }`}
          >
            {e + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
