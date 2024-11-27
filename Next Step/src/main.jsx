import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import SingleCard from "./Components/SingleCard.jsx";
import Cards from "./Components/Cards.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./PrivateRouter/PrivateRouter.jsx";
import Profile from "./PrivateRouter/Profile.jsx";
import { HelmetProvider } from "react-helmet-async";
import ForgetPass from "./Pages/ForgetPass.jsx";
import Resources from "./Pages/Resources.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <Cards></Cards>,
            loader: () => fetch("/services.json"),
          },
        ],
      },
      {
        path: "/card/:id",
        element: (
          <PrivateRouter>
            <SingleCard></SingleCard>
          </PrivateRouter>
        ),
        loader: () => fetch("/services.json"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "/forget",
        element: <ForgetPass></ForgetPass>,
      },
      {
        path: "/resources",
        element: (
          <PrivateRouter>
            <Resources></Resources>
          </PrivateRouter>
        ),
        loader: async () => {
          const blogRes = await fetch("/blogs.json");
          const blogData = await blogRes.json();

          const videosRes = await fetch("/videos.json");
          const videosData = await videosRes.json();

          return { blogData, videosData };
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </HelmetProvider>
  </StrictMode>
);
