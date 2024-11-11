"use client";
import React, { useState } from "react";

const ReferentsData = ({ client }: any) => {
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
        </div>
      )}
    </div>
  );
};

export default ReferentsData;
