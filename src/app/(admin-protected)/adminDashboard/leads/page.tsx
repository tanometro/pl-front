"use client";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import AssignButton from "@/components/Buttons/AssignButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import DataTable from "@/components/DataTable/DataTable";
import assignLead from "@/services/requests/assignLead";
import deleteLead from "@/services/requests/deleteLead";
import readAllLeads from "@/services/requests/readAllLeads";
import readAllSellers from "@/services/requests/readAllSellers";
import { LeadInterface } from "@/types/LeadsTypes";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";

Modal.setAppElement("#__next");

const Leads = () => {
  const [allLeads, setAllLeads] = useState<LeadInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [sellers, setSellers] = useState<any[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    async function fetchdata() {
      try {
        const leadsList = await readAllLeads();
        setAllLeads(leadsList);
        const sellersList = await readAllSellers();
        setSellers(sellersList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchdata();
  }, []);

  const openModal = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeller(null);
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      await deleteLead(leadId);
      setAllLeads((prevLeads) =>
        prevLeads.filter((lead) => lead.id !== leadId)
      );
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleAssignLead = async () => {
    if (selectedLeadId && selectedSeller) {
      try {
        const response = await assignLead(selectedLeadId, {
          seller_id: selectedSeller.value,
        });
        setAllLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === selectedLeadId
              ? { ...lead, seller_id: selectedSeller.value }
              : lead
          )
        );
        closeModal();
        if (response.ok) {
          setAlertMessage("Lead Asignado correctamente");
          setAlertType("success");
        } else {
          throw new Error("Algo salió mal al asignar el lead");
        }
      } catch (error) {
        setAlertMessage("Error al asignar el Lead");
        setAlertType("error");
      } finally {
        setAlertOpen(true);
      }
    }
  };

  const renderRow = (lead: LeadInterface, index: number) => (
    <tr key={index}>
      <td>{lead.name}</td>
      <td>{lead.dni}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.bank}</td>
      <td>{lead.amount}</td>
      <td>
        <div className="relative group inline-block">
          <DeleteButton onClickFunction={() => handleDeleteLead(lead.id)} />
        </div>
        {!lead.seller_id && (
          <div className="relative group inline-block ml-2">
            <AssignButton onClickFunction={() => openModal(lead.id)} />
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <div>
      <DataTable
        columns={[
          "Nombre",
          "DNI",
          "Email",
          "Teléfono",
          "Banco",
          "Monto",
          "Acciones",
        ]}
        data={allLeads}
        renderRow={renderRow}
      />
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
      {/* Modal para asignar lead */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg w-96 mx-auto text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Asignar Lead a Vendedor</h2>
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
            onClick={handleAssignLead}
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
    </div>
  );
};

export default Leads;
