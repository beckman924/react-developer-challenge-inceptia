"use client";

import { useEffect } from "react";

export default function Loading({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (setLoading) {
      setLoading(true);
    }
  }, [setLoading]);

  return (
    <div
      className={`${
        loading ? "animate-pulse" : ""
      } h-screen flex items-center justify-center`}
    >
      <p className="text-3xl">Loading...</p>
    </div>
  );
}
