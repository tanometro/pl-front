"use client";
import readOneSeller from "@/services/requests/readOneSeller";
import { SellersInterface } from "@/types/SellersTypes";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const seller_id = "3b47832c-4bf6-444c-b742-c99a474aa71d";
  const [seller, setSeller] = useState<SellersInterface>();

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const sellerData = await readOneSeller(seller_id);
        setSeller(sellerData);
      } catch (error) {
        console.error("Error al Obtener el Vendedor", error);
      }
    };
    fetchSeller();
  }, [seller_id]);

  return (
    <main className="flex w-full">
      <div className="border-blue-500 border p-4 rounded-lg w-1/2 m-2">
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
          <strong>DNI: </strong>
          <span className="text-gray-700">
            {seller?.dni || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>CUIT/CUIL: </strong>
          <span className="text-gray-700">
            {seller?.cuil_cuit || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento: </strong>
          <span className="text-gray-700">
            {seller?.dob || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Telefono: </strong>
          <span className="text-gray-700">
            {seller?.phone || "No disponible"}
          </span>
        </p>
      </div>
      <div className="border-blue-500 border p-4 rounded-lg w-1/2 m-2">
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
          <strong>Numero: </strong>
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
          <strong>Codigo Postal: </strong>
          <span className="text-gray-700">
            {seller?.address?.cp || "No disponible"}
          </span>
        </p>
      </div>
    </main>
  );
}
