"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";
import { RxPerson } from "react-icons/rx";
import Image from "next/image";

import { Session } from "next-auth";

const Navbar = () => {
  const {data: session} = useSession()

  const navigation = [
    { title: "Simula tu préstamo", path: "/" },
    { title: "Requisitos", path: "/requisitos" },
  ];
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
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {!session ? (
            <ul>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Regístrate</Link>
              </li>
            </ul>
          ) : (
            <div className="dropdown dropdown-end mr-8">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full border-2 border-solid border-gray-200">
                  {session.user?.image || session.user.user.profile_image ?  (
                    <Image
                      src={session?.user?.image || session.user.user.profile_image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-gray-200">
                      <RxPerson size={40} />
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 text-black rounded-box w-52 shadow flex flex-col items-end"
              >
                <li className="border-b-2 border-black mb-2">
                  {session?.user?.user?.email}
                </li>
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
                  >
                    Mi Panel Principal
                  </Link>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Log out
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
