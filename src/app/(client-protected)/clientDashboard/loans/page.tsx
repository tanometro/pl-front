"use client";

import React, { useEffect, useState } from "react";
import ClientLoans from "@/components/ClientComponents/ClientLoans";
import readLoansOfOneClient from "@/services/requests/readLoansOfOneClient";
import { LoansData } from "@/types/LoansTypes";


function Loans() {
  const [data, setData] = useState<LoansData>();
  const client_id = "08417f82-6d34-4fb0-bbd5-1b2d97c00e20";
  useEffect(() => {
    const fetchFullClient = async () => {
      try {
        const loansData = await readLoansOfOneClient(client_id);
        setData(loansData);
      } catch (error) {
        console.error("Error al obtener Los PRESTAMOS:", error);
      }
    };
    fetchFullClient();
  }, [client_id]);
console.log(data)
  return (
    <div>
      <ClientLoans loans={data?.loans} message={data?.message} />
    </div>
  );
}

export default Loans;
