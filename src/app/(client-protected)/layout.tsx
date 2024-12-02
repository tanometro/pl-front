"use client";
import VerticalMenuClient from "@/components/verticalMenuClient/page";
import { useSession } from "next-auth/react";

const ClientProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session, status } = useSession();

  // Mostrar un spinner mientras la sesión se está cargando
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-lime-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Verificar si la sesión está activa y si el usuario está activo
  if (!session?.user?.user?.active) {
    return (
      <main className="text-center">
        <h1 className="text-4xl mb-10">
          Tu cuenta no se encuentra activa, por favor revisa tu casilla de
          correo para activarla.
        </h1>
        <h2 className="text-2xl">Muchas gracias</h2>
      </main>
    );
  }

  return (
    <div className="flex h-fill pt-6">
      <div className="flex-none w-56">
        <VerticalMenuClient />
      </div>
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
};

export default ClientProtectedLayout;
