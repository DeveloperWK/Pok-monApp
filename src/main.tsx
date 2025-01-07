import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Router from "./Router/Router.tsx";
import store from "./Store/reduxStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);


































































