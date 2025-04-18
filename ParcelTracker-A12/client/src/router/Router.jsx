import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
// import Profile from "../Dashboard/Sidebar/Common/Profile";
import Login from "../LoginRegister/Login";
import Register from "../LoginRegister/Register";
import BookParcel from "../Dashboard/Pages/User/BookParcel";
import MyParcel from "../Dashboard/Pages/User/MyParcel";
import Statistics from "../Dashboard/Pages/Admin/Statistics";
import MyDelivery from "../Dashboard/Pages/DeliveryMan/MyDelivery";
import AllDeliveryMan from "../Dashboard/Pages/Admin/AllDeliveryMan";
import AllParcel from "../Dashboard/Pages/Admin/AllParcel";
import AllUser from "../Dashboard/Pages/Admin/AllUser";
import MyReview from "../Dashboard/Pages/DeliveryMan/MyReview";
import UpdateParcel from "../Dashboard/Pages/User/UpdateParcel";
import Profile from "../Dashboard/Sidebar/CommonMenu/Profile";
import Home from "../Home/Home";
import PrivateRouter from "./PrivateRouter";
import AdminPrivateRoutes from "./AdminPrivateRoutes";
import UserPrivateRoutes from "./UserPrivateRoutes";
import DeliverManPrivateRoutes from "./DeliverManPrivateRoutes";
import CheckoutPage from "@/Dashboard/Pages/User/CheckoutPage";
import PaymentSuccessPage from "@/Dashboard/Pages/User/PaymentSuccessPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ErrorPage from "@/Shared/ErrorPage";
import Message from "@/Dashboard/Sidebar/CommonMenu/Message";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      //admin
      {
        path: "/dashboard/statistics",
        element: (
          <AdminPrivateRoutes>
            <Statistics></Statistics>
          </AdminPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/alldeliverymen",
        element: (
          <AdminPrivateRoutes>
            <AllDeliveryMan></AllDeliveryMan>
          </AdminPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/allparcel",
        element: (
          <AdminPrivateRoutes>
            <AllParcel></AllParcel>
          </AdminPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/alluser",
        element: (
          <AdminPrivateRoutes>
            <AllUser></AllUser>
          </AdminPrivateRoutes>
        ),
      },

      // user
      {
        path: "/dashboard/bookparcel",
        element: (
          <UserPrivateRoutes>
            <BookParcel></BookParcel>
          </UserPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myparcel",
        element: (
          <UserPrivateRoutes>
            <MyParcel></MyParcel>
          </UserPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myparcel/update/:id",
        element: (
          <UserPrivateRoutes>
            <UpdateParcel></UpdateParcel>
          </UserPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/checkoutPage/:id",
        element: (
          <UserPrivateRoutes>
            <Elements stripe={stripePromise}>
              <CheckoutPage></CheckoutPage>
            </Elements>
          </UserPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/paymentSuccessPage",
        element: (
          <UserPrivateRoutes>
            <PaymentSuccessPage></PaymentSuccessPage>
          </UserPrivateRoutes>
        ),
      },

      //delivery men
      {
        path: "/dashboard/mydelivery",
        element: (
          <DeliverManPrivateRoutes>
            <MyDelivery></MyDelivery>
          </DeliverManPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myreview",
        element: (
          <DeliverManPrivateRoutes>
            <MyReview></MyReview>
          </DeliverManPrivateRoutes>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/message",
        element: (
          <PrivateRouter>
            <Message></Message>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
