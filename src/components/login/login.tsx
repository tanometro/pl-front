"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import TetriaryButton from "../Buttons/TetriaryButton";
import SecondaryOutlineButton from "../Buttons/SecondaryOutlineButton";
import { TextField } from "@mui/material";
import PasswordField from "../Fields/PasswordField";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!result?.ok) {
      setError("Los datos no son válidos");
    } else {
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      const role = session?.user?.user?.role;
      if (role === "ADMIN") {
        router.push("/adminDashboard");
      } else if (role === "CLIENT") {
        router.push("/clientDashboard");
      } else if (role === "SELLER") {
        router.push("/sellerDashboard");
      } else {
        router.push("/");
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
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="/logo.png"
                        alt="logo"
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="flex-col justify-center align-middle items-center place-items-center">
                      <p className="mb-4 mt-12 text-center">Por favor ingresa a la aplicacion</p>
                      <TextField placeholder='DNI o Email' name="username" onChange={(e) => setUsername(e.target.value)} className="mb-4" />
                      <PasswordField onChange={(e) => setPassword(e.target.value)} />
                      {error
                        ? <p className="text-red-700 font-semibold text-xl">{error}</p>
                        : <></>
                        }
                      <div className="mb-8 pb-1 pt-1 text-center flex">
                        <button className="mr-8 border-gray-300 border rounded-sm px-3">Log in</button>
                        <TetriaryButton title="¿Password olvidada?" />
                      </div>
                    </form>
                    <div className="flex items-center justify-center pb-6">
                      <p className="mb-0 me-2">¿No tenes una cuenta?</p>
                      <SecondaryOutlineButton title='Registrarse' onClick={() => router.push('/register')} />
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
