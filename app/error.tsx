"use client";

import { redirect } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message.includes("Unauthorized")) {
    redirect("/login");
  }

  return (
    <html>
      <body>
        <main className="h-screen flex flex-col justify-center items-center">
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
