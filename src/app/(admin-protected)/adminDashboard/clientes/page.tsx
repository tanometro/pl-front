"use client";
import React, { Suspense, useEffect, useState } from "react";
import readAllClients from "@/services/requests/readAllClients";
import { ClientsInterface } from "@/types/ClientsTypes";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import Modal from "react-modal";
import Select from "react-select";
import DataTable from "@/components/DataTable/DataTable";
import deleteClient from "@/services/requests/deleteClient";
import DeleteButton from "@/components/Buttons/DeleteButton";
import ViewButton from "@/components/Buttons/ViewButton";
import AssignButton from "@/components/Buttons/AssignButton";
import patchClient from "@/services/requests/patchClient";
import readAllSellers from "@/services/requests/readAllSellers";
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
const Clients = () => {
  const [allClients, setAllClients] = useState<ClientsInterface[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientsInterface | null>(
    null
  );
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sellers, setSellers] = useState<any[]>([]);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const columns = ["Nombre", "Apellido", "Teléfono", "CUIL/CUIT", "Acciones"];

  useEffect(() => {
    async function fetchData() {
      try {
        const clientList = await readAllClients();
        setAllClients(clientList);
        const sellersList = await readAllSellers();
        setSellers(sellersList);
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
        {!client.seller_id && (
          <div className="relative group inline-block ml-2">
            <AssignButton onClickFunction={() => openModal(client.id)} />
          </div>
        )}
      </td>
    </tr>
  );

  const openModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsAssignModalOpen(true);
  };

  const closeModal = () => {
    setIsAssignModalOpen(false);
    setSelectedSeller(null);
  };

  const handleAssignSeller = async () => {
    if (selectedClientId && selectedSeller) {
      try {
        const response: any = await patchClient(selectedClientId, {
          seller_id: selectedSeller.value,
        });
        setAllClients((prevClients) =>
          prevClients.map((client) =>
            client.id === selectedClientId
              ? { ...client, seller_id: selectedSeller.value }
              : client
          )
        );
        closeModal()
        if (response?.seller_id) {
          setAlertMessage("Cliente Asignado correctamente");
          setAlertType("success");
        } else {
          throw new Error("Algo salió mal al asignar el cliente");
        }
      } catch (error) {
        setAlertMessage("Error al asignar el cliente");
        setAlertType("error");
      } finally {
        setAlertOpen(true);
      }
    }
  };

  return (
    <div>
      <DataTable columns={columns} data={allClients} renderRow={renderRow} />
      {alertOpen && alertType === "success" && (
        <SuccessAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}

      {alertOpen && alertType === "error" && (
        <ErrorAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}
      <Modal
        isOpen={isAssignModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg w-96 mx-auto text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Asignar Cliente a Vendedor</h2>
        <Select
          options={sellers.map((seller) => ({
            value: seller.id,
            label: seller.name + " " + seller.last_name,
          }))}
          value={selectedSeller}
          onChange={setSelectedSeller}
          placeholder="Selecciona un vendedor"
          isSearchable
        />
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleAssignSeller}
            className="text-black bg-green-600 p-2 rounded-md mr-2"
            disabled={!selectedSeller}
          >
            Asignar
          </button>
          <button
            onClick={closeModal}
            className="text-black bg-red-600 p-2 rounded-md ml-2"
          >
            Cancelar
          </button>
        </div>
      </Modal>

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
              <button
                type="button"
                role="tab"
                className={`tab text-lg ${activeTab === "images" ? "tab-active" : ""
                  }`}
                onClick={() => setActiveTab("images")}
              >
                Imagenes
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
              {activeTab === "images" && selectedClient && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientImagesData client={selectedClient} />
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
