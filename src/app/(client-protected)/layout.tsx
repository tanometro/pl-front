"use client";
import VerticalMenuClient from "@/components/verticalMenuClient/page";
import { useSession } from "next-auth/react";

const ClientProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.user?.active ? (
        <div className="flex h-fill pt-6">
          <div className="flex-none w-56">
            <VerticalMenuClient />
          </div>
          <div className="flex-grow p-6">{children}</div>
        </div>
      ) : (
        <main className="text-center">
          <h1 className="text-4xl mb-10">
            Tu cuenta no se encuentra activa por favor revisa tu casilla de
            correo para activarla
          </h1>
          <h2 className="text-2xl">Muchas Gracias</h2>
        </main>
      )}
    </>
  );
};

export default ClientProtectedLayout;
