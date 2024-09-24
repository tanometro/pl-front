"use client";
import React, { useEffect, useState } from "react";
import readOneFullClient from "@/services/requests/readOneFullClient";

const ClientDashboard: React.FC = () => {
  const client_id = "37a3ac0f-0a1d-469f-b9f0-652ee2ad095c";
  const [client, setClient] = useState();

  const isQuotaOverdue = (quota: any) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    return (
      quota.state === "PENDING" &&
      (quota.period < currentMonth ||
        (quota.period === currentMonth && currentDay > 10))
    );
  };

  useEffect(() => {
    const fetchFullClient = async () => {
      try {
        const clientData = await readOneFullClient(client_id);
        setClient(clientData);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };
    fetchFullClient();
  }, [client_id]);

  const isClientDataIncomplete =
    client &&
    Object.values(client).some(
      (value) => value === null || value === undefined
    );
  const isLoanPending = client?.loans?.some((loan: any) =>
    loan.quotas?.some((quota: any) => quota.state === "PENDING")
  );

  const isAnyQuotaOverdue = client?.loans?.some((loan: any) =>
    loan.quotas?.some((quota: any) => isQuotaOverdue(quota))
  );

  return (
    <main>
      <div className="w-full flex items-center justify-center">
        <a
          href="/clientDashboard/profile"
          className="w-1/4 h-full items-center justify-center place-items-center center"
        >
          <div
            className={`border-2 p-4 w-full h-full rounded-lg m-4 flex flex-col text-center justify-center items-center ${
              isClientDataIncomplete ? "border-red-500" : "border-green-500"
            }`}
          >
            <h1 className="text-3xl mb-4 border-b-2 border-black">MI Perfil</h1>
            <div className="h-24 w-24 rounded-full border border-black flex justify-center items-center">
              <img
                src={client?.image || "/download.png"}
                alt="Profile Image"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <h2>{client?.name}</h2>
            <h2>{client?.last_name}</h2>

            {isClientDataIncomplete ? (
              <div className="text-xl text-red-500">Faltan completar datos</div>
            ) : (
              <></>
            )}
          </div>
        </a>
      </div>
      <div className="h-full w-full p-4 m-4 flex items-center justify-center">
        <a
          href="/clientDashboard/loans"
          className="w-full h-full items-center justify-center"
        >
          <div
            className={`border-2 p-4 w-full h-full rounded-lg mr-8 flex-cole text-center items-center justify-center content-center ${
              isLoanPending ? "border-red-500" : "border-green-500"
            }`}
          >
            <h1 className="text-3xl mb-4 border-b-2 border-black">
              Mis Prestamos
            </h1>
            {client?.loans?.map((loan, index) => {
              const isLoanOverdue = loan.quotas?.some((quota) =>
                isQuotaOverdue(quota)
              );

              return (
                <div key={index} className="mb-4">
                  <p>
                    <strong>Préstamo {index + 1}:</strong>
                    <span
                      className={
                        isLoanOverdue ? "text-red-500" : "text-green-500"
                      }
                    >
                      {isLoanOverdue ? " Con Deuda" : " Al día"}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </a>
        <a href="/clientDashboard/investments" className="w-full h-full">
          <div
            className={`border-2 p-4 w-full h-full rounded-lg ml-8 flex flex-col text-center items-center justify-center content-center ${
              client?.investments?.length === 0
                ? "border-red-500"
                : "border-green-500"
            }`}
          >
            <h1 className="text-3xl mb-4 border-b-2 border-black">
              Mis Inversiones
            </h1>
            {client?.investments?.length === 0 ? (
              <p className="text-red-500 text-xl">No tiene inversiones</p>
            ) : (
              client?.investments?.map((investment: any, index: number) => (
                <div key={index} className="mb-4">
                  <p>
                    <strong>Inversión {index + 1}:</strong> {investment}
                  </p>
                </div>
              ))
            )}
          </div>
        </a>
      </div>
    </main>
  );
};

export default ClientDashboard;
