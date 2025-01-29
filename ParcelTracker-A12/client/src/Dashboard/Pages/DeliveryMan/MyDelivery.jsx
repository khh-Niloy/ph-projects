import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthContextProvider";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "../../../Hooks/use-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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

// Fix Leaflet's default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "@/components/ui/button";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MyDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [selectedParcelIdForDeliver, setSelectedParcelIdForDeliver] =
    useState(null);
  const [isAlertOpenForDeliver, setIsAlertOpenForDeliver] = useState(false);

  const { data: deliveryListItems = [], refetch } = useQuery({
    queryKey: ["deliveryListOne"],
    queryFn: async () => {
      const data = await axiosSecure.get(
        `/one-deliveryman-info/${user?.email}`
      );
      return data.data;
    },
  });

  async function handleCancelStatus() {
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
      title: <span style={{ color: "#E83434" }}>cancelled!</span>,
      description:
        "You’ve marked this delivery as cancelled. Follow up with the receiver or admin for further details.",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
    setIsAlertOpen(false);
    setSelectedParcelId(null);
  }

  async function handleDeliverStatus() {
    if (!selectedParcelIdForDeliver) return;

    const updateStatus = {
      status: "delivered",
    };
    await axiosSecure.patch(
      `/cancel-deliver-status/${selectedParcelIdForDeliver}`,
      updateStatus
    );
    await axiosSecure.patch(`/update-user-data/${user?.email}`, {
      role: role,
    });
    refetch();
    toast({
      title: <span style={{ color: "#00D26A" }}>Success!</span>,
      description: "Great job! The parcel is now in the hands of the receiver.",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
  }

  // Handle location and open modal
  function handleLocation(latitude, longitude) {
    setLocation({ latitude, longitude });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="px-10 pt-5 pb-20">
        <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
          My Deliveries
        </h1>
        <p className="text-gray-600 pb-10 text-center">
          View all es assigned to you for delivery
        </p>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Parcel Delivery</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this parcel delivery? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                No, keep it
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelStatus}>
                Yes, cancel delivery
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={isAlertOpenForDeliver}
          onOpenChange={setIsAlertOpenForDeliver}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Parcel Delivery</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this parcel as delivered? This
                action will update the delivery status and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsAlertOpenForDeliver(false)}
              >
                No, go back
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeliverStatus}>
                Yes, mark as delivered
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead></TableHead>
              <TableHead>Booked User’s Name</TableHead>
              <TableHead>Receivers Name</TableHead>
              <TableHead>Booked User’s Phone</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Receivers phone number</TableHead>
              <TableHead>Receivers Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Cancel & Deliver</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryListItems.map((e, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.receiversName}</TableCell>
                <TableCell>{e.phonenumber}</TableCell>
                <TableCell>{e.requestedDeliveryDate}</TableCell>
                <TableCell>{e.approximateDeliveryDate}</TableCell>
                <TableCell>{e.receiverPhoneNumber}</TableCell>
                <TableCell>{e.parcelDeliveryAddress}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => {
                      handleLocation(
                        e.deliveryAddressLatitude,
                        e.deliveryAddressLongitude
                      );
                    }}
                    className="text-xs"
                  >
                    Location
                  </Button>
                </TableCell>
                <TableCell className="flex flex-col items-start justify-center gap-1">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedParcelId(e._id);
                      setIsAlertOpen(true);
                    }}
                    disabled={e.status !== "On The Way"}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedParcelIdForDeliver(e._id);
                      setIsAlertOpenForDeliver(true);
                    }}
                    disabled={e.status !== "On The Way"}
                    className="text-xs"
                  >
                    Deliver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for Map */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Map</h2>
            <div style={{ height: "300px", width: "100%" }}>
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.latitude, location.longitude]}>
                  <Popup>Delivery Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDelivery;
