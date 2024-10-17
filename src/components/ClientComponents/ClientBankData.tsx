import patchClient from "@/services/requests/patchClient";
import { useState } from "react";

const BankData = ({ client }: any) => {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState(client?.card_data?.number);

  const [bankData, setBankData] = useState({
    cbu: client?.bank_data?.cbu || "",
    account: client?.bank_data?.account || "",
    bank_code: client?.bank_data?.bank_code || "",
    bank_name: client?.bank_data?.bank_name || "",
  });

  const [cardData, setCardData] = useState({
    number: cardNumber || "",
    expire_date: client?.card_data?.expire_date || "",
    name_in_card: client?.card_data?.name_in_card || "",
    security_code: client?.card_data?.security_code || "",
  });

  const openBankModal = () => {
    setBankData({
      cbu: client?.bank_data?.cbu || "",
      account: client?.bank_data?.account || "",
      bank_code: client?.bank_data?.bank_code || "",
      bank_name: client?.bank_data?.bank_name || "",
    });
    setIsBankModalOpen(true);
  };

  const openCardModal = () => {
    setCardData({
      number: client?.card_data?.number || "",
      expire_date: client?.card_data?.expire_date || "",
      name_in_card: client?.card_data?.name_in_card || "",
      security_code: client?.card_data?.security_code || "",
    });
    setIsCardModalOpen(true);
  };

  const updateBankData = async () => {
    try {
      await patchClient(client.id, { bank_data: bankData });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsBankModalOpen(false);
    }
  };

  const updateCardData = async () => {
    try {
      await patchClient(client.id, { card_data: cardData });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCardModalOpen(false);
    }
  };

  const handleBankDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardNumberChange = (e: any) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const formattedValue = inputValue
      .match(/.{1,4}/g)
      ?.join(' ') || '';
    setCardNumber(formattedValue);
    setCardData((prevData) => ({
      ...prevData,
       number: formattedValue
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Datos Bancarios */}
      <div className="border-blue-500 border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos Bancarios
        </h2>
        <p className="mb-2">
          <strong>CBU: </strong>
          <span className="text-gray-700">
            {client?.bank_data?.cbu || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Numero de Cuenta: </strong>
          <span className="text-gray-700">
            {client?.bank_data?.account || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Codigo de Banco: </strong>
          <span className="text-gray-700">
            {client?.bank_data?.bank_code || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Nombre del Banco: </strong>
          <span className="text-gray-700">
            {client?.bank_data?.bank_name || "No disponible"}
          </span>
        </p>
        <button
          onClick={openBankModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos Bancarios
        </button>
      </div>

      {/* Tarjeta */}
      <div className="border border-blue-500 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 border-b-2 border-black">
          Datos de mi Tarjeta
        </h2>
        <p className="mb-2">
          <strong>Numero de la Tarjeta: </strong>
          <span className="text-gray-700">
            {client?.card_data?.number || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Fecha de Vencimiento: </strong>
          <span className="text-gray-700">
            {client?.card_data?.expire_date || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Nombre del titular: </strong>
          <span className="text-gray-700">
            {client?.card_data?.name_in_card || "No disponible"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Codigo de Seguridad: </strong>
          <span className="text-gray-700">
            {client?.card_data?.security_code ? '***' : "No disponible"}
          </span>
        </p>
        <button
          onClick={openCardModal}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Editar datos de Tarjeta
        </button>
      </div>

      {/* Modal para editar datos bancarios */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Datos Bancarios</h2>
            <form>
              <div className="mb-2">
                <label>CBU:</label>
                <input
                  type="text"
                  name="cbu"
                  value={bankData.cbu}
                  onChange={handleBankDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Numero de Cuenta:</label>
                <input
                  type="text"
                  name="account"
                  value={bankData.account}
                  onChange={handleBankDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Codigo de Banco:</label>
                <input
                  type="text"
                  name="bank_code"
                  value={bankData.bank_code}
                  onChange={handleBankDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Nombre del Banco:</label>
                <input
                  type="text"
                  name="bank_name"
                  value={bankData.bank_name}
                  onChange={handleBankDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateBankData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="ml-2 p-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar datos de tarjeta */}
      {isCardModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Editar Datos de la Tarjeta
            </h2>
            <form>
              <div className="mb-2">
                <label>Numero de la Tarjeta:</label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={handleCardNumberChange}
                  placeholder="Número de tarjeta"
                  className="border p-2 w-full"
                  maxLength={19}
                />
              </div>
              <div className="mb-2">
                <label>Fecha de Vencimiento:</label>
                <input
                  type="text"
                  name="expire_date"
                  value={cardData.expire_date}
                  onChange={handleCardDataChange}
                  placeholder="MM/AAAA"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Nombre en la Tarjeta:</label>
                <input
                  type="text"
                  name="name_in_card"
                  value={cardData.name_in_card}
                  onChange={handleCardDataChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label>Codigo de Seguridad:</label>
                <input
                  type="password"
                  value='security_code'
                  onChange={handleCardNumberChange}
                  placeholder="Codigo de Seguridad"
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="button"
                onClick={updateCardData}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsCardModalOpen(false)}
                className="ml-2 p-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankData;
