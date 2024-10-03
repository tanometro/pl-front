"use client";
import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
import readLoansOfOneClient from "@/services/requests/readLeadsOfOneSeller";
import deleteLead from "@/services/requests/deleteLead";
import { LeadInterface } from "@/types/LeadsTypes";
import { leadsColumns } from "@/types/tableColumns";
import DeleteButton from "@/components/Buttons/DeleteButton";

export default function Leads() {
  const seller_id = "3b47832c-4bf6-444c-b742-c99a474aa71d";
  const [leads, setLeads] = useState<LeadInterface[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const leadsData = await readLoansOfOneClient(seller_id);
        setLeads(leadsData);
      } catch (error) {
        console.error("Error al Obtener el Vendedor", error);
      }
    };
    fetchSeller();
  }, [seller_id]);

  const HandleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Error al eliminar el lead", error);
    }
  };

  const table = useReactTable({
    data: leads,
    columns: leadsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <main>
      <div className="rounded-lg w-full h-1/6 mb-4 justify-between">
        <span className="m-2 text-lg text-black">
          Filtrar por cualquier Propiedad
        </span>
        <input
          className="rounded-lg text-black bg-gray-300 border-black border-solid"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="h-4/6">
        <table className="min-w-full rounded-lg w-full h-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-slate-300 text-2xl text-black border-solid border"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-slate-300 border-solid border"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted()
                          ? { asc: "⬆️", desc: "⬇️" }[
                              header.column.getIsSorted() as "asc" | "desc"
                            ]
                          : null}
                      </div>
                    )}
                  </th>
                ))}
                <th className="border-slate-300 border-solid border">
                  Eliminar
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-slate-400" : "bg-slate-200"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-slate-300 border-solid border text-xl text-black"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="border-slate-300 border-solid border text-xl w-2 text-white">
                  <div className="flex justify-center">
                    <DeleteButton
                      onClickFunction={() =>
                        HandleDeleteLead(row.getValue("id"))
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
