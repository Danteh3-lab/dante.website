"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging; avoids silent white screens
    // You can also send this to an external logging service.
    // eslint-disable-next-line no-console
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4 p-6">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-gray-400 max-w-prose">
        An unexpected error occurred while rendering this page. You can retry the
        operation or return to the home page.
      </p>
      <div className="flex gap-3">
        <button
          className="btn-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
        <a href="/" className="btn-secondary">Go home</a>
      </div>
    </div>
  );
}
