"use client";

import React, { useState } from "react";
import FormButton from "../Buttons/FormButton";
import PasswordField from "../Fields/PasswordField";
import TextField from "../Fields/TextField";
import TetriaryButton from "../Buttons/TetriaryButton";
import SecondaryOutlineButton from "../Buttons/SecondaryOutlineButton";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

const LoginComponent = () => {
  const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        password: ''
      });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData((prev) => ({...prev, [name]: value}))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseNextAuth = await signIn("credentials", {
          username: userData.username,
          password: userData.password,
          redirect: false,
        })
        if (responseNextAuth && !responseNextAuth.error) {
        
          router.push('/dashboard'); 
        } else {
          console.log("Error de inicio de sesión:", responseNextAuth?.error);
        }   
    }

    return (
    <section className="gradient-form h-full">
        <div className="container h-full p-10">
         <div className="flex h-full flex-wrap items-center justify-center text-neutral-600 dark:text-neutral-200">
         <div className="w-full">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <img
                      className="mx-auto w-48"
                      src="/logo.png"
                      alt="logo"
                    />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <p className="mb-4 mt-12">Por favor, ingresa a la app</p>
                        <TextField placeholder='DNI o Email' name="emailDni" onChange={handleChange}/>
                        <PasswordField onChange={handleChange}/>
                    <div className="mb-12 pb-1 pt-1 text-center">
                        <FormButton title='LOG IN'/>
                        <TetriaryButton title="¿Password olvidada?"/>
                    </div>
                    </form>
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 me-2">¿No tenes una cuenta?</p>
                      <SecondaryOutlineButton title='Registrarse' onClick={() => router.push('/requisitos')}/>
                    </div>
                  
                </div>
              </div>

              <div
                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                style={{ background: 'linear-gradient(to right, #001c6e, #5baf6e' }}
              >
                <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    Estamos cuando más lo necesites
                  </h4>
                  <p className="text-sm">
                  Requisitos: Para acceder al préstamo deberás contar con recibo de haberes. Sueldo/Jubilación/Pensión, DNI, CBU.
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
    )
}

export default LoginComponent;