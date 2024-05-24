"use client";

import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Cases, Clients, TableData } from "@/types";
import { DatePicker } from "./ui/DatePicker";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { inboundCase } from "@/lib/utils";
import Searchbar from "./Searchbar";
import TableFilterButtons from "./TableFilterButtons";

export default function Reports({
  selectedClient,
}: {
  selectedClient: Clients;
}) {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [fromDateToAPI, setFromDateToAPI] = useState<string>("");
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [toDateToAPI, setToDateToAPI] = useState<string>("");
  const [paginationData, setPaginationData] = useState<Cases | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const { data, isFetching } = useQuery<TableData[]>({
    queryKey: ["data", page, fromDateToAPI, toDateToAPI],
    queryFn: async (): Promise<TableData[]> => {
      if (fromDateToAPI && toDateToAPI) {
        const data = await inboundCase(
          page
            ? `http://localhost:3000/api/inbound-case/?bot=${selectedClient.id}&fromDate=${fromDateToAPI}&toDate=${toDateToAPI}&page=${page}`
            : `http://localhost:3000/api/inbound-case/?bot=${selectedClient.id}&fromDate=${fromDateToAPI}&toDate=${toDateToAPI}`
        );

        setPaginationData(data);

        const transformedData: TableData[] = data.results.map((item) => ({
          gestionado: item.last_updated ? item.last_updated : null,
          id_case: item.case_uuid,
          tel: item.phone,
          dni: item.extra_metadata?.dni ?? null,
          grupo: item.extra_metadata?.grupo ?? null,
          orden: item.extra_metadata?.orden ?? null,
          llamada: item.case_duration,
          estado: item.case_result.name,
        }));

        return transformedData;
      } else {
        return [];
      }
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-screen h-screen max-h-[652px]">
      <div className="flex items-center w-full h-[45px] border border-y-[#eff3f9] justify-between">
        <h3 className="text-base text-black/60 p-2.5">REPORTES</h3>

        <Searchbar search={globalFilter} setSearch={setGlobalFilter} />
      </div>

      <div className="w-full overflow-x-auto my-2 flex items-center justify-between">
        <div className="flex items-center ml-2">
          <h3 className="text-sm text-black p-2.5">Detalle</h3>
          <h3 className="text-sm text-black/50 p-2.5">Dashboards</h3>
        </div>

        <div className="flex items-center justify-between space-x-5 text-sm">
          <div className="pl-10 flex items-center">
            <DatePicker
              date={fromDate}
              setDate={setFromDate}
              text="Desde"
              setDateToAPI={setFromDateToAPI}
            />
            <DatePicker
              date={toDate}
              setDate={setToDate}
              text="Hasta"
              disabledBefore={fromDate}
              setDateToAPI={setToDateToAPI}
            />
          </div>
        </div>
      </div>

      <TableFilterButtons globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="w-full h-full">
        {fromDateToAPI === "" || toDateToAPI === "" ? (
          <p className="text-sm text-black/50 p-5">
            Seleccione un rango de fechas
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={data ? data : []}
            paginationData={paginationData}
            setPage={setPage}
            isFetching={isFetching}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
      </div>
    </div>
  );
}
