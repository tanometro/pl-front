'use client';

import { signOut, useSession } from "next-auth/react"
import { auth } from "@/auth";

export default function AdminDashboard() {
  const { data: session } = useSession()
  console.log(session);
  if (!session) {
    return <div>Not authenticated</div>;
  }
  if(session.user.role !== "ADMIN") {
    return <div>Este apartado es solo para administradores <button onClick={()=> signOut()}></button></div>
  }

  return (                
    <div className="container">                                                                            
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div>Bienvenido </div> 
      
    </div>
  );
}