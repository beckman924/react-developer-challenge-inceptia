"use client";

import { Clients } from "@/types";
import { useEffect, useState } from "react";

import Loading from "./loading";

export default function Home(): JSX.Element {
  const [clients, setClients] = useState<Clients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getClients = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch("/api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        const data = (await response.json()) as Clients[];
        setClients(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading && <Loading loading={loading} setLoading={setLoading} />}

      {!loading && (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>{client.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
