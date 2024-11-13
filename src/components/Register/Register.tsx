"use client";

import React, { useState } from "react";
import FormField from "../Fields/FormField";
import createUser from "@/services/requests/createUser";
import FormButton_2 from "../Buttons/FormButton_2";
import Link from "next/link";
import SecondaryOutlineButton from "../Buttons/SecondaryOutlineButton";

const RegisterComponent = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    dni: "",
    phone: "",
    role: "CLIENT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(userData);
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
                      <img
                        className="mx-auto w-48"
                        src="/logo.png"
                        alt="logo"
                      />
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex-col justify-center align-middle items-center place-items-center"
                    >
                      <div className="w-3/4">
                        <FormField
                          input="Email: "
                          name="email"
                          placeholder="tuemail@gmail.com"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="w-3/4">
                      <FormField
                        input="Password: "
                        name="password"
                        placeholder="********"
                        onChange={handleChange}
                        required
                        type="password"
                      />
                      </div>
                      <div className="w-3/4">
                        <FormField
                          input="DNI: "
                          name="dni"
                          placeholder="Tu DNI"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="w-3/4">
                        <FormField
                          input="Teléfono: "
                          name="phone"
                          placeholder="Tu teléfono"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <FormButton_2 />
                    </form>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                  style={{
                    background: "linear-gradient(to right, #001c6e, #5baf6e",
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
