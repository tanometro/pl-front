"use client";

import { useState } from "react";
import Link from "next/link";
import FormButton_2 from "@/components/Buttons/FormButton_2";
import TextField from "@/components/Fields/TextField";
import createLead from "@/services/requests/createLead";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import { CreateLeadProps } from "@/types/LeadsTypes";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BankList from '../../types/utils/BankList'

const CreateLead: React.FC<CreateLeadProps> = ({ seller_id, seller_name }) => {
  const [userData, setUserData] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    bank: "",
    amount: "",
    seller_id
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const validate = () => {
    const newErrors: typeof errors = { email: "", dni: "", phone: "", amount: "" };

    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Por favor, ingrese un correo válido.";
    }
    if (!/^\d+$/.test(userData.dni)) {
      newErrors.dni = "El DNI solo puede contener números.";
    }
    if (!/^\d+$/.test(userData.amount)) {
      newErrors.amount = "El Monto solo puede contener números.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFieldsFilled = Object.values(userData).every((value:
      any
    ) => value?.trim() !== "");
    return !hasErrors && allFieldsFilled;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Por favor, ingrese un correo válido." }));
    } else if (name === "dni" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, dni: "El DNI solo puede contener números." }));
    } else if (name === "amount" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, amount: "El Monto solicitado solo puede contener números" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        userData.phone = `+${userData.phone}`
        const response = await createLead(userData);
        if (response.ok) {
          setAlertMessage("Formulario enviado correctamente");
          setAlertType("success");
          setUserData({
            name: "",
            dni: "",
            email: "",
            phone: "",
            bank: "",
            amount: "",
            seller_id: seller_id || '',
          });
          setErrors({});
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          throw new Error("Algo salió mal al crear el lead");
        }
      } catch (error) {
        setAlertMessage("Error al enviar el formulario");
        setAlertType("error");
      } finally {
        setAlertOpen(true);
      }
    }
  };
  console.log(errors)
  console.log(isFormValid())
  return (
    <div className="text-center flex flex-col items-center text-black">
      <h1 className="text-3xl mb-4">¡Hola!</h1>
      {seller_id && (
        <h1 className="text-3xl mb-8">Vas a ser Atendido por {seller_name}</h1>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full lg:w-1/2">
        <div className="w-full mb-4 flex-col justify-center place-items-center">
          <TextField
            placeholder="Nombre/s"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="w-full mb-4 flex-col justify-center place-items-center">
          <TextField
            placeholder="DNI"
            onChange={handleChange}
            name="dni"
            required
          />
          {errors.dni && (
            <p className="text-sm text-red-500 mt-1">{errors.dni}</p>
          )}
        </div>
        <div className="w-full mb-4 flex-col justify-center place-items-center">
          <TextField
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="w-1/2 mb-4 flex-col justify-center place-items-center">
          <PhoneInput2
            country={"ar"}
            autoFormat={false}
            countryCodeEditable={false}
            value={userData.phone}
            onChange={(phone) => setUserData((prev) => ({ ...prev, phone }))}
            placeholder="Cod. Area + Numero sin 0 ni 15"
            containerClass="h-12 border-black border rounded-md"
            inputStyle={{ 
              width: "100%", 
              height: "100%",
            }}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="w-full mb-4 flex-col justify-center place-items-center">
          <select
            onChange={handleChange}
            name="bank"
            value={userData.bank}
            className="block w-full py-1 h-12 md:w-1/2 border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <option value="" disabled>SELECCIONE SU BANCO</option>
            {BankList.map((bank) => (
              <option key={bank.id} value={bank.display}>
                {bank.display}
              </option>
            ))}
          </select>

        </div>
        <div className="w-full mb-4 flex-col justify-center place-items-center">
          <TextField
            placeholder="Monto estimado"
            onChange={handleChange}
            name="amount"
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>
        {(!Object.values(userData).every((value:
          any
        ) => value?.trim() !== ""))
          ? <p className="text-sm text-red-500 mt-1">Todos los campos deben estar completos</p>
          : <></>}
        <FormButton_2 isDisabled={!isFormValid()} />
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
        <Link href="/login" className="border-black rounded-md bg-lime-500 p-2">
          Log-in
        </Link>
      </div>
    </div>
  );
};

export default CreateLead;