"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const navigation = [
    { title: "Simula tu préstamo", path: "/" },
    { title: "Requisitos", path: "/requisitos" },
  ];
  const router = useRouter();

  return (
    <nav className="w-full">
      <div className="navbar bg-primary text-primary-content rounded-md mt-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <img src="/logo.png" alt="Logo" className="h-12 w-30" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Simular tu préstamo</Link>
              </li>
              <li>
                <Link href="/requisitos">Requisitos</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Simular tu préstamo</Link>
            </li>
            <li>
              <Link href="/requisitos">Requisitos</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Registrate</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  const protocol = window.location.protocol; // Obtiene el protocolo actual (http o https)
                  const host = window.location.host; // Obtiene el host actual (localhost:3000 o producción)
                  const callbackUrl = `${protocol}//${host}/`; // Construye la URL completa con el protocolo correcto
                  signOut({
                    callbackUrl: '/'
                  })
                }}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
