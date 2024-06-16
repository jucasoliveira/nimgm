import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/services/routes.tsx";
// import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<p></p>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
