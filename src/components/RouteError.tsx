import { useRouteError } from "react-router-dom";

// Define your custom error type based on the structure of the error you received
interface RouteError {
  status: number;
  statusText: string;
  data: string; // This can be a more detailed error message
  error?: Error; // Optional error object
}

// Ensure that the RouteError component is wrapped in an ErrorBoundary
export const RouteError = () => {
  const error = useRouteError() as RouteError; // You already receive the error object here

  // Log the error for debugging purposes
  console.error("Route error:", error);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background text-text dark:bg-text dark:text-background">
      <div className="bg-white rounded-lg shadow shadow-black flex flex-col items-center gap-4 p-10">
        <div className="text-4xl font-bold">
          <span className="text-accent">⚠️ Oops!</span> Something went wrong.
        </div>
        <div className="text-2xl text-red-500">
          {error?.status === 404
            ? "The page you are looking for was not found."
            : error?.data || "An Unexpected Error Occurred."}
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-accent hover:brightness-125 text-text shadow shadow-black font-bold py-2 px-6 rounded mt-8"
            onClick={() => window.location.assign("/")}
            aria-label="Home"
          >
            Home
          </button>
          <button
            className="bg-accent hover:brightness-125 text-text shadow shadow-black font-bold py-2 px-6 rounded mt-8"
            onClick={() => window.location.reload()}
            aria-label="Reload"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
