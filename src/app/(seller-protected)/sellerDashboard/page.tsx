"use client";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import readOneSeller from "@/services/requests/readOneSeller";

const SellerDashboard: React.FC = () => {
  const seller_id = "3b47832c-4bf6-444c-b742-c99a474aa71d";
  const [seller, setSeller] = useState();
  const QRValue = `https://localhost:3000/${seller_id}`;
  const qrRef = useRef<HTMLDivElement>(null)

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(QRValue)
      .then(() => {
        alert("Link copiado al portapapeles!");
      })
      .catch(err => {
        console.error("Error al copiar el link: ", err);
      });
  };

  return (
    <div className="flex flex-col justify-center text-center items-center content-center">
      <div className="h-1/5 w-1/5" ref={qrRef}>
        <h1 className="text-2xl mb-4 font-bold">Mi código QR</h1>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={QRValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div>
        <h1 className="text-2xl mb-2 mt-16 font-bold">Mi link</h1>
        <h1 className="text-3xl">👇</h1>
        <h1>{QRValue}</h1>
      </div>
      <button 
        onClick={handleCopyLink} 
        className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        Copiar Link
      </button>
    </div>
  );
};
export default SellerDashboard;
