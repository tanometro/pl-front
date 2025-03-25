"use client";
import patchSeller from "@/services/requests/patchSeller";
import { useState } from "react";

const PersonalData = ({ seller }: any) => {
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
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
    setError(null);
  };

  const validatePersonalData = () => {
    const newErrors: typeof errors = { name: '', dob: '', email: '', phone: '' }

    if (!/^\S+@\S+\.\S+$/.test(personalData.email)) {
      newErrors.email = "Por favor, ingrese un correo válido.";
    }
    if (!/^\d+$/.test(personalData.dni)) {
      newErrors.dni = "El DNI solo puede contener números.";
    }
    if (!personalData.dob || new Date(personalData.dob) > new Date()) {
      newErrors.dob = "La fecha de nacimiento no es válida.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const validateAddressData = () => {
    const newErrors: typeof errors = { cp: '' }
    if (addressData.cp && !/^\d{4,6}$/.test(addressData.cp)) {
      newErrors.cp = "El código postal debe contener entre 4 y 6 dígitos.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const updatePersonalData = async () => {

    if (validatePersonalData()) {
      try {
        const updatedData: any = await patchSeller(seller.id, personalData);
        setPersonalData((prev) => ({ ...prev, ...updatedData }));
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al actualizar los datos personales.");
      } finally {
        setIsPersonalModalOpen(false);
      }
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFieldsFilled = Object.values(personalData).every((value:
      any
    ) => value?.trim() !== "");
    return !hasErrors && allFieldsFilled;
  };

  const updateAddressData = async () => {

    if (validateAddressData()) {
      try {
        const updatedData: any = await patchSeller(seller.id, { address: addressData });
        setAddressData((prev) => ({ ...prev, ...updatedData.address }));
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al actualizar los datos de dirección.");
      } finally {
        setIsAddressModalOpen(false);
      }
    };
  }
  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
  };

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Por favor, ingrese un correo válido." }));
    } else if (name === "dni" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, dni: "El DNI solo puede contener números." }));
    } else if (name === "cuil_cuit" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, dni: "El CUIL/CUIT solo puede contener números." }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddressDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "number" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, number: "la altura solo puede contener números." }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
                  min="1920"
                  max={getMaxDate()}
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
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between">
                <button
                  onClick={updatePersonalData}
                >Guardar</button>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="ml-2 p-2"
                >
                  Cancelar
                </button>
              </div>
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
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between">
                <button
                  onClick={updateAddressData}
                >Guardar</button>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="ml-2 p-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
