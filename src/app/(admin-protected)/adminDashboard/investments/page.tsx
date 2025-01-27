"use client";
import React, { Suspense, useEffect, useState } from "react";
import ViewButton from "@/components/Buttons/ViewButton";
import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/Buttons/DeleteButton";
import readAllInvestments from "@/services/requests/readAllInvestments";
import { InvestmentInterface } from "@/types/InvestmetsTypes";
import deleteInvestment from "@/services/requests/deleteInvestment";
import uploadImage from "@/services/requests/upLoadImage";
import patchInvestment from "@/services/requests/patchInvestment";
import { FaSquareWhatsapp } from "react-icons/fa6";
import DownloadButton from "@/components/Buttons/DownloadButton";
import UploadButton from "@/components/Buttons/UploadButton";
import ConfirmButton from "@/components/Buttons/ConfirmButton";

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

const Investments = () => {
  const [allInvestments, setAllInvestments] = useState<InvestmentInterface[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentInterface | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isConfirmInvestmentModalOpen, setIsConfirmInvestmentModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [newFile, setNewFile] = useState<{
    name: string;
    data: string | null;
  }>({ name: "", data: null });
  const [editableInvestment, setEditableInvestment] = useState<InvestmentInterface | null>(selectedInvestment);

  const handleFileChange = (newFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewFile((prev) => ({
        ...prev,
        name: `Contrato de inversión Nro ${selectedInvestment?.id}`,
        data: reader.result as string,
        type: newFile.type,
      }));
    };
    reader.readAsDataURL(newFile);
  }

  const handleAddImage = async () => {
    if (newFile.name && newFile.data) {
      const imageDto = {
        name: newFile.name,
        data: newFile.data,
        client: selectedInvestment?.client?.id,
      };
      try {
        const updateState = {
          state: 'Esperando Firma'
        }
        const response = await uploadImage(imageDto);
        await patchInvestment(selectedInvestment?.id, updateState)
        alert('Contrato enviado con exito')
        window.location.reload();
      } catch (error) {
        alert(`Error al enviar el contrato :  ${error}`)
      }

      setIsFileModalOpen(false)
    }
  };

  const handleConfirmInvestment = async (confirmedInvestment: InvestmentInterface | null) => {
    try {
      const updatedInvestment = {
        ...confirmedInvestment,
        state: "Inversion Confirmada"
      };
      const response = await patchInvestment(selectedInvestment?.id, updatedInvestment);
      alert(response.message)
      setIsConfirmInvestmentModalOpen(false)
      window.location.reload();
    } catch (error) {
      alert(`Error al confirmar la Inversion :  ${error}`)
    }
  }

  const downloadContract = (investment: any) => {
    const contractName = `Contrato de inversión Nro ${investment.id} FIRMADO`;
    const contract: any = investment?.client?.images?.find((c: any) => c.name === contractName);

    if (contract) {
      const link = document.createElement('a');
      link.href = `${contract.data}`;
      link.download = `${contractName}.pdf`;
      link.click();
    } else {
      alert('No se encontró el contrato para esta inversión.');
    }
  };

  const columns = [
    "Capital Inicial",
    "Capital Actual",
    "Intereses",
    "Estado",
    "Cliente",
    "Acciones",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const investmentsList = await readAllInvestments();
      setAllInvestments(investmentsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleDelete = async (investmentId: number | undefined) => {

    if (!investmentId) return;

    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar la inversión?`
    );

    if (!confirmed) return;
    try {
      await deleteInvestment(investmentId);
      setAllInvestments((prevInvestments) =>
        prevInvestments.filter((investment) => investment.id !== investmentId)
      );
      alert(`Inversion ${investmentId} eliminada`);
    } catch (error) {
      console.error(`Error eliminando inversion ${investmentId}:`, error);
    }
  };

  const renderInvestmentRow = (investment: InvestmentInterface, index: number) => (
    <tr key={index}>
      <td>{`$ ${investment.starting_capital}`}</td>
      <td>{investment.current_capital ? `$ ${investment.current_capital}` : 'Sin Confirmar'}</td>
      <td>{investment.rate ? `% ${investment.rate}` : 'Sin Confirmar'}</td>
      <td className=" font-bold text-sm">{investment.state}</td>
      <td>
        {investment.client ? (
          <div className="flex align-middle">
            <ViewButton
              onClickFunction={() => {
                setSelectedInvestment(investment);
                setIsClientModalOpen(true);
              }}
            />
            <a
              href={`https://wa.me/${investment.client?.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              <button className=" text-green-700 rounded-full">
                <FaSquareWhatsapp size={32} />
              </button>
            </a>
          </div>
        ) : (
          <>Not Client</>
        )}
      </td>
      <td className="flex">
        <ConfirmButton
          onClickFunction={() => {
            setSelectedInvestment(investment);
            setIsConfirmInvestmentModalOpen(true);
          }}
        />
        <ViewButton
          onClickFunction={() => {
            setSelectedInvestment(investment);
            setIsInvestmentModalOpen(true);
          }}
        />
        <UploadButton
          onClickFunction={() => {
            setSelectedInvestment(investment);
            setIsFileModalOpen(true);
          }}
        />
        <DownloadButton
          onClickFunction={() => {
            setSelectedInvestment(investment)
            downloadContract(investment)

          }}
        />
        <DeleteButton onClickFunction={() => handleDelete(investment.id)} />
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Inversiones</h1>
      </div>
      <DataTable columns={columns} data={allInvestments} renderRow={renderInvestmentRow} />


      {/* Modal */}
      {isInvestmentModalOpen && selectedInvestment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles de la Inversion</h3>
              <button
                onClick={() => setIsInvestmentModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            {/* Investment Details */}
            <div className="space-y-4 mb-4">
              <p>
                <strong>Capital Inicial:</strong> {`$ ${selectedInvestment.starting_capital}`}
              </p>
              <p>
                <strong>Capital Actual:</strong>{" "}
                {selectedInvestment.current_capital}
              </p>
              <p>
                <strong>Intereses:</strong> {selectedInvestment.rate}
              </p>
              <p>
                <strong>Plazo:</strong>{" "}
                {selectedInvestment.termn}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {selectedInvestment.state}
              </p>
            </div>
          </div>
        </div>
      )}

      {isConfirmInvestmentModalOpen && selectedInvestment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Editar Detalles y confirmar la Inversión</h3>
              <button
                onClick={() => setIsConfirmInvestmentModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            {/* Formulario de Edición */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmInvestment(editableInvestment);
              }}
              className="space-y-4 mb-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Capital Inicial:</label>
                <input
                  type="number"
                  value={editableInvestment?.starting_capital}
                  onChange={(e) =>
                    setEditableInvestment({
                      ...editableInvestment,
                      starting_capital: Number(e.target.value),
                    })
                  }
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Capital Actual:</label>
                <input
                  type="number"
                  value={editableInvestment?.current_capital}
                  onChange={(e) =>
                    setEditableInvestment({
                      ...editableInvestment,
                      current_capital: Number(e.target.value),
                    })
                  }
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Intereses:</label>
                <input
                  type="number"
                  step="0.01"
                  value={editableInvestment?.rate}
                  onChange={(e) =>
                    setEditableInvestment({
                      ...editableInvestment,
                      rate: Number(e.target.value),
                    })
                  }
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Plazo:</label>
                <input
                  type="number"
                  value={editableInvestment?.termn}
                  onChange={(e) =>
                    setEditableInvestment({
                      ...editableInvestment,
                      termn: Number(e.target.value),
                    })
                  }
                  className="border rounded px-4 py-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal */}
      {isInvestmentModalOpen && selectedInvestment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalles del Préstamo</h3>
              <button
                onClick={() => setIsInvestmentModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>

            {/* Investment Details */}
            <div className="space-y-4 mb-4">
              <p>
                <strong>Capital Inicial:</strong> {`$ ${selectedInvestment.starting_capital}`}
              </p>
              <p>
                <strong>Capital Actual:</strong>{" "}
                {selectedInvestment.current_capital}
              </p>
              <p>
                <strong>Intereses:</strong> {selectedInvestment.rate}
              </p>
              <p>
                <strong>Plazo:</strong>{" "}
                {selectedInvestment.termn}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {selectedInvestment.state}
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      {isFileModalOpen && selectedInvestment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Enviar Contrato</h2>
            <label>
              {newFile.name}
            </label>
            <br />
            <label>
              Seleccionar contrato (PDF):
              <input
                type="file"
                accept="application/pdf"
                placeholder="Seleccionar Archivo"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(file);
                  } else {
                    setNewFile((prev) => ({ ...prev, data: null, type: null }));
                  }
                }}
                className="ml-2"
              />
            </label>
            {newFile.data && (
              <div className="mt-4">
                <embed
                  src={newFile.data}
                  type="application/pdf"
                  className="w-64 h-64 mb-2"
                  title="Vista previa del PDF"
                />
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => handleAddImage()}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Subir contrato
              </button>
              <button
                onClick={() => setIsFileModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isClientModalOpen && selectedInvestment?.client && (
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
                className={`tab text-lg ${activeTab === "images" ? "tab-active" : ""
                  }`}
                onClick={() => setActiveTab("images")}
              >
                Imagenes
              </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              {activeTab === "personal" && selectedInvestment?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientPersonalData client={selectedInvestment?.client} />
                </div>
              )}
              {activeTab === "bank" && selectedInvestment?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientBankData client={selectedInvestment?.client} />
                </div>
              )}
              {activeTab === "job" && selectedInvestment?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientJobData client={selectedInvestment?.client} />
                </div>
              )}
              {activeTab === "referents" && selectedInvestment?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientReferentsData client={selectedInvestment?.client} />
                </div>
              )}
              {activeTab === "images" && selectedInvestment?.client && (
                <div className="bg-base-100 border-blue-500 rounded-box p-6">
                  <AdminClientImagesData client={selectedInvestment?.client} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments;