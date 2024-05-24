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
    console.error(error);
  }, [error]);

  return (
    <div
      className="h-screen flex flex-col items-center justify-center space-y-5"
      onClick={() => reset()}
    >
      <h2 className="text-3xl">Error al obtener los clientes</h2>
      <p className="text-xl">Haga click para intentar de nuevo</p>
    </div>
  );
}
