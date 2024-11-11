"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { FullClientInterface } from "@/types/ClientTypes";
import { clientDubtColumns } from "@/types/tableColumns";
import readAllClients from "@/services/requests/readAllClients";

export default function ClientsWithDebt() {
  const {data: session} = useSession()
  const seller_id = session?.user.user.seller.id
  const [clients, setClients] = useState<FullClientInterface[]>([]);
  const [clientsWithDebt, setClientsWithDebt] = useState<FullClientInterface[]>(
    []
  );

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await readAllClients();
        setClients(clientsData);

        const filteredClients: FullClientInterface[] = clientsData.filter(
          (client: FullClientInterface) =>
            client.loans.some((loan) =>
              loan.quotas.some((quote) => isQuotaOverdue(quote))
            )
        );
        setClientsWithDebt(filteredClients);
      } catch (error) {
        console.error("Error al obtener los clientes", error);
      }
    };
    fetchClients();
  }, []);

  const isQuotaOverdue = (quota: any) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const quotaYear = parseInt(String(quota.period).slice(0, 4), 10);
    const quotaMonth = parseInt(String(quota.period).slice(4, 6), 10);

    return (
      quota.state === "PENDING" &&
      (quotaYear < currentYear ||
        (quotaYear === currentYear &&
          (quotaMonth < currentMonth ||
            (quotaMonth === currentMonth && currentDay > 10))))
    );
  };

  const table = useReactTable({
    data: clientsWithDebt,
    columns: clientDubtColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main>
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
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
