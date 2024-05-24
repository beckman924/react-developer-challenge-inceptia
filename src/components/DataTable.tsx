"use client";

import { useMemo, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Cases } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationData: Cases | null;
  setPage: React.Dispatch<React.SetStateAction<string | null>>;
  isFetching: boolean;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationData,
  setPage,
  isFetching,
  globalFilter,
  setGlobalFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const defaultData = useMemo<TData[]>(() => [], []);
  const prevPage = paginationData?.previous
    ? (paginationData?.previous.match(/[&]page=(\d+)/) || [])[1]
    : null;

  const nextPage = paginationData?.next
    ? (paginationData?.next.match(/[&]page=(\d+)/) || [])[1]
    : null;

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    rowCount:
      paginationData && Object.keys(paginationData).length > 0
        ? paginationData.count
        : 0,
    state: {
      sorting,
      globalFilter: globalFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  return (
    <div>
      <div className="rounded-md border h-[610px] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Ordenar en orden ascendente"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Ordenar en orden descendente"
                                : "Ordenar por defecto"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isFetching ? "Cargando..." : "No hay resultados"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (paginationData?.previous && prevPage) {
              setPage(prevPage);
            } else if (paginationData?.previous && !prevPage) {
              setPage(null);
            }
          }}
          disabled={(!paginationData?.previous && !prevPage) || isFetching}
        >
          {isFetching ? "Cargando..." : "Anterior"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (paginationData?.next && nextPage) {
              setPage(nextPage);
            } else {
              setPage(null);
            }
          }}
          disabled={(!paginationData?.next && !nextPage) || isFetching}
        >
          {isFetching ? "Cargando..." : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
