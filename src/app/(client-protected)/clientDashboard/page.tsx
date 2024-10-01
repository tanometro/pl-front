"use client";
import React, { useEffect, useState } from "react";
import readOneFullClient from "@/services/requests/readOneFullClient";
import { FullCLientInterface } from "@/types/CLientTypes";

const ClientDashboard: React.FC = () => {
  const client_id = "08417f82-6d34-4fb0-bbd5-1b2d97c00e20";
  const [client, setClient] = useState<FullCLientInterface>();

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
                src={client?.profile_image.data || "/download.png"}
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
            {client?.loans?.map((loan: any, index: any) => {
              const isLoanOverdue = loan.quotas?.some((quota: any) =>
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
              client?.investments ? "border-red-500" : "border-green-500"
            }`}
          >
            <h1 className="text-3xl mb-4 border-b-2 border-black">
              Mis Inversiones
            </h1>
            {client?.investments ? (
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
