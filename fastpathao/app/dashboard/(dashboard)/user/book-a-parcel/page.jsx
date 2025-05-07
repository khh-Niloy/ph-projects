import { getServerSession } from "next-auth";
import ParcelForm from "./components/ParcelForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BookParcel = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="min-h-screen  py-8 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Book a Parcel {session?.data?.user?.role || "hi"}
          </h1>
          <p className=" text-gray-600">
            Fill in the details to book your parcel delivery
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* <ParcelForm></ParcelForm> */}
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
