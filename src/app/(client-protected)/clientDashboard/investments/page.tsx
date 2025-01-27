'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Modal from "react-modal";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import { InvestmentInterface, InvestmentsData } from '@/types/InvestmetsTypes'
import InvestmentsComponent from '@/components/ClientComponents/ClientInvestments'
import readInvestmentsOfOneClient from '@/services/requests/readInvestmentsOfOneClient'
import createInvestment from '@/services/requests/createInvestment';

function Investments() {
  const { data: session } = useSession()
  const client_id = session?.user.user.client.id
  const [data, setData] = useState<InvestmentsData>()
  const [newInvestment, setNewInvestment] = useState<InvestmentInterface>({
    starting_capital: 0,
    state: 'Solicitud Enviada',
    client: client_id
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const investmentsData = await readInvestmentsOfOneClient(client_id);
        setData(investmentsData);
      } catch (error) {
        console.error("Error al obtener Las INVERSIONES:", error);
      }
    };
    fetchInvestments();
  }, [client_id]);

  const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvestment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleWantInvestment = async (newInvestment: any) => {
    try {
      const response: any = await createInvestment(newInvestment);

      setData(response.investments);
      setIsModalOpen(false)

      if (response.ok) {
        setAlertMessage("Inversion Solicitada correctamente");
        setAlertType("success");
      } else {
        throw new Error("Algo salió mal al Solicitar Invertir");
      }
    } catch (error) {
      setAlertMessage("Error al Crear la Solicitud");
      setAlertType("error");
    } finally {
      setAlertOpen(true);
      window.location.reload()
    }
  };

  return (
    <main>
      <div className='flex justify-center w-full'>
        <button
          className='font-semibold text-xl bg-lime-500 border-black p-2 border-solie shadow-lg rounded-md'
          onClick={() => setIsModalOpen(true)}
        >
          Quiero Invertir
        </button>
      </div>
      <div className='mt-8'>
        <h1 className='font-bold text-2xl'>Mis inversiones</h1>
        <div>
          <InvestmentsComponent investments={data?.investments} message={data?.message} contracts={data?.contracts} />
        </div>
      </div>
      {alertOpen && alertType === "success" && (
        <SuccessAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}

      {alertOpen && alertType === "error" && (
        <ErrorAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          alertMessage={alertMessage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        className="bg-white p-6 rounded-lg w-96 mx-auto text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      ><div>
          <h1 className="text-xl font-bold mb-4">Solicitar Invertir</h1>
          <h3>Por favor ingrese un monto aproximado con el cual desea invertir y un asesor se comunicará con usted para continuar con el proceso</h3>
          <input
            type="number"
            className='border border-solid border-black text-xl rounded-md h-12 my-4 px-2'
            name='starting_capital'
            value={newInvestment.starting_capital}
            onChange={handleInvestmentAmountChange}
          />
        </div>
        <div className='flex justify-evenly'>
          <button
            className="text-black bg-lime-600 p-2 rounded-md ml-2"
            onClick={()=>{handleWantInvestment(newInvestment)}}>
            Solicitar
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-black bg-red-600 p-2 rounded-md ml-2"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </main>
  )
}

export default Investments

