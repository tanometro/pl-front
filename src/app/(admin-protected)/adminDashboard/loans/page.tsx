"use client";
import React, { Suspense, useEffect, useState } from "react";
import ViewButton from "@/components/Buttons/ViewButton";
import DataTable from "@/components/DataTable/DataTable";
import readAllLoans from "@/services/requests/readAllLoans";
import { LoansInterface, QuotaInterface } from "@/types/LoansTypes";
import DeleteButton from "@/components/Buttons/DeleteButton";
import deleteLoan from "@/services/requests/deleteLoan";

const AdminClientPersonalData = React.lazy(
  () => import("@/components/AdminComponents/AdminClientPersonalData")
);
const AdminClientBankData = React.lazy(
  () => import("@/components/AdminComponents/AdminClientBankData")
);
const AdminClientJobData = React.lazy(
  () => import("@/components/AdminComponents/AdminClientJobData")
);
const AdminClientReferentsData = React.lazy(
  () => import("@/components/AdminComponents/AdminClientReferentsData")
);
const AdminClientImagesData = React.lazy(
  () => import("@/components/AdminComponents/AdminClientImagesData")
);

const Loans = () => {
  const [allLoans, setAllLoans] = useState<LoansInterface[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoansInterface | null>(null);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const columns = [
    "Monto",
    "Estado",
    "Plan",
    "Prestamista",
    "Cliente",
    "Acciones",
  ];
  const quotaColumns = ["Monto", "Estado", "Período", "Punitivo"];

  useEffect(() => {
    async function fetchData() {
      try {
        const loansList = await readAllLoans();
        setAllLoans(loansList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (loanId: string) => {
    try {
      await deleteLoan(loanId);
      setAllLoans((prevLoans) =>
        prevLoans.filter((loan) => loan.id !== loanId)
      );
      alert(`Prestamo ${loanId} eliminado`);
    } catch (error) {
      console.error(`Error eliminando prestamo ${loanId}:`, error);
    }
  };

  const renderLoanRow = (loan: LoansInterface, index: number) => (
    <tr key={index}>
      <td>{`$ ${loan.amount}`}</td>
      <td>{loan.state === "ACTIVE" ? "ACTIVO" : "FINALIZADO"}</td>
      <td>{`${loan.plan} Cuotas`}</td>
      <td>{loan.type === "OWN" ? "PRESTAMO LIDER" : "TERCEROS"}</td>
      <td>
        {loan.client ? (
          <ViewButton
            onClickFunction={() => {
              setSelectedLoan(loan);
              setIsClientModalOpen(true);
            }}
          />
        ) : (
          <>Not Client</>
        )}
      </td>
      <td className="flex">
        <ViewButton
          onClickFunction={() => {
            setSelectedLoan(loan);
            setIsLoanModalOpen(true);
          }}
        />
        <DeleteButton onClickFunction={() => handleDelete(loan.id)} />
      </td>
    </tr>
  );
  const renderQuotaRow = (quota: QuotaInterface, index: number) => (
    <tr key={index}>
      <td>{`$ ${quota.amount}`}</td>
      <td>{quota.state}</td>
      <td>{quota.period}</td>
      <td>{`$ ${quota.punitive}`}</td>
    </tr>
  );
  return (
    <div>
      <DataTable columns={columns} data={allLoans} renderRow={renderLoanRow}/>

      {/* Modal */}
      {isLoanModalOpen && selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Préstamo</h3>
              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            {/* Loan Details */}
            <div className="space-y-4 mb-4">
              <p>
                <strong>Monto:</strong> {`$ ${selectedLoan.amount}`}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {selectedLoan.state === "ACTIVE" ? "ACTIVO" : "FINALIZADO"}
              </p>
              <p>
                <strong>Plan:</strong> {selectedLoan.plan}
              </p>
              <p>
                <strong>Prestamista:</strong>{" "}
                {selectedLoan.type === "OWN" ? "PRESTAMO LIDER" : "TERCEROS"}
              </p>
            </div>

            {/* Mini Table for Quotas */}
            <div className="overflow-x-auto">
              <h4 className="text-md font-semibold mt-4 mb-2">Cuotas</h4>
              <DataTable
                columns={quotaColumns}
                data={selectedLoan.quotas}
                renderRow={renderQuotaRow}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isClientModalOpen && selectedLoan?.client && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Cliente</h3>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            {/* Tabs */}
            <div role="tablist" className="tabs tabs-lifted mb-4">
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${
                  activeTab === "personal" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Datos Personales
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${
                  activeTab === "bank" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("bank")}
              >
                Datos Bancarios
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${
                  activeTab === "job" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("job")}
              >
                Datos Laborales
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${
                  activeTab === "referents" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("referents")}
              >
                Garantes
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {activeTab === "personal" && selectedLoan?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientPersonalData client={selectedLoan?.client} />
                </div>
              )}
              {activeTab === "bank" && selectedLoan?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientBankData client={selectedLoan?.client} />
                </div>
              )}
              {activeTab === "job" && selectedLoan?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientJobData client={selectedLoan?.client} />
                </div>
              )}
              {activeTab === "referents" && selectedLoan?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientReferentsData client={selectedLoan?.client} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
