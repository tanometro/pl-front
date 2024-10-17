"use client";

import { signOut, useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="container flex text-center">
      <h1>bienvenido al panel de adminstracion</h1>
      <h2>En la lista de la izquierda puede seleccionar </h2>
      <h2>con que elemento desea trabajar.</h2>
    </div>
  );
}
