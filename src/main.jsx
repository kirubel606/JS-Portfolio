import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./pages/App.jsx";
import Contact from "./pages/contact.jsx";
import Exp from "./pages/experience.jsx";
import Index from "./pages/index.jsx";
import About from "./components/Aboutme.jsx";
import Repo from "./pages/repos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/Projects",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/repo",
    element: <Repo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      {/* Your entire application goes here */}
    </RouterProvider>
  </React.StrictMode>
);
