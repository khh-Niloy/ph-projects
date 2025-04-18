import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/Router.jsx";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Provider/AuthContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import ComponentProvider from "./Provider/ComponentProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ComponentProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </ComponentProvider>
    </QueryClientProvider>
  </>
);
