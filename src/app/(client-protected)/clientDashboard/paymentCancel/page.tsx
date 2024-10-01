import React from "react";

export default function PaymenCancel() {
  return (
    <a href="/clientDashboard/loans">
      <div className="border shadow-lg bg-red-100 h-full w-full mt-20 text-center flex-row justify-center items-center rounded-xl place-content-center">
        <h1 className="text-3xl text-black">❌ El pago ha sido Cancelado</h1>
        <h1 className="text-3xl text-black mt-8">⬅️ Volver</h1>
      </div>
    </a>
  );
}
