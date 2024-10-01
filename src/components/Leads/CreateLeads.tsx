"use client";

import { useState } from "react";
import Link from "next/link";
import FormButton_2 from "@/components/Buttons/FormButton_2";
import TextField from "@/components/Fields/TextField";
import createLead from "@/services/requests/createLead";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { CreateLeadProps } from "@/types/LeadsTypes";

const CreateLead: React.FC<CreateLeadProps> = ({ seller_id, seller_name }) => {
  const [userData, setUserData] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    bank: "",
    amount: "",
    seller_id,
  });
console.log(userData)
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createLead(userData);
      if (response.ok) {
        setAlertMessage("Formulario enviado correctamente");
        setAlertType("success");
      } else {
        throw new Error("Algo salió mal al crear el lead");
      }
    } catch (error) {
      setAlertMessage("Error al enviar el formulario");
      setAlertType("error");
    } finally {
      setAlertOpen(true);
    }
  };
  return (
    <div className="text-center flex flex-col items-center text-black">
      <h1 className="text-3xl mb-4">Hola!</h1>
      {seller_id && (
        <h1 className="text-3xl mb-8">Vas a ser Atendido por {seller_name}</h1>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full lg:w-1/2">
        <TextField placeholder="Nombre/s" onChange={handleChange} name="name" />
        <TextField
          placeholder="DNI"
          onChange={handleChange}
          name="dni"
          required
        />
        <TextField
          placeholder="Email"
          onChange={handleChange}
          name="email"
          required
        />
        <TextField
          placeholder="Teléfono"
          onChange={handleChange}
          name="phone"
          required
        />
        <TextField placeholder="Tu banco" onChange={handleChange} name="bank" />
        <TextField
          placeholder="Monto estimado"
          onChange={handleChange}
          name="amount"
        />
        <FormButton_2/>
      </form>

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

      <div className="mt-4 text-center">
        <h1 className="mb-2">¿Ya tenes cuenta?</h1>
        <Link href="/login" className="border-black rounded-md bg-lime-500 p-2">Log-in</Link>
      </div>
    </div>
  );
};
export default CreateLead;
