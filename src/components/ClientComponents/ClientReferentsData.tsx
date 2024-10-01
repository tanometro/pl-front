"use client";
import { useEffect, useState } from "react";

import React from 'react';

const ReferentsData = ({ client }: any) => {
  const referents = client?.referents || []; // Manejar referents como un array vacío si no está definido

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Garante 1 */}
      <div className={`border p-4 rounded-lg ${referents.length > 0 ? "border-blue-500" : "border-red-500"}`}>
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Datos del Primer Garante</h2>
        <p className="mb-2">
          <strong>Nombre: </strong>
          <span className="text-gray-700">{referents[0]?.name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">{referents[0]?.last_name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">{referents[0]?.dob || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">{referents[0]?.dni || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Edad: </strong>
          <span className="text-gray-700">{referents[0]?.years_old || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">{referents[0]?.email || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">{referents[0]?.phone || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Sexo: </strong>
          <span className="text-gray-700">{referents[0]?.sex || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Relacion: </strong>
          <span className="text-gray-700">{referents[0]?.relation || "No disponible"}</span>
        </p>
      </div>

      {/* Datos Garante 2 */}
      <div className={`border p-4 rounded-lg ${referents.length > 1 ? "border-blue-500" : "border-red-500"}`}>
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Datos del Segundo Garante</h2>
        <p className="mb-2">
          <strong>Nombre: </strong>
          <span className="text-gray-700">{referents[1]?.name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">{referents[1]?.last_name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">{referents[1]?.dob || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">{referents[1]?.dni || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Edad: </strong>
          <span className="text-gray-700">{referents[1]?.years_old || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">{referents[1]?.email || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">{referents[1]?.phone || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Sexo: </strong>
          <span className="text-gray-700">{referents[1]?.sex || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Relacion: </strong>
          <span className="text-gray-700">{referents[1]?.relation || "No disponible"}</span>
        </p>
      </div>
    </div>
  );
};

export default ReferentsData;
