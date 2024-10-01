'use client'
import { useEffect, useState } from "react";

const BankData = ({ client }: any) => {

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Bancarios */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Datos Bancarios</h2>
        <p className="mb-2">
          <strong>CBU: </strong>
          <span className="text-gray-700">{client?.bank_data?.cbu || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Numero de Cuenta: </strong>
          <span className="text-gray-700">{client?.bank_data?.account || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Codigo de Banco: </strong>
          <span className="text-gray-700">{client?.bank_data?.bank_code || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Nombre del Banco: </strong>
          <span className="text-gray-700">{client?.bank_date?.banck_name || "No disponible"}</span>
        </p>
      </div>

      {/* Tarjeta */}
      <div className="border border-blue-500 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">Datos de mi Tarjeta</h2>
        <p className="mb-2">
          <strong>Numero de la Tarjeta: </strong>
          <span className="text-gray-700">{client?.card_data?.number || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Vencimiento: </strong>
          <span className="text-gray-700">{client?.card_data?.expire_date || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Nombre del titular: </strong>
          <span className="text-gray-700">{client?.card_data?.name_in_card || "No disponible"}</span>
        </p>
        <p className="mb-2">
          <strong>Codigo de Seguridad: </strong>
          <span className="text-gray-700">{client?.card_data?.security_code || "No disponible"}</span>
        </p>
      </div>
    </div>
  );
};

export default BankData;
