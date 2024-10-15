"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializa el router

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
        router.push("/"); // Redirige a un dashboard genérico si no hay un rol definido
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email or DNI"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
