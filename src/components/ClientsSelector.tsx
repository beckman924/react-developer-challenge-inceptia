import { cn } from "@/lib/utils";
import { Clients } from "@/types";

export default function ClientsSelector({
  clients,
  selectedClient,
  setSelectedClient,
}: {
  clients: Clients[];
  selectedClient: Clients;
  setSelectedClient: React.Dispatch<React.SetStateAction<Clients>>;
}) {
  return (
    <aside className="h-screen max-h-[800px] w-[250px] max-w-[400px] bg-[#eff3f9]">
      <h3 className="text-base text-[#8f96aa] p-2.5 border h-[45px]">
        CLIENTE
      </h3>

      <ul className="w-full border border-y-[#eff3f9] flex flex-col justify-center overflow-y-auto">
        {clients.map((client) => (
          <li
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className={cn(
              "border p-2 border-y-white w-full cursor-pointer hover:bg-[#d7e4f5]/50 text-black/60 transition-all",
              {
                "bg-[#d7e4f5] border-y-none border-r-[#2f82d4] border-r-[3.5px] hover:bg-[#d7e4f5] text-[#2f82d4] font-semibold":
                  client === selectedClient,
              }
            )}
          >
            {client.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
