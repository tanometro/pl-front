import createPayment from "@/services/requests/createPayment";
import { LoansData } from "@/types/LoansTypes";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

const LoansAccordion = ({ loans }: LoansData) => {
  // Función para verificar si el préstamo está en mora
  const isLoanInMora = (quotas: any[]) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth()+1).padStart(2, "0");
    const currentPeriod = `${currentYear}${currentMonth}`;
    const currentDay = new Date().getDate();

    return quotas.some(
      (quota) =>
        quota.state === "PENDING" &&
        (quota.period < Number(currentPeriod) ||
          (quota.period === Number(currentPeriod) && currentDay > 10))
    );
  };

  return (
    <div className="space-y-4">
      {loans && loans.length > 0 ? (
        loans.map((loan) => (
          <div key={loan.id} className="border rounded-md shadow-lg p-4">
            <div className="flex-row justify-between items-center">
              <h3 className="text-lg font-semibold">Prestamo 1</h3>
              <h3 className="text-lg font-semibold">Monto total: $ {loan.amount}</h3>
              <h3 className="text-lg font-semibold">Estado: {loan.state}</h3>
              <h3 className="text-lg font-semibold">
                Cantidad de Cuotas: {loan.plan}
              </h3>
              <h3 className="text-lg font-semibold">
                Prestamista:{" "}
                {loan.type === "OWN" ? "Prestamo Lider" : "Terceros"}
              </h3>
              {/* Aquí se agrega el aviso de 'Prestamo en Mora' o 'Prestamo al Día' */}
              <div
                className={`${
                  isLoanInMora(loan.quotas)
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                } mt-2 px-4 py-2 rounded-md text-center w-1/4`}
              >
                {isLoanInMora(loan.quotas)
                  ? "Prestamo en Mora"
                  : "Prestamo al Día"}
              </div>
            </div>
            <LoanQuotas quotas={loan.quotas} />
          </div>
        ))
      ) : (
        <div className="border rounded-md shadow-lg p-4 text-center">
          <h3 className="text-lg font-semibold">
            El cliente no tiene préstamos activos
          </h3>
        </div>
      )}
    </div>
  );
};
const LoanQuotas = ({ quotas }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession()
  const client_id = session?.user.user.client.id

  const paidQuota = async (client_id: string, quota_id: string) => {
    const paymentData = {
      client_id,
      quota_id,
    };
    await createPayment(paymentData).then((response) => {
      window.location.href = response?.data.url;;
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mt-2 px-4 py-2 rounded-md text-center w-1/4 bg-blue-500"
      >
        {isOpen ? "Ocultar" : "Ver Cuotas"}
      </button>
      {isOpen && (
        <table className="mt-4 min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Monto</th>
              <th className="border border-gray-300 px-4 py-2">Periodo</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Punitorio</th>
              <th className="border border-gray-300 px-4 py-2">Pagar</th>
            </tr>
          </thead>
          <tbody>
            {quotas
            .sort((a: any, b: any) => a.period - b.period)
            .map((quota: any) => (
              <tr key={quota.id}>
                <td className="border border-gray-300 px-4 py-2">
                  $ {quota.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${String(quota.period).slice(4, 6)}/${String(
                    quota.period
                  ).slice(0, 4)}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {" "}
                  {quota.state === "PENDING" ? "PENDIENTE" : "AL DIA"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  % {quota.punitive}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      quota.state === "PAID"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 text-white"
                    }`}
                    disabled={quota.state === "PAID"}
                    onClick={() => paidQuota(client_id, quota.id)}
                  >
                    Pagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoansAccordion;
