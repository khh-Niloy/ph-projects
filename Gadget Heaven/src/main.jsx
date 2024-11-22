import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import CategoryTab from "./Components/CategoryTab.jsx";
import SingleProduct from "./Components/SingleProduct.jsx";
import Cart from "./Components/Cart.jsx";
import Wishlist from "./Components/Wishlist.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import Statistics from "./Pages/Statistics.jsx";
import FeedBack from "./Pages/FeedBack.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("/category.json"),
        children: [
          {
            path: "/",
            element: <CategoryTab></CategoryTab>,
            loader: () => fetch("/products.json"),
          },
          {
            path: "/home/:categoryName",
            element: <CategoryTab></CategoryTab>,
            loader: () => fetch("/products.json"),
          },
        ],
      },
      {
        path: "/p/:productId",
        element: <SingleProduct></SingleProduct>,
        loader: () => fetch("/products.json"),
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "",
            element: <Cart></Cart>,
          },
          {
            path: "/dashboard/cart",
            element: <Cart></Cart>,
          },
          {
            path: "/dashboard/wishlist",
            element: <Wishlist></Wishlist>,
          },
        ],
      },
      {
        path: "/stats",
        element: <Statistics></Statistics>,
      },
      {
        path: "/feedback",
        element: <FeedBack></FeedBack>,
      },
    ],
  },
  ,
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
