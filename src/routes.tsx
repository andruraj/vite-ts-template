import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Navbar = lazy(() => import("@components/navigation"));
const RouteError = lazy(() =>
  import("@components/RouteError").then((m) => ({ default: m.RouteError }))
);
const Home = lazy(() =>
  import("@pages/Home").then((m) => ({ default: m.Home }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="h-screen w-screen flex flex-col bg-background text-text dark:bg-text dark:text-background">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    ),
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
