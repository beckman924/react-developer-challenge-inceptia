"use client";

import { Clients } from "@/types";
import { useEffect, useState } from "react";

import Loading from "./loading";
import ClientsSelector from "@/components/ClientsSelector";
import Reports from "@/components/Reports";

export default function Home() {
  const [clients, setClients] = useState<Clients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClient, setSelectedClient] = useState<Clients | null>(null);

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
        setSelectedClient(data[0]);
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
    <main className="p-5">
      {loading && <Loading loading={loading} setLoading={setLoading} />}

      {!loading && (
        <div className="w-full flex flex-row h-96">
          <ClientsSelector
            clients={clients}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />
          <Reports selectedClient={selectedClient} />
        </div>
      )}
    </main>
  );
}
