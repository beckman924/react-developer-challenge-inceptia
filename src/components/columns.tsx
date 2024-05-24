"use client";

import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { parse, differenceInSeconds } from "date-fns";
import { Icon } from "@iconify-icon/react";

import { TableData } from "@/types";

const sortByDate: SortingFn<TableData> = (rowA, rowB, columnId) => {
  const a = new Date(rowA.getValue(columnId));
  const b = new Date(rowB.getValue(columnId));
  return a > b ? 1 : -1;
};

const durationFormat = "HH:mm:ss";

const durationToSeconds = (duration: string): number => {
  const parsedDuration = parse(duration, durationFormat, new Date(0));
  return differenceInSeconds(parsedDuration, new Date(0));
};

const sortByCallDuration: SortingFn<TableData> = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId) as string;
  const b = rowB.getValue(columnId) as string;

  const durationA = durationToSeconds(a);
  const durationB = durationToSeconds(b);

  return durationA - durationB;
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "gestionado",
    header: "Gestionado",
    sortingFn: sortByDate,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Icon icon="ph:calendar" className="text-base" />
          <p className="text-red-400">{row.getValue("gestionado")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "id_case",
    header: "ID Caso",
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "tel",
    header: "Teléfono",
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "dni",
    header: "DNI",
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      return <p className="text-red-400">{row.getValue("dni")}</p>;
    },
  },
  {
    accessorKey: "grupo",
    header: "Grupo",
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      return <p className="text-red-400">{row.getValue("grupo")}</p>;
    },
  },
  {
    accessorKey: "orden",
    header: "Orden",
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      return <p className="text-red-400">{row.getValue("orden")}</p>;
    },
  },
  {
    accessorKey: "llamada",
    header: "Llamada",
    sortingFn: sortByCallDuration,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Icon icon="ph:cassette-tape-thin" className="text-base" />
          <p className="text-red-400">{row.getValue("llamada")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    sortingFn: "text",
    cell: ({ row }) => {
      const value: string = row.getValue("estado") as string;

      return (
        <div
          className={`${
            value.includes("no encontrado")
              ? "bg-[#fadde6]"
              : "bg-[#eff3f9]"
          } text-center uppercase rounded-[5px] py-2`}
        >
          <p
            className={`${
              value.includes("no encontrado")
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {row.getValue("estado")}
          </p>
        </div>
      );
    },
  },
];
