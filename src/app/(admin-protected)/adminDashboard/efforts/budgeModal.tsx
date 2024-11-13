import patchArticle from "@/services/requests/patchArticle";
import patchGoldPiece from "@/services/requests/patchGolPiece";
import React, { useState } from "react";

const BudgeModal = (props: any) => {
  const [precio, setPrecio] = useState(0);
  const [cuotas, setCuotas] = useState<number>(1);
  const [detalleCuotas, setDetalleCuotas] = useState([]);

  const handlePrecioChange = (e: any) => {
    const nuevoPrecio = e.target.value;
    setPrecio(nuevoPrecio);
    calcularCuotas(nuevoPrecio, cuotas);
  };

  const handleCuotasChange = (e: any) => {
    const nuevaCantidadCuotas = e.target.value;
    setCuotas(nuevaCantidadCuotas);
    calcularCuotas(precio, nuevaCantidadCuotas);
  };

  const calcularCuotas = (precioTotal: number, cantidadCuotas: number) => {
    if (precioTotal > 0 && cantidadCuotas > 0) {
      const montoCuota = precioTotal / cantidadCuotas;
      const cuotasCalculadas: any = Array.from(
        { length: cantidadCuotas },
        (_, i) => ({
          number: i + 1,
          amount: Number(montoCuota.toFixed(2)),
          state: "PENDING",
        })
      );
      setDetalleCuotas(cuotasCalculadas);
    } else {
      props.setDetalleCuotas([]);
    }
  };

  const sendBadget = async () => {
    props.gold_piece_id
    ?await patchGoldPiece(props.gold_piece_id, {price: precio, quotas: detalleCuotas})
    :await patchArticle(props.article_id, {price: precio, quotas: detalleCuotas})
    props.setIsBudgetModalOpen(false);
    props.onBudgetUpdate()
  };
  return (
    <div className="bg-base-100 border-blue-500 rounded-box p-6">
      <p>Precio</p>
      <input
        type="number"
        value={precio}
        onChange={handlePrecioChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />

      <p>Cantidad de Cuotas</p>
      <select
        value={cuotas}
        onChange={handleCuotasChange}
        className="border border-gray-300 rounded p-2 mb-4"
      >
        {[...Array(12).keys()].map((n) => (
          <option key={n + 1} value={n + 1}>
            {n + 1} cuota{n + 1 > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <div className="flex w-full">
        <div className="w-full">
          <h4>Detalle de Cuotas</h4>
          {detalleCuotas.length > 0 ? (
            <ul className="mt-2 text-xl">
              {detalleCuotas.map((cuota: any) => (
                <li key={cuota.number}>
                  Cuota {cuota.number}: ${cuota.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Introduce el precio y la cantidad de cuotas.
            </p>
          )}
        </div>
        <div className="text-center w-full border border-gray-600 rounded-md bg-lime-500 content-center h-full">
          <button className="w-full h-full text-2xl p-8" onClick={sendBadget}>
            Confirmar Presupuesto
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgeModal;
