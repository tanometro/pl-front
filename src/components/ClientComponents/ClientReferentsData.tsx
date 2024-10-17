"use client";
import patchClient from "@/services/requests/patchClient";
import { useState } from "react";

import React from "react";

const ReferentsData = ({ client }: any) => {
  const [isReferentOneModalOpen, setIsReferentOneModalOpen] = useState(false);
  const [isReferentTwoModalOpen, setIsReferentTwoModalOpen] = useState(false);
  let referentsToSend: any = [];

  const hasReferents =
    Array.isArray(client?.referents) && client.referents.length > 0;

  const [referentOne, setReferentOne] = useState({
    name:
      hasReferents && client.referents[0]
        ? client?.referents[0]?.name || ""
        : "",
    last_name:
      hasReferents && client.referents[0]
        ? client?.referents[0]?.last_name || ""
        : "",
    dob:
      hasReferents && client.referents[0] ? client?.referents[0]?.dob || "" : "",
    dni:
      hasReferents && client.referents[0] ? client?.referents[0]?.dni || "" : "",
    years_old:
      hasReferents && client.referents[0]
        ? client?.referents[0]?.years_old || ""
        : "",
    email:
      hasReferents && client.referents[0]
        ? client?.referents[0]?.email || ""
        : "",
    phone:
      hasReferents && client.referents[0]
        ? client?.referents[0]?.phone || ""
        : "",
    sex:
      hasReferents && client.referents[0] ? client?.referents[0]?.sex || "" : "",
    relation:
      hasReferents && client.referents[0]
        ? client.referents[0]?.relation || ""
        : "",
  });

  const [referentTwo, setReferentTwo] = useState({
    name:
      hasReferents && client.referents[1]
        ? client.referents[1]?.name || ""
        : "",
    last_name:
      hasReferents && client.referents[1]
        ? client.referents[1]?.last_name || ""
        : "",
    dob:
      hasReferents && client.referents[1] ? client.referents[1]?.dob || "" : "",
    dni:
      hasReferents && client.referents[1] ? client.referents[1]?.dni || "" : "",
    years_old:
      hasReferents && client.referents[1]
        ? client.referents[1]?.years_old || ""
        : "",
    email:
      hasReferents && client.referents[1]
        ? client.referents[1]?.email || ""
        : "",
    phone:
      hasReferents && client.referents[1]
        ? client.referents[1]?.phone || ""
        : "",
    sex:
      hasReferents && client.referents[1] ? client.referents[1]?.sex || "" : "",
    relation:
      hasReferents && client.referents[1]
        ? client.referents[1]?.relation || ""
        : "",
  });
  console.log(client);
  const openReferentOneModal = () => {
    setReferentOne({
      name: hasReferents ? client.referents[0]?.name || "" : "",
      last_name: hasReferents ? client.referents[0]?.last_name || "" : "",
      dob: hasReferents ? client.referents[0]?.dob || "" : "",
      dni: hasReferents ? client.referents[0]?.dni || "" : "",
      years_old: hasReferents ? client.referents[0]?.years_old || "" : "",
      email: hasReferents ? client.referents[0]?.email || "" : "",
      phone: hasReferents ? client.referents[0]?.phone || "" : "",
      sex: hasReferents ? client.referents[0]?.sex || "" : "",
      relation: hasReferents ? client.referents[0]?.relation || "" : "",
    });
    setIsReferentOneModalOpen(true);
  };

  const openReferentTwoModal = () => {
    setReferentTwo({
      name: hasReferents ? client.referents[1]?.name || "" : "",
      last_name: hasReferents ? client.referents[1]?.last_name || "" : "",
      dob: hasReferents ? client.referents[1]?.dob || "" : "",
      dni: hasReferents ? client.referents[1]?.dni || "" : "",
      years_old: hasReferents ? client.referents[1]?.years_old || "" : "",
      email: hasReferents ? client.referents[1]?.email || "" : "",
      phone: hasReferents ? client.referents[1]?.phone || "" : "",
      sex: hasReferents ? client.referents[1]?.sex || "" : "",
      relation: hasReferents ? client.referents[1]?.relation || "" : "",
    });
    setIsReferentTwoModalOpen(true);
  };

  const updateReferentsData = async () => {
    referentsToSend = [];

    if (referentOne?.name && referentOne?.dni) {
      referentsToSend.push(referentOne);
    }
    if (referentTwo?.name && referentTwo?.dni) {
      referentsToSend.push(referentTwo);
    }

    try {
      await patchClient(client.id, { referents: referentsToSend });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsReferentOneModalOpen(false);
      setIsReferentTwoModalOpen(false);
    }
  };
  const handleReferenOneDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReferentOne((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReferenTwoDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReferentTwo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Garante 1 */}
      <div className="border p-4 rounded-lg border-blue-500">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos del Primer Garante
        </h2>
        <p className="mb-2">
          <strong>Nombre: </strong>
          <span className="text-gray-700">
            {referentOne?.name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">
            {referentOne?.last_name || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">
            {referentOne?.dob || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">
            {referentOne?.dni || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Edad: </strong>
          <span className="text-gray-700">
            {referentOne?.years_old || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">
            {referentOne?.email || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">
            {referentOne?.phone || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Sexo: </strong>
          <span className="text-gray-700">
            {referentOne?.sex || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Relacion: </strong>
          <span className="text-gray-700">
            {referentOne?.relation || "No disponible"}
          </span>
        </p>
        <button
          onClick={openReferentOneModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos del primer Referente
        </button>
      </div>

      {/* Datos Garante 2 */}
      {referentTwo && (
        <div className={`border p-4 rounded-lg border-blue-500`}>
          <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
            Datos del Segundo Garante
          </h2>
          <p className="mb-2">
            <strong>Nombre: </strong>
            <span className="text-gray-700">
              {referentTwo?.name || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Apellido: </strong>
            <span className="text-gray-700">
              {referentTwo?.last_name || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Fecha de Nacimiento: </strong>
            <span className="text-gray-700">
              {referentTwo?.dob || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>DNI: </strong>
            <span className="text-gray-700">
              {referentTwo?.dni || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Edad: </strong>
            <span className="text-gray-700">
              {referentTwo?.years_old || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Email: </strong>
            <span className="text-gray-700">
              {referentTwo?.email || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Telefono: </strong>
            <span className="text-gray-700">
              {referentTwo?.phone || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Sexo: </strong>
            <span className="text-gray-700">
              {referentTwo?.sex || "No disponible"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Relacion: </strong>
            <span className="text-gray-700">
              {referentTwo?.relation || "No disponible"}
            </span>
          </p>
          <button
            onClick={openReferentTwoModal}
            className="bg-blue-600 text-white rounded-lg p-2"
          >
            Editar datos del segundo Referente
          </button>
        </div>
      )}

      {isReferentOneModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Editar Datos del Primer Garante
            </h2>
            <form>
              <div className="mb-2">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={referentOne.name}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="last_name"
                  value={referentOne.last_name}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Fecha de Nacimiento:</label>
                <input
                  type="date"
                  name="dob"
                  value={referentOne.dob}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={referentOne.dni}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Edad:</label>
                <input
                  type="text"
                  name="years_old"
                  value={referentOne.years_old}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={referentOne.email}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Telefono:</label>
                <input
                  type="text"
                  name="phone"
                  value={referentOne.phone}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Sexo:</label>
                <select
                  name="sex"
                  value={referentOne.sex}
                  onChange={handleReferenOneDataChange}
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
              <div className="mb-2">
                <label>Relacion:</label>
                <input
                  type="text"
                  name="relation"
                  value={referentOne.relation}
                  onChange={handleReferenOneDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateReferentsData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsReferentOneModalOpen(false)}
                className="ml-2 p-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {isReferentTwoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Editar Datos del Segundo Garante
            </h2>
            <form>
              <div className="mb-2">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={referentTwo.name}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="last_name"
                  value={referentTwo.last_name}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Fecha de Nacimiento:</label>
                <input
                  type="date"
                  name="dob"
                  value={referentTwo.dob}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={referentTwo.dni}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Edad:</label>
                <input
                  type="text"
                  name="years_old"
                  value={referentTwo.years_old}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={referentTwo.email}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Telefono:</label>
                <input
                  type="text"
                  name="phone"
                  value={referentTwo.phone}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Sexo:</label>
                <select
                  name="sex"
                  value={referentTwo.sex}
                  onChange={handleReferenTwoDataChange}
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
              <div className="mb-2">
                <label>Relacion:</label>
                <input
                  type="text"
                  name="relation"
                  value={referentTwo.relation}
                  onChange={handleReferenTwoDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateReferentsData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsReferentTwoModalOpen(false)}
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

export default ReferentsData;
