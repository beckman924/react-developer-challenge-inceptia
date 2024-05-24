import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function TableFilterButtons({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="w-full overflow-x-auto my-2 flex items-center space-x-4 ml-2 transition-all">
      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "" ? "text-black" : "text-black/50"
        )}
        onClick={() => setGlobalFilter("")}
      >
        TODOS
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Transferido" ? "text-black" : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Transferido"
            ? setGlobalFilter("")
            : setGlobalFilter("Transferido")
        }
      >
        TRANSFERIDO
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Niega confirmación datos"
            ? "text-black"
            : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Niega confirmación datos"
            ? setGlobalFilter("")
            : setGlobalFilter("Niega confirmación datos")
        }
      >
        NIEGA CONFIRMACIÓN DATOS
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Cliente no encontrado en DB"
            ? "text-black"
            : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Cliente no encontrado en DB"
            ? setGlobalFilter("")
            : setGlobalFilter("Cliente no encontrado en DB")
        }
      >
        CLIENTE NO ENCONTRADO EN DB
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Llamando" ? "text-black" : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Llamando"
            ? setGlobalFilter("")
            : setGlobalFilter("Llamando")
        }
      >
        LLAMANDO
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Cortó Cliente" ? "text-black" : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Cortó Cliente"
            ? setGlobalFilter("")
            : setGlobalFilter("Cortó Cliente")
        }
      >
        CORTÓ CLIENTE
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Mail Enviado" ? "text-black" : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Mail Enviado"
            ? setGlobalFilter("")
            : setGlobalFilter("Mail Enviado")
        }
      >
        MAIL ENVIADO
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "Indefinido" ? "text-black" : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "Indefinido"
            ? setGlobalFilter("")
            : setGlobalFilter("Indefinido")
        }
      >
        INDEFINIDO
      </Button>

      <Button
        variant={"ghost"}
        className={cn(
          "p-0 m-0 text-xs text-black/50 hover:bg-transparent",
          globalFilter === "No encontrado en DB"
            ? "text-black"
            : "text-black/50"
        )}
        onClick={() =>
          globalFilter === "No encontrado en DB"
            ? setGlobalFilter("")
            : setGlobalFilter("No encontrado en DB")
        }
      >
        NO ENCONTRADO EN DB
      </Button>
    </div>
  );
}
