"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { RxPerson } from "react-icons/rx";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";  // Iconos para Login y Registro
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const navigation = [
    { title: "Simula tu préstamo", path: "/" },
    { title: "Requisitos", path: "/requisitos" },
  ];

  return (
    <nav className="w-full bg-blue-500 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto mr-2" />
            <span className="text-2xl font-semibold text-white">Mi Empresa</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-white hover:text-yellow-400 transition duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          {!session ? (
            <ul className="flex space-x-4">
              <li>
                <Link href="/login" className="flex items-center text-white hover:text-yellow-400 transition duration-200">
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="flex items-center text-white hover:text-yellow-400 transition duration-200">
                  <FaUserPlus className="mr-2" /> Regístrate
                </Link>
              </li>
            </ul>
          ) : (
            <div className="dropdown dropdown-end relative">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-white overflow-hidden">
                  {session.user?.image || session.user.user.profile_image ? (
                    <Image
                      src={session.user?.image || session.user.user.profile_image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400">
                      <RxPerson size={40} />
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-white text-black rounded-box w-52 shadow-lg flex flex-col items-start"
              >
                <li className="border-b border-gray-300 mb-2 pb-2 text-sm text-gray-600">{session?.user?.user?.email}</li>
                <li className="mb-2">
                  <Link
                    href={
                      session?.user?.user.role === "ADMIN"
                        ? "/adminDashboard"
                        : session?.user?.user.role === "SELLER"
                        ? "/sellerDashboard"
                        : session?.user?.user.role === "CLIENT"
                        ? "/clientDashboard"
                        : "/"
                    }
                    className="text-gray-700 hover:text-blue-500 transition duration-200"
                  >
                    Ir a mi Panel
                  </Link>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
