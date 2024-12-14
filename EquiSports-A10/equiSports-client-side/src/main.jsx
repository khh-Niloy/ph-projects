import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import AddEquipment from "./Pages/AddEquipment.jsx";
import AllEquipements from "./Pages/AllEquipements.jsx";
import Detailes from "./Pages/Detailes.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import MyList from "./Pages/MyList.jsx";
import Update from "./Pages/Update.jsx";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "./Pages/ErrorPage.jsx";
import DarkModeProvider from "./DarkModeProvider/DarkModeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://equi-sports-server-side.vercel.app/equipments"),
      },
      {
        path: "/addequipment",
        element: (
          <PrivateRoute>
            <AddEquipment></AddEquipment>
          </PrivateRoute>
        ),
      },
      {
        path: "/allsportsequipment",
        element: <AllEquipements></AllEquipements>,
        loader: () =>
          fetch("https://equi-sports-server-side.vercel.app/equipments"),
      },
      {
        path: "/detailes/:id",
        element: (
          <PrivateRoute>
            <Detailes></Detailes>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://equi-sports-server-side.vercel.app/equipments/${params.id}`
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/mylist",
        element: (
          <PrivateRoute>
            <MyList></MyList>
          </PrivateRoute>
        ),
        // loader: () =>
        //   fetch("https://equi-sports-server-side.vercel.app/equipments"),
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(
            `https://equi-sports-server-side.vercel.app/equipments/${params.id}`
          ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </DarkModeProvider>
  </StrictMode>
);
