import React from "react";

export default function PaymenSuccess() {
  return (
    <a href="/clientDashboard/loans">
      <div className="border shadow-lg bg-lime-300 h-full w-full mt-20 text-center flex-row justify-center items-center rounded-xl place-content-center">
        <h1 className="text-3xl text-black">
        ✅ El pago se ha realizado con exito</h1>
        <h1 className="text-3xl text-black mt-8">⬅️ Volver</h1>
      </div>
    </a>
  );
}
