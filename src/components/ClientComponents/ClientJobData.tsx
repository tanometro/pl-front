"use client";
import patchClient from "@/services/requests/patchClient";
import { useEffect, useState } from "react";

const JobData = ({ client }: any) => {
  const [isJobDataModalOpen, setIsJobDataModalOpen] = useState(false);

  const [jobData, setJobData] = useState({
    social_rason: client?.job_data?.social_rason || "",
    cuit: client?.job_data?.cuit || "",
    entry_date: client?.job_data?.entry_date || "",
    gross_salary: client?.job_data?.gross_salary || "",
    bank: client?.job_data?.bank || "",
    job_address: client?.job_data?.job_address || "",
    job_phone: client?.job_data?.job_phone || "",
  });

  const openJobDataModal = () => {
    setJobData({
      social_rason: client?.job_data?.social_rason || "",
      cuit: client?.job_data?.cuit || "",
      entry_date: client?.job_data?.entry_date || "",
      gross_salary: client?.job_data?.gross_salary || "",
      bank: client?.job_data?.bank || "",
      job_address: client?.job_data?.job_address || "",
      job_phone: client?.job_data?.job_phone || "",
    });
    setIsJobDataModalOpen(true);
  };

  const updateJobData = async () => {
    try {
      await patchClient(client.id, { job_data: jobData });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsJobDataModalOpen(false);
    }
  };

  const handleJobDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Laborales */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos Laborales
        </h2>
        <p className="mb-2">
          <strong>Razon Social: </strong>
          <span className="text-gray-700">
            {client?.job_data?.social_rason || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>CUIT: </strong>
          <span className="text-gray-700">
            {client?.job_data?.cuit || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Ingreso: </strong>
          <span className="text-gray-700">
            {client?.job_data?.entry_date || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Salario Bruto: </strong>
          <span className="text-gray-700">
            {client?.job_data?.gross_salary || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Banco de Cobro: </strong>
          <span className="text-gray-700">
            {client?.job_data?.bank || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Direccion Laboral: </strong>
          <span className="text-gray-700">
            {client?.job_data?.job_address || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono Laboral: </strong>
          <span className="text-gray-700">
            {client?.job_data?.job_phone || "No disponible"}
          </span>
        </p>
        <button
          onClick={openJobDataModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos Laborales
        </button>
      </div>
      {isJobDataModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Datos Laborales</h2>
            <form>
              <div className="mb-2">
                <label>Razon Social:</label>
                <input
                  type="text"
                  name="social_rason"
                  value={jobData.social_rason}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>CUIT:</label>
                <input
                  type="text"
                  name="cuit"
                  value={jobData.cuit}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Fecha de Ingreso:</label>
                <input
                  type="date"
                  name="entry_date"
                  value={jobData.entry_date}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Salario Bruto:</label>
                <input
                  type="text"
                  name="gross_salary"
                  value={jobData.gross_salary}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Banco de Cobro:</label>
                <input
                  type="text"
                  name="bank"
                  value={jobData.bank}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Direccion Laboral:</label>
                <input
                  type="text"
                  name="job_address"
                  value={jobData.job_address}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Telefono Laboral:</label>
                <input
                  type="text"
                  name="job_phone"
                  value={jobData.job_phone}
                  onChange={handleJobDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateJobData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsJobDataModalOpen(false)}
                className="ml-2 p-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobData;
