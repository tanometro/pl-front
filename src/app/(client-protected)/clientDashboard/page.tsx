"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ClientComponents/cardForResume";
import readOneClient from "@/services/requests/readOneClient";
import readLoansOfOneClient from "@/services/requests/readLoansOfOneClient";

const ClientDashboard: React.FC = () => {
  const client_id = "37a3ac0f-0a1d-469f-b9f0-652ee2ad095c";
  const [client, setClient] = useState();
  const [loans, setLoans] = useState();

  const isQuotaOverdue = (quota) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
  
    return quota.state === "PENDING" && (quota.period < currentMonth || (quota.period === currentMonth && currentDay > 10));
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientData = await readOneClient(client_id);
        setClient(clientData);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };
    fetchClient();
  }, [client_id]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loansData = await readLoansOfOneClient(client_id);
        setLoans(loansData.loans);
      } catch (error) {
        console.error("Error al obtener Los prestamos:", error);
      }
    };
    fetchLoans();
  }, [client_id]);
  const isClientDataIncomplete =
    client &&
    Object.values(client).some(
      (value) => value === null || value === undefined
    );
  const isLoanPending = loans?.some((loan) =>
    loan.quotas?.some((quota) => quota.state === "PENDING")
  );

  const isAnyQuotaOverdue = loans?.some(loan =>
    loan.quotas?.some(quota => isQuotaOverdue(quota))
  );

  return (
    <div className="h-fill w-fill p-4 m-4 grid grid-cols-2 place-items-center">
      <a href="/clientDashboard/loans">
        <Card
          title="Prestamos"
          content={
            <>
              {loans?.map((loan, index) => {
                const isLoanOverdue = loan.quotas?.some((quota) => isQuotaOverdue(quota));
        
                return (
                  <div key={index} className="mb-4">
                    <p>
                      <strong>Préstamo {index + 1}:</strong>
                      <span className={isLoanOverdue ? "text-red-500" : "text-green-500"}>
                        {isLoanOverdue ? " Con Deuda" : " Al día"}
                      </span>
                    </p>
                  </div>
                );
              })}
            </>
          }
          className={`border-2 p-4`}
        />
      </a>
      <Card title="Inversiones" content="MIS INVERSIONES" />
      <Card title="Quotas" content="MIS CUOTAS" />
      <a href="/clientDashboard/profile">
        <Card
          title="Mi perfil"
          content={
            <>
              {client?.name} <br />
              {client?.last_name}
              {isClientDataIncomplete ? (
                <div className="text-xl text-red-500">
                  Faltan completar datos
                </div>
              ) : (
                <></>
              )}
            </>
          }
          className={`border-2 p-4 ${
            isClientDataIncomplete ? "border-red-500" : "border-green-500"
          }`}
        />
      </a>
    </div>
  );
};

export default ClientDashboard;
