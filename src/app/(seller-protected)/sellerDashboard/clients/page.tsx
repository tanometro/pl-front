"use client";
import React, { useEffect, useState } from "react";
import { FullClientInterface } from "@/types/ClientTypes";
import readClientsOfOneSeller from "@/services/requests/readClientsOfOneSeller";

const Clients = () => {
  const seller_id = "3b47832c-4bf6-444c-b742-c99a474aa71d";
  const [clients, setClients] = useState<FullClientInterface[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const sellerData = await readClientsOfOneSeller(seller_id);
        setClients(sellerData);
      } catch (error) {
        console.error("Error al Obtener el Vendedor", error);
      }
    };
    fetchClients();
  }, [seller_id]);

  const [openClientId, setOpenClientId] = useState<string | null>(null);
  const [openLoanId, setOpenLoanId] = useState<string | null>(null);

  const toggleClient = (clientId: string) => {
    setOpenClientId(openClientId === clientId ? null : clientId);
  };

  const toggleLoan = (loanId: string) => {
    setOpenLoanId(openLoanId === loanId ? null : loanId);
  };
  console.log(clients);
  return (
    <div>
      {clients.map((client) => (
        <div
          key={client.id}
          className="border border-gray-300 mb-4 p-4 rounded-lg"
        >
          <h2 className="text-lg font-bold cursor-pointer">
            {client.name || "Nombre no disponible"}
          </h2>
          <p>Email: {client.email}</p>
          <p>Telefono: {client.phone}</p>
          <p>DNI: {client.dni}</p>
          <p>CUIT/CUIL: {client.cuil_cuit}</p>
          <button
            onClick={() => toggleClient(client.id)}
            className="bg-lime-500 border-solid shadow-sm p-1 rounded-md"
          >
            Ver Prestamos
          </button>

          {/* Acordeón para préstamos */}
          {openClientId === client.id && (
            <div>
              <h3 className="font-semibold mt-2">Préstamos</h3>
              {client.loans.length > 0 ? (
                client.loans.map((loan: any) => (
                  <div
                    key={loan.id}
                    className="border border-gray-200 mb-2 p-2 rounded"
                  >
                    <p className="flex justify-between items-center">
                      <span>Monto: {loan.amount}</span>
                      <button
                        onClick={() => toggleLoan(loan.id)}
                        className=" bg-lime-500 p-1 border-solid rounded-md"
                      >
                        {openLoanId === loan.id
                          ? "Ocultar Cuotas"
                          : "Ver Cuotas"}
                      </button>
                    </p>

                    {/* Acordeón para cuotas */}
                    {openLoanId === loan.id && (
                      <div className="mt-2">
                        <h4 className="font-semibold">Cuotas</h4>
                        {loan.quotas.length > 0 ? (
                          loan.quotas.map((quota: any) => (
                            <div
                              key={quota.id}
                              className="border border-gray-300 mb-1 p-1 rounded"
                            >
                              <p>Estado: {quota.state}</p>
                              <p>Monto: {quota.amount}</p>
                              <p>Periodo: {quota.period}</p>
                            </div>
                          ))
                        ) : (
                          <p>No hay cuotas disponibles.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No hay préstamos disponibles.</p>
              )}
            </div>
          )}

          {/* Lista de inversiones */}
          <div>
            <h3 className="font-semibold mt-2">Inversiones</h3>
            {client?.investments?.length > 0 ? (
              client?.investments?.map((investment) => (
                <div
                  key={investment.id}
                  className="border border-gray-200 mb-1 p-1 rounded"
                >
                  <p>Capital: {investment.starting_capital}</p>
                </div>
              ))
            ) : (
              <p>No hay inversiones disponibles.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Clients;
