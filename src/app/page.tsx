export const dynamic = "force-dynamic";

import Dashboard from "@/components/Dashboard";
import { fetchClients } from "@/lib/utils";

export default async function Home() {
  const data = await fetchClients();

  return (
    <main className="p-5 overflow-hidden">
      <Dashboard clientsData={data} />
    </main>
  );
}
