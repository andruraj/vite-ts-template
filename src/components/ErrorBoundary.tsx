import { Component, ErrorInfo, ReactNode } from "react";

// Define the props and state types for the ErrorBoundary
interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackRender?: (error: Error, resetErrorBoundary: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This lifecycle method is invoked after an error has been thrown by a descendant component
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // This method is invoked when an error is caught
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  // Reset error boundary state
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallbackRender } = this.props;

      // Render the fallback UI
      if (fallbackRender) {
        return fallbackRender(this.state.error!, this.resetErrorBoundary);
      }

      return (
        <div className="h-screen w-screen flex items-center justify-center bg-background text-text dark:bg-text dark:text-background">
          <div className="bg-white rounded-lg shadow shadow-black flex flex-col items-center gap-4 p-10">
            <div className="text-4xl font-bold">
              <span className="text-red-500">⚠️ Oops!</span> Something went
              wrong.
            </div>
            <div className="text-2xl text-red-500">
              {this.state.error?.message || "An Unexpected Error Occurred."}
            </div>
            <button
              className="bg-accent hover:brightness-125 text-text shadow shadow-black font-bold py-2 px-6 rounded mt-8"
              onClick={this.resetErrorBoundary}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
