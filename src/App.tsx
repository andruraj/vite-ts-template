import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { store } from "./store";
import { router } from "./routes";
import "@/App.css";

export const App = () => (
  <ErrorBoundary
    fallbackRender={(error, resetErrorBoundary) => (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-text dark:bg-text dark:text-background">
        <div className="bg-white rounded-lg shadow shadow-black flex flex-col items-center gap-4 p-10">
          <div className="text-4xl font-bold">
            <span className="text-red-500">⚠️ Oops!</span> Something went wrong.
          </div>
          <div className="text-2xl text-red-500">
            {error?.message || "An Unexpected Error Occurred."}
          </div>
          <button
            className="bg-accent hover:brightness-125 text-text shadow shadow-black font-bold py-2 px-6 rounded mt-8"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
        </div>
      </div>
    )}
  >
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </ErrorBoundary>
);
