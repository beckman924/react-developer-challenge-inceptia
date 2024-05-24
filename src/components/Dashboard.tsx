"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Clients } from "@/types";
import ClientsSelector from "@/components/ClientsSelector";
import Reports from "@/components/Reports";

export default function Dashboard({ clientsData }: { clientsData: Clients[] }) {
  const [clients] = useState<Clients[]>(clientsData);
  const [selectedClient, setSelectedClient] = useState<Clients>(clientsData[0]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full flex flex-row">
        <ClientsSelector
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />

        <Reports selectedClient={selectedClient} />
      </div>
    </QueryClientProvider>
  );
}
