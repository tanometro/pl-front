'use client'
import { useEffect, useState } from "react";

const PersonalData = ({ client }: any) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Personales */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Datos Personales</h2>
        <p className="mb-2">
          <strong>Nombre: </strong>
          <span className="text-gray-700">{client?.name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Apellido: </strong>
          <span className="text-gray-700">{client?.last_name || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">{client?.dob || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>DNI: </strong>
          <span className="text-gray-700">{client?.dni || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>CUIL/CUIT: </strong>
          <span className="text-gray-700">{client?.cuil_cuit || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Email: </strong>
          <span className="text-gray-700">{client?.email || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">{client?.phone || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Sexo: </strong>
          <span className="text-gray-700">{client?.sex || "No disponible"}</span>
        </p>
      </div>

      {/* Dirección */}
      <div className="border border-blue-500 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Direccion</h2>
        <p className="mb-2">
          <strong>Calle: </strong>
          <span className="text-gray-700">{client?.address?.street || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Número: </strong>
          <span className="text-gray-700">{client?.address?.number || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Barrio: </strong>
          <span className="text-gray-700">{client?.address?.neighborhood || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Ciudad: </strong>
          <span className="text-gray-700">{client?.address?.city || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Provincia: </strong>
          <span className="text-gray-700">{client?.address?.province || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Código Postal: </strong>
          <span className="text-gray-700">{client?.address?.cp || "No disponible"}</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalData;
