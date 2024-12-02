"use client";
import React, { Suspense, useEffect, useState } from "react";
import ViewButton from "@/components/Buttons/ViewButton";
import DataTable from "@/components/DataTable/DataTable";
import readAllLoans from "@/services/requests/readAllLoans";
import { LoansInterface, QuotaInterface } from "@/types/LoansTypes";
import DeleteButton from "@/components/Buttons/DeleteButton";
import deleteLoan from "@/services/requests/deleteLoan";
import readAllClients from "@/services/requests/readAllClients";
import createLoan from "@/services/requests/createLoan";

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
  const [isGrantLoanModalOpen, setIsGrantLoanModalOpen] = useState(false);
  const [newLoan, setNewLoan] = useState({
    amount: 0,
    plan: 0,
    client_id: '',
    type: 'OWN',
    cft: 0,
    quotas_new_loan: [
      {
        period: '',
        amount: 0,
        state: 'PENDING',
        punitive: 0
      }
    ]
  });
  const [clientList, setClienList] = useState([])

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const loansList = await readAllLoans();
      setAllLoans(loansList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
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

  useEffect(() => {
    const fetchClients = async () => {
      if (isGrantLoanModalOpen) {
        const clients = await readAllClients()
        setClienList(clients)
      }

    }
    fetchClients()
  }, [isGrantLoanModalOpen]);

  const handleCreateLoan = async () => {
    const { amount, plan, client_id, cft, type } = newLoan;

    const totalAmountWithCft = amount * (1 + cft / 100);

    const quotaAmount = totalAmountWithCft / plan;

    const quotas_new_loan = Array.from({ length: plan }, (_, index) => {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + index);
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

      return {
        amount: quotaAmount.toFixed(2),
        period: parseInt(`${year}${month}`),
        state: "PENDING",
        punitive: 0,
      };
    });

    const loanData = {
      amount: totalAmountWithCft,
      plan,
      type,
      quotas_new_loan,
      client_id,
    };
    await createLoan(loanData)
    setNewLoan({
      amount: 0,
      plan: 0,
      client_id: '',
      type: 'OWN',
      cft: 0,
      quotas_new_loan: [
        {
          period: '',
          amount: 0,
          state: 'PENDING',
          punitive: 0
        }
      ]
    })
    setIsGrantLoanModalOpen(false)
    fetchData()
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
  console.log(newLoan.type)
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Préstamos</h1>
        <button
          onClick={() => setIsGrantLoanModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Otorgar Préstamo
        </button>
      </div>
      <DataTable columns={columns} data={allLoans} renderRow={renderLoanRow} />

      {/* Modal de Otorgar Préstamo */}
      {isGrantLoanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Otorgar Préstamo</h3>
              <button
                onClick={() => setIsGrantLoanModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateLoan();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1">Tipo de Préstamo</label>
                <select
                  value={newLoan.type}
                  onChange={(e: any) => {
                    console.log('Tipo de préstamo:', e.target.value);
                    setNewLoan({ ...newLoan, type: e.target.value });
                  }}
                  className="border rounded w-full p-2"
                >
                  <option value="OWN">PROPIO</option>
                  <option value="THIRD">De Terceros</option>
                </select>
              </div>

              {/* Monto */}
              <div>
                <label className="block mb-1">Monto</label>
                <input
                  type="number"
                  value={newLoan.amount}
                  onChange={(e: any) =>
                    setNewLoan({ ...newLoan, amount: parseFloat(e.target.value) })
                  }
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              {/* Plan */}
              <div>
                <label className="block mb-1">Plan (Cuotas)</label>
                <input
                  type="number"
                  value={newLoan.plan}
                  onChange={(e: any) =>
                    setNewLoan({ ...newLoan, plan: parseInt(e.target.value, 10) })
                  }
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              {/* CFT */}
              <div>
                <label className="block mb-1">CFT (%)</label>
                <input
                  type="number"
                  value={newLoan.cft}
                  onChange={(e: any) =>
                    setNewLoan({ ...newLoan, cft: parseFloat(e.target.value) })}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              {/* Valor de la cuota */}
              <div>
                <label className="block mb-1">Valor de la Cuota</label>
                <input
                  type="text"
                  value={
                    newLoan.amount && newLoan.plan && newLoan.cft
                      ? (
                        (newLoan.amount * (1 + newLoan.cft / 100)) /
                        newLoan.plan
                      ).toFixed(2)
                      : "0.00"
                  }
                  className="border rounded w-full p-2 bg-gray-100"
                  readOnly
                />
              </div>

              {/* Cliente ID */}
              <div>
                <label className="block mb-1">Cliente</label>
                <select
                  value={newLoan.client_id || ""}
                  onChange={(e) =>
                    setNewLoan({ ...newLoan, client_id: e.target.value })
                  }
                  className="border rounded w-full p-2"
                  required
                >
                  <option value="" disabled>
                    Seleccione un cliente
                  </option>
                  {clientList?.map((client: any) => (
                    <option key={client.id} value={client.id}>
                      {client.name} {client.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón Crear Préstamo */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Crear Préstamo
              </button>
            </form>
          </div>
        </div>
      )}


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
                className={`tab text-lg ${activeTab === "personal" ? "tab-active" : ""
                  }`}
                onClick={() => setActiveTab("personal")}
              >
                Datos Personales
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${activeTab === "bank" ? "tab-active" : ""
                  }`}
                onClick={() => setActiveTab("bank")}
              >
                Datos Bancarios
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${activeTab === "job" ? "tab-active" : ""
                  }`}
                onClick={() => setActiveTab("job")}
              >
                Datos Laborales
              </button>
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${activeTab === "referents" ? "tab-active" : ""
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