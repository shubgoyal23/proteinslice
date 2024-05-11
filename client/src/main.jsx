import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import {
  Layout,
  Home,
  Shop,
  Login,
  Register,
  Logout,
  About,
  Contact,
  Globalcart,
  Checkout,
  Payment,
  MyAccount,
  Dashboard,
  Edit,
  Address,
  AllOrders,
  Reviews,
  Verify,
  SendResetMail,
  ResetPassword,
  OrderDetails,
} from "./Components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>error</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "/account",
        element: <MyAccount />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "dash", element: <Dashboard /> },
          { path: "edit", element: <Edit /> },
          { path: "address", element: <Address /> },
          { path: "orders", element: <AllOrders /> },
          { path: "order", element: <OrderDetails /> },
          { path: "reviews", element: <Reviews /> },
        ],
      },
      { path: "/cart", element: <Globalcart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/payment", element: <Payment /> },
      { path: "/payment/success/:id", element: <App /> },
      { path: "/verify", element: <Verify /> },
      { path: "/forgot-password", element: <SendResetMail /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
