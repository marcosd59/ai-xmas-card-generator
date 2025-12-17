import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import HowTo from "./pages/HowTo.jsx";
import Architecture from "./pages/Architecture.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "como-usarlo", element: <HowTo /> },
      { path: "arquitectura", element: <Architecture /> },
    ],
  },
]);

export default router;
