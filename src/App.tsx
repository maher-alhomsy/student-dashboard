import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./App.css";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
