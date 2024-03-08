import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { Layout, Home, Shop, Login, Register, Logout, About, Contact, Globalcart, Checkout, Payment, MyAccount } from "./Components/index";
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
         { path: "/account", element: <MyAccount /> },
         { path: "/cart", element: <Globalcart /> },
         { path: "/checkout", element: <Checkout /> },
         { path: "/payment", element: <Payment /> },
         { path: "/payment/success/:id", element: <App /> },
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
