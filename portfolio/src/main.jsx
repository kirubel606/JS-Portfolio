import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './pages/App.jsx'
import Contact from "./pages/contact.jsx";
import Index from "./pages/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/Projects",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);