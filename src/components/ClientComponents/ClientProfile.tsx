'use client'
import { useEffect, useState } from "react";

const ClientDetails = ({ client, onSave }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [clientData, setClientData] = useState(client);

  useEffect(() => {
    setClientData(client);
  }, [client]);
console.log(clientData)
  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setClientData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(clientData.id, clientData);
  };

  const referentsIsNull = clientData?.referents?.some((referent: any) => referent === null)

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-xl font-semibold mb-4">Cargando datos...</p>
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.296-1.51A5.994 5.994 0 016 12H2c0 2.485.904 4.742 2.395 6.492l1.299-1.201z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {/* Botón para habilitar la edición */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {isEditing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {/* Layout de dos columnas */}
      <div className="grid grid-cols-2 gap-6">
        {/* Columna 1 */}
        <div className="space-y-6">
          {/* Datos Personales */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Datos Personales</h2>
            <p>
              <strong>Nombre:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={clientData?.name}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.name
              )}
            </p>
            <p>
              <strong>Apellido:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={clientData?.last_name}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.last_name
              )}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="dob"
                  value={clientData?.dob}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.dob
              )}
            </p>
            <p>
              <strong>DNI:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="dni"
                  value={clientData?.dni}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.dni
              )}
            </p>
            <p>
              <strong>CUIL/CUIT:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="cuil_cuit"
                  value={clientData?.cuil_cuit}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.cuil_cuit
              )}
            </p>
          </div>

          {/* Datos Laborales */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Datos Laborales</h2>
            {clientData?.job_data ? (
              <>
                <p>
                  <strong>Empresa:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="job_data.company"
                      value={clientData?.job_data?.company}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.job_data?.company
                  )}
                </p>
                <p>
                  <strong>Posición:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="job_data.position"
                      value={clientData?.job_data?.position}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.job_data?.position
                  )}
                </p>
                <p>
                  <strong>Salario:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="job_data.salary"
                      value={clientData?.job_data?.salary}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.job_data?.salary
                  )}
                </p>
              </>
            ) : (
              <p>No se han cargado datos laborales.</p>
            )}
          </div>
        </div>

        {/* Columna 2 */}
        <div className="space-y-6">
          {/* Dirección */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Dirección</h2>
            <p>
              <strong>Calle:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address.street"
                  value={clientData?.address?.street}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.address?.street
              )}
            </p>
            <p>
              <strong>Número:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address.number"
                  value={clientData?.address?.number}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.address?.number
              )}
            </p>
            <p>
              <strong>Ciudad:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address.city"
                  value={clientData?.address?.city}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.address?.city
              )}
            </p>
            <p>
              <strong>Código Postal:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address.cp"
                  value={clientData?.address?.cp}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                clientData?.address?.cp
              )}
            </p>
          </div>

          {/* Datos Bancarios */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Datos Bancarios</h2>
            {clientData?.bank_data ? (
              <>
                <p>
                  <strong>Banco:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="bank_data.bank_name"
                      value={clientData?.bank_data?.bank_name}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.bank_data?.bank_name
                  )}
                </p>
                <p>
                  <strong>CBU:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="bank_data.cbu"
                      value={clientData?.bank_data?.cbu}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.bank_data?.cbu
                  )}
                </p>
              </>
            ) : (
              <p>No se han cargado datos bancarios.</p>
            )}
          </div>

          {/* Datos de Tarjetas */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Datos de Tarjetas</h2>
            {clientData?.card_data ? (
              <>
                <p>
                  <strong>Tipo de Tarjeta:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="card_data.type"
                      value={clientData?.card_data?.type}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.card_data?.type
                  )}
                </p>
                <p>
                  <strong>Número de Tarjeta:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name="card_data.number"
                      value={clientData?.card_data?.number}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    clientData?.card_data?.number
                  )}
                </p>
              </>
            ) : (
              <p>No se han cargado datos de tarjetas.</p>
            )}
          </div>

          {/* Referentes */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Referentes</h2>
            {clientData?.referents && !referentsIsNull ? (
              clientData?.referents.map((referent: any, index: any) => (
                <div key={index}>
                  <strong>Nombre:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name={`referents[${index}].name`}
                      value={referent?.name}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    referent.name
                  )}
                </div>
              ))
            ) : (
              <p>No se han cargado referentes.</p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de guardar */}
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
