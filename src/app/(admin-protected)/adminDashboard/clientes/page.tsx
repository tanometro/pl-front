"use client";
import React, { Suspense, useEffect, useState } from "react";
import readAllClients from "@/services/requests/readAllClients";
import { ClientsInterface } from "@/types/ClientsTypes";
import DataTable from "@/components/DataTable/DataTable";
import deleteClient from "@/services/requests/deleteClient";
import DeleteButton from "@/components/Buttons/DeleteButton";
import ViewButton from "@/components/Buttons/ViewButton";
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
const Clients = () => {
  const [allClients, setAllClients] = useState<ClientsInterface[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientsInterface | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const columns = ["Nombre", "Apellido", "Teléfono", "CUIL/CUIT", "Acciones"];

  useEffect(() => {
    async function fetchData() {
      try {
        const clientList = await readAllClients();
        setAllClients(clientList);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setAllClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientId)
      );
      console.log(`Cliente ${clientId} eliminado`);
    } catch (error) {
      console.error(`Error eliminando cliente ${clientId}:`, error);
    }
  };

  const renderRow = (client: ClientsInterface, index: number) => (
    <tr key={index}>
      <td>{client.name}</td>
      <td>{client.last_name}</td>
      <td>{client.phone}</td>
      <td>{client.cuil_cuit}</td>
      <td className="flex">
        <DeleteButton onClickFunction={() => handleDelete(client.id)} />
        <ViewButton
          onClickFunction={() => {
            setSelectedClient(client);
            setIsModalOpen(true);
            setActiveTab("personal");
          }}
        />
      </td>
    </tr>
  );
  return (
    <div>
      <DataTable columns={columns} data={allClients} renderRow={renderRow} />

      {/* Modal */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Cliente</h3>
              <button
                onClick={() => setIsModalOpen(false)}
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
              {activeTab === "personal" && selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientPersonalData client={selectedClient} />
                </div>
              )}
              {activeTab === "bank" && selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientBankData client={selectedClient} />
                </div>
              )}
              {activeTab === "job" && selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientJobData client={selectedClient} />
                </div>
              )}
              {activeTab === "referents" && selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientReferentsData client={selectedClient} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
