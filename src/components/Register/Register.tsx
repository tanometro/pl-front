"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormField from "../Fields/FormField";
import createUser from "@/services/requests/createUser";
import FormButton_2 from "../Buttons/FormButton_2";
import SuccessAlert from "../Alert/SuccessAlert";
import ErrorAlert from "../Alert/ErrorAlert";

const RegisterComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    dni: "",
    phone: "",
    role: "CLIENT",
  });

  const [errors, setErrors] = useState({
    email: "",
    dni: "",
    phone: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const validate = () => {
    const newErrors: typeof errors = { email: "", dni: "", phone: "" };

    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Por favor, ingrese un correo válido.";
    }
    if (!/^\d+$/.test(userData.dni)) {
      newErrors.dni = "El DNI solo puede contener números.";
    }
    if (!/^\+?\d+$/.test(userData.phone)) {
      newErrors.phone = "El teléfono solo puede contener números y el signo '+'.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFieldsFilled = Object.values(userData).every((value) => value.trim() !== "");
    return !hasErrors && allFieldsFilled;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Por favor, ingrese un correo válido." }));
    } else if (name === "dni" && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, dni: "El DNI solo puede contener números." }));
    } else if (name === "phone" && !/^\+?\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, phone: "El teléfono solo puede contener números y el signo '+'." }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await createUser(userData);
        if (response.ok) {
          setAlertMessage("Usuario creado correctamente");
          setAlertType("success");
        } else {
          throw new Error("Algo salió mal al crear Usuario");
        }
      } catch (response: any) {
        setAlertMessage(response.message);
        setAlertType("error");
      } finally {
        setAlertOpen(true);
      }

    }
  };

  return (
    <section className="gradient-form h-full">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-600 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center mb-8">
                      <img className="mx-auto w-48" src="/logo.png" alt="logo" />
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex-col justify-center align-middle items-center place-items-center"
                    >
                      <div className="w-3/4 mb-4">
                        <FormField
                          input="Email: "
                          name="email"
                          placeholder="tuemail@gmail.com"
                          onChange={handleChange}
                          required
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div className="w-3/4 mb-4">
                        <FormField
                          input="Password: "
                          name="password"
                          placeholder="********"
                          onChange={handleChange}
                          required
                          type="password"
                        />
                      </div>
                      <div className="w-3/4 mb-4">
                        <FormField
                          input="DNI: "
                          name="dni"
                          placeholder="Tu DNI"
                          onChange={handleChange}
                          required
                        />
                        {errors.dni && (
                          <p className="text-sm text-red-500 mt-1">{errors.dni}</p>
                        )}
                      </div>
                      <div className="w-3/4 mb-4">
                        <PhoneInput2
                          country={"ar"}
                          autoFormat={false}
                          countryCodeEditable={false}
                          value={userData.phone}
                          onChange={(phone: any) => setUserData((prev) => ({ ...prev, phone }))}
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
                      <div className="w-3/4 mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rol:
                        </label>
                        <select
                          name="role"
                          value={userData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
                        >
                          <option value="CLIENT">Cliente</option>
                          <option value="SELLER">Vendedor</option>
                        </select>
                      </div>
                      <FormButton_2 isDisabled={!isFormValid()} />
                    </form>
                    {alertOpen && alertType === "success" && (
                      <SuccessAlert
                        open={alertOpen}
                        onClose={() => setAlertOpen(false)}
                        alertMessage={`${alertMessage}. Hemos enviado un email de verificación a ${userData.email}. Por favor, revisa tu bandeja de entrada o spam.`}
                        actionButton={{
                          text: "Aceptar",
                          onClick: () => {
                            setAlertOpen(false);
                            setUserData({
                              email: "",
                              password: "",
                              dni: "",
                              phone: "",
                              role: "CLIENT",
                            });
                            router.push('/login');
                          },
                        }}
                      />
                    )}

                    {alertOpen && alertType === "error" && (
                      <ErrorAlert
                        open={alertOpen}
                        onClose={() => setAlertOpen(false)}
                        alertMessage={alertMessage}
                      />
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                  style={{
                    background: "linear-gradient(to right, #001c6e, #5baf6e)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Estamos cuando más lo necesites
                    </h4>
                    <p className="text-sm">
                      Requisitos: Para acceder al préstamo deberás contar con
                      recibo de haberes. Sueldo/Jubilación/Pensión, DNI, CBU.
                      (NO AUH - NO EMPLEADOS EN NEGRO)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterComponent;
