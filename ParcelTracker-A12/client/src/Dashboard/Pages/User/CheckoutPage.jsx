import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { id } = useParams();
  const parcelID = id;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const { data: myParcelData = [], refetch } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-parcel/get-one-percel/${parcelID}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (myParcelData && myParcelData.price > 0) {
      purchase();
    }
  }, [myParcelData]);

  const purchase = async () => {
    const purchasePrice = myParcelData.price * 100;
    if (myParcelData.price > 0) {
      try {
        const { data } = await axiosSecure.post("/payment-intent", {
          price: purchasePrice,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setProcessing(false);
      return;
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: myParcelData?.name,
          email: myParcelData?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      navigate("/dashboard/paymentSuccessPage");
      toast.success("Payment successful!");
      await axiosSecure.patch(`/payment-status/${parcelID}`, {
        message: "done",
      });
    }
    setProcessing(false);
  };

  return (
    <div className="py-20 bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Secure Checkout
            </h2>
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6V7a4 4 0 00-8 0v4H4v6h16v-6h-2V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h2z"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Complete your payment of ${myParcelData.price?.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Card Information</span>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      padding: "10px 0",
                    },
                    invalid: {
                      color: "#E83434",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!stripe || processing}
              className="flex-1 bg-[#E83434] hover:bg-[#d42e2e] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Pay $${myParcelData.price?.toFixed(2)}`
              )}
            </button>
            <button
              type="button"
              className="px-4 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6V7a4 4 0 00-8 0v4H4v6h16v-6h-2V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h2z"
            />
          </svg>
          <span>Payments are secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
