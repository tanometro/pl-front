"use client";
import patchClient from "@/services/requests/patchClient";
import { useState } from "react";

const PersonalData = ({ client }: any) => {
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: client?.name || "",
    last_name: client?.last_name || "",
    dob: client?.dob || "",
    dni: client?.dni || "",
    cuil_cuit: client?.cuil_cuit || "",
    email: client?.email || "",
    phone: client?.phone || "",
    sex: client?.sex || "",
    profile_image: client?.profile_image || "",
  });

  const [addressData, setAddressData] = useState({
    street: client?.address?.street || "",
    number: client?.address?.number || "",
    neighborhood: client?.address?.neighborhood || "",
    city: client?.address?.city || "",
    province: client?.address?.province || "",
    cp: client?.address?.cp || "",
  });

  const openPersonalModal = () => {
    setPersonalData({
      name: client?.name || "",
      last_name: client?.last_name || "",
      dob: client?.dob || "",
      dni: client?.dni || "",
      cuil_cuit: client?.cuil_cuit || "",
      email: client?.email || "",
      phone: client?.phone || "",
      sex: client?.sex || "",
      profile_image: client?.profile_image || "",
    });
    setIsPersonalModalOpen(true);
  };

  const openAddressModal = () => {
    setAddressData({
      street: client?.address?.street || "",
      number: client?.address?.number || "",
      neighborhood: client?.address?.neighborhood || "",
      city: client?.address?.city || "",
      province: client?.address?.province || "",
      cp: client?.address?.cp || "",
    });
    setIsAddressModalOpen(true)
  };

  const updatePersonalData = async () => {
    try {
      const { name, last_name, dob, dni, cuil_cuit, email, phone, sex } = personalData;
      await patchClient(client.id, { name, last_name, dob, dni, cuil_cuit, email, phone, sex });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPersonalModalOpen(false);
    }
  };

  const updateAddressData = async () => {
    try {
      await patchClient(client.id, { address: addressData });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddressModalOpen(false);
    }
  };

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Personales */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos Personales
        </h2>
        <p className="mb-2">
          <strong>Nombre: </strong>
          <span className="text-gray-700">
            {client?.name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">
            {client?.last_name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">
            {client?.dob || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">
            {client?.dni || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>CUIL/CUIT: </strong>
          <span className="text-gray-700">
            {client?.cuil_cuit || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">
            {client?.email || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">
            {client?.phone || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Sexo: </strong>
          <span className="text-gray-700">
            {client?.sex || "No disponible"}
          </span>
        </p>
        <button
          onClick={openPersonalModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos Personles
        </button>
      </div>

      {/* Dirección */}
      <div className="border border-blue-500 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Direccion
        </h2>
        <p className="mb-2">
          <strong>Calle: </strong>
          <span className="text-gray-700">
            {client?.address?.street || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Número: </strong>
          <span className="text-gray-700">
            {client?.address?.number || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Barrio: </strong>
          <span className="text-gray-700">
            {client?.address?.neighborhood || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Ciudad: </strong>
          <span className="text-gray-700">
            {client?.address?.city || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Provincia: </strong>
          <span className="text-gray-700">
            {client?.address?.province || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Código Postal: </strong>
          <span className="text-gray-700">
            {client?.address?.cp || "No disponible"}
          </span>
        </p>
        <button
          onClick={openAddressModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos de Direccioon
        </button>
      </div>
      {/* Modal para editar datos Personales */}
      {isPersonalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Datos Personales</h2>
            <form>
              <div className="mb-2">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={personalData.name}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="last_name"
                  value={personalData.last_name}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Fecha de nacimiento:</label>
                <input
                  type="date"
                  name="dob"
                  value={personalData.dob}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={personalData.dni}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>CUIT/CUIL:</label>
                <input
                  type="text"
                  name="cuil_cuit"
                  value={personalData.cuil_cuit}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={personalData.email}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Telefono:</label>
                <input
                  type="text"
                  name="phone"
                  value={personalData.phone}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Sexo:</label>
                <select
                  name="sex"
                  value={personalData.sex}
                  onChange={handlePersonalDataChange}
                  className="border p-2 w-full"
                >
                  <option value="">Selecciona tu género</option>{" "}
                  {/* Opción por defecto */}
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="No binario">No binario</option>
                  <option value="Prefiero no decirlo">
                    Prefiero no decirlo
                  </option>
                </select>
              </div>
              <button
                type="button"
                onClick={updatePersonalData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsPersonalModalOpen(false)}
                className="ml-2 p-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar datos de tarjeta */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Editar Datos de Direccion
            </h2>
            <form>
              <div className="mb-2">
                <label>Calle:</label>
                <input
                  type="text"
                  name="street"
                  value={addressData.street}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Numero:</label>
                <input
                  type="text"
                  name="number"
                  value={addressData.number}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Barrio:</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={addressData.neighborhood}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Ciudad:</label>
                <input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Provincia:</label>
                <input
                  type="text"
                  name="province"
                  value={addressData.province}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>CP:</label>
                <input
                  type="text"
                  name="cp"
                  value={addressData.cp}
                  onChange={handleAddressDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateAddressData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
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

export default PersonalData;
