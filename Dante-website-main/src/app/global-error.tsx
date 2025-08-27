"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen animated-bg">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 p-6">
          <h2 className="text-3xl font-bold">Something went wrong</h2>
          <p className="text-gray-400 max-w-prose">
            An unexpected error occurred. You can try reloading the page or return to the home page.
          </p>
          <div className="flex gap-3">
            <button className="btn-primary" onClick={() => reset()}>
              Reload page
            </button>
            <a href="/" className="btn-secondary">Go home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
