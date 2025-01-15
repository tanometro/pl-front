"use client";
import patchSeller from "@/services/requests/patchSeller";
import { useState } from "react";

const PersonalData = ({ seller }: any) => {
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: seller?.name || "",
    last_name: seller?.last_name || "",
    dob: seller?.dob || "",
    dni: seller?.dni || "",
    cuil_cuit: seller?.cuil_cuit || "",
    email: seller?.email || "",
    phone: seller?.phone || "",
    profile_image: seller?.profile_image || "",
  });

  const [addressData, setAddressData] = useState({
    street: seller?.address?.street || "",
    number: seller?.address?.number || "",
    neighborhood: seller?.address?.neighborhood || "",
    city: seller?.address?.city || "",
    province: seller?.address?.province || "",
    cp: seller?.address?.cp || "",
  });

  const openPersonalModal = () => {
    setPersonalData({
      name: seller?.name || "",
      last_name: seller?.last_name || "",
      dob: seller?.dob || "",
      dni: seller?.dni || "",
      cuil_cuit: seller?.cuil_cuit || "",
      email: seller?.email || "",
      phone: seller?.phone || "",
      profile_image: seller?.profile_image || "",
    });
    setIsPersonalModalOpen(true);
  };

  const openAddressModal = () => {
    setAddressData({
      street: seller?.address?.street || "",
      number: seller?.address?.number || "",
      neighborhood: seller?.address?.neighborhood || "",
      city: seller?.address?.city || "",
      province: seller?.address?.province || "",
      cp: seller?.address?.cp || "",
    });
    setIsAddressModalOpen(true)
  };

  const updatePersonalData = async () => {
    try {
      const { name, last_name, dob, dni, cuil_cuit, email, phone } = personalData;
      await patchSeller(seller.id, { name, last_name, dob, dni, cuil_cuit, email, phone});
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPersonalModalOpen(false);
    }
  };

  const updateAddressData = async () => {
    try {
      await patchSeller(seller.id, { address: addressData });
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
            {seller?.name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">
            {seller?.last_name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">
            {seller?.dob || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">
            {seller?.dni || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>CUIL/CUIT: </strong>
          <span className="text-gray-700">
            {seller?.cuil_cuit || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">
            {seller?.email || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">
            {seller?.phone || "No disponible"}
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
            {seller?.address?.street || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Número: </strong>
          <span className="text-gray-700">
            {seller?.address?.number || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Barrio: </strong>
          <span className="text-gray-700">
            {seller?.address?.neighborhood || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Ciudad: </strong>
          <span className="text-gray-700">
            {seller?.address?.city || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Provincia: </strong>
          <span className="text-gray-700">
            {seller?.address?.province || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Código Postal: </strong>
          <span className="text-gray-700">
            {seller?.address?.cp || "No disponible"}
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
