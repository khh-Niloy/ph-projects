// "use client";

// import dynamic from "next/dynamic";
// const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";

// export default function DeliveryLocation({
//   deliveryAddressLongitude,
//   deliveryAddressLatitude,
// }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

//   function handleLocation(latitude, longitude) {
//     setLocation({ latitude, longitude });
//     setIsModalOpen(true);
//   }

//   return (
//     <div>
//       <Button
//         onClick={() =>
//           handleLocation(deliveryAddressLatitude, deliveryAddressLongitude)
//         }
//         variant="outline"
//       >
//         Location
//       </Button>

//       {isModalOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box relative">
//             <button
//               className="btn btn-sm btn-circle absolute right-2 top-2"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-bold mb-4">Map</h2>
//             <div style={{ height: "300px", width: "100%" }}>
//               {typeof window !== "undefined" && (
//                 <LeafletMap
//                   latitude={location.latitude}
//                   longitude={location.longitude}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
